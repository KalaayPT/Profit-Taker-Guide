'use strict';

var stream = require("stream");
var duplexMaker = require("duplex-maker");
var fs = require("fs");
var tmp = require("tempfile");
var cp = require("child_process");
var quotemeta = require("quotemeta");

/**
 * Base function to create streams of something, if values are provided for tmpIn (or tmpOut),
 * these are passed to the callback function. If not, the input stream (or the output stream) are used instead.
 *
 * @param tmpIn path to a tempfile to write input stream input to before calling the callback,
 *  if this is null, the stream input is directly
 * @param tmpOut path to a tempfile to which the
 * @param callback function(tmpOrInputStream, tmpOrOutputStream, callback(err)) the callback is called whenever the input
 *   is available. The "result" parameter is the duplex stream actually returned by this function.
 * @returns {Stream}
 */
function createStream(tmpIn, tmpOut, callback) {

    var incoming = new stream.PassThrough();
    var outgoing = new stream.PassThrough();
    // input paramter of the child process
    var result = duplexMaker(incoming, outgoing);
    setTimeout(function () {
        inStream(incoming, tmpIn, function (err) {
            if (err) {
                result.emit("error", err);
            } else {
                callback.call(result, tmpIn || incoming, tmpOut || outgoing, function (err) {
                    if (err) {
                        result.emit("error", err);
                        if (tmpIn) {
                            fs.exists(tmpIn, function (exists) {
                                if (exists) {
                                    fs.unlink(tmpIn);
                                }
                            });
                        }
                        if (tmpOut) {
                            fs.exists(tmpOut, function (exists) {
                                if (exists) {
                                    fs.unlink(tmpOut);
                                }
                            });
                        }
                        return;
                    }
                    // tmpFile is not needed anymore
                    if (tmpIn) {
                        fs.unlink(tmpIn);
                    }
                    if (tmpOut) {
                        fs.exists(tmpOut, function (exists) {
                            if (exists) {
                                var out = fs.createReadStream(tmpOut);
                                out.pipe(outgoing);
                                out.on("end", function () {
                                    fs.unlink(tmpOut);
                                });
                            } else {
                                result.emit("error", new Error("Child process has not created the output-temp file"));
                            }
                        });
                    }
                });
            }
        });
    });
    return result;
}

/**
 *
 * @param stream
 * @param tmpFile path to a temporary file. If this is set, the stream is written to the file
 *    and the file is used as parameter for the callback
 * @param callback
 */
function inStream(stream, tmpFile, callback) {
    if (tmpFile) {
        var tmpWrite = fs.createWriteStream(tmpFile);
        stream.pipe(tmpWrite);
        tmpWrite.on("finish", function () {
            callback(null);
        });
        tmpWrite.on("error", function (error) {
            callback(error);
        });
    } else {
        callback(null);
    }
}

/**
 * Wraps a process provided by a function in a stream such that the stream input is piped to stdin and stdout is piped to the stream output.
 * If tmpIn is provided, no pipe is set up to stdin. Instead, the data is piped into tmpIn which can than be provided to the process
 * as command line argument. The same applies for stdout.
 * @param processProvider
 * @param tmpIn the location of a temporary file that is filled with the input data.
 * @param tmpOut the location of a temporary file that the process writes to and that is used as source to the stream output.
 */
function wrapProcess(tmpIn, tmpOut, processProvider) {
    return createStream(tmpIn, tmpOut, function (input, output, callback) {
        var _this = this;
        var process = processProvider.call(this, tmpIn, tmpOut);
        process.on("error", function (error) {
            callback(error);
        });
        if (!tmpIn) {
            input.pipe(process.stdin).on("error", function (error) {
                if (error.code === 'ECONNRESET' && error.syscall === 'read') {
                    // This can happen if the process closes stdin before all data has been read
                    // e.g. in ps.spawn("exiftool", ["-s3", "-MimeType", "-fast","-"]);
                    // This is not necessarily an error, since the output is still valid
                    _this.emit("input-closed", error);
                } else if (error.code = 'EPIPE' && error.syscall === 'write') {
                    // This also can happen if the process closes stdin before all data has been read
                    // e.g. in ps.spawn("head", ["-2"]);
                    // This is not necessarily an error, since the output is still valid
                    _this.emit("input-closed", error);
                } else {
                    // This "emit" causes test cases to fail
                    // it is most likely a followup-error of an error that is already
                    // emitted
                    // _this.emit("error", error);
                }
            });
        }
        if (!tmpOut) {
            process.stdout.pipe(output);
        }
        process.on("exit", function (code, signal) {
            _this.emit("exit", code, signal);
            callback(null);
        });
    });
}

/**
 * Create a new ProcessStreams instance optionally providing placeholder for &lt;INPUT> and &lt;OUTPUT>
 * @param [IN] placeholder for input file
 * @param [OUT] placeholder for output file
 */
module.exports = function (IN, OUT) {
    // Expose IN and OUT to the public, but use local variables internally
    //noinspection JSUnusedGlobalSymbols
    this.IN = IN = IN || "<INPUT>";
    //noinspection JSUnusedGlobalSymbols
    this.OUT = OUT = OUT || "<OUTPUT>";
    var placeHolderRegex = new RegExp("(" + quotemeta(IN) + "|" + quotemeta(OUT) + ")", "g");

    /**
     * Replace placeholders in command line arguments (array)
     * @param args a list of command line arguments (string) which may also contain IN once and OUT once.
     * @return {Object}
     * @param tmpIn temporary file for possible input data.
     * @param tmpOut temporary file for possibe output data.
     */
    function parseArgs(args, tmpIn, tmpOut) {
        var resultIn = null;
        var resultOut = null;
        var resultArgs = args ? args.map(function (arg) {
            var parsed = parseString(arg, tmpIn, tmpOut);
            resultIn = resultIn || parsed.in;
            resultOut = resultOut || parsed.out;
            return parsed.string;
        }) : args;
        return {
            in: resultIn,
            out: resultOut,
            args: resultArgs
        };
    }

    /**
     * Replace placeholders in a string
     * @param string
     * @param tmpIn
     * @param tmpOut
     * @returns {{in: *, out: *, string: (XML|string|void|*)}}
     */
    function parseString(string, tmpIn, tmpOut) {
        var resultIn = null;
        var resultOut = null;
        var resultString = string.replace(placeHolderRegex, function (match) {
            switch (match) {
                case IN:
                    return resultIn = resultIn || tmpIn;
                case OUT:
                    return resultOut = resultOut || tmpOut;
                default:
                    throw new Error("Found '" + match + "'. Placeholder regex not consistent: " + JSON.stringify(placeholders));
            }
        });

        return {
            in: resultIn,
            out: resultOut,
            string: resultString
        };
    }

    /**
     * Like child_process.spawn, but returns a through-stream instead of the child process.
     * A "started"-event is sent when the process is actually started. The event contains the
     * process-object as first and the resolved command and argument list as second and third parameter.
     * @param command The command to run
     * @param args the arguments to be passed to the command
     * @param [options] options as in "child_process.spawn"
     */
    this.spawn = function (command, args, options) {
        var parsed = parseArgs(args, tmp(".in"), tmp(".out"));
        return wrapProcess(parsed.in, parsed.out, function () {
            var process = cp.spawn(command, parsed.args, options);
            this.emit("started", process, command, parsed.args);
            return process;
        });

    };
    /**
     * Like child_process.exec, but returns a through-stream instead of the child process.
     * A "started"-event is sent when the process is actually started. The event contains the
     * process-object as first and the resolved command as second parameter.
     * @param command The command to run
     * @param [options] options as in "child_process.exec"
     * @param [callback] callback as in "child_process.exec"
     */
    this.exec = function (command, options, callback) {
        var parsed = parseString(command, tmp(".in"), tmp(".out"));
        return wrapProcess(parsed.in, parsed.out, function () {
            var resultStream = this;
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            var process = cp.exec(parsed.string, options, function (err) {
                // Forward errors in the callback as "error"-event to the stream
                // For some reason, this is necessary in "exec" but not in "execFile"
                if (err) {
                    resultStream.emit("error", err);
                }
                if (callback) {
                    callback.apply(this, arguments);
                }
            });
            this.emit("started", process, parsed.string);
            return process;
        });
    };

    /**
     * Like child_process.execFile, but returns a through-stream instead of the child process.
     * A "started"-event is sent when the process is actually started. The event contains the
     * process-object as first and the resolved command and argument list as second and third parameter.
     * @param command The command to run
     * @param args the arguments to be passed to the command
     * @param [options] options as in "child_process.exec"
     * @param [callback] callback as in "child_process.exec"
     */
    this.execFile = function (command, args, options, callback) {
        var parsed = parseArgs(args, tmp(".in"), tmp(".out"));
        return wrapProcess(parsed.in, parsed.out, function () {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            var process = cp.execFile(command, parsed.args, options, callback);
            this.emit("started", process, parsed.args);
            return process;
        });
    };
    /**
     * Creates a stream using a factory function that connects input and output.
     * @param useTmpIn {boolean} whether to use a temp file as input
     * @param useTmpOut {boolean} whether to use a temp file as output
     * @param callback {function(err:Error,input,output,callback)} callback method that connects the input to the output somehow.
     *  Depending on the useTmpIn and useTmpOut parameter, the input and output parameters of the callback are either strings pointing
     *  to files or streams. The callback is called in the this-context of the created stream, so
     *  "this.emit(...)" may be used to emit events when from the callback.
     */
    this.factory = function (useTmpIn, useTmpOut, callback) {
        return createStream(useTmpIn && tmp(".in"), useTmpOut && tmp(".out"), callback);
    };

};



