var cp = require("child_process");
var ProcessStreams = require("../src/process-streams.js");
var es = require("event-stream");
var path = require("path");
var fs = require("fs");
//require("trace");
//require("clarify");
//Error.stackTraceLimit = 50;


var ps = new ProcessStreams();
var source = ["ab", "b"];

function checkResult(test) {
    return function (err, target) {
        test.equal(target, "abb");
        test.done();
    }
}

var functions = {
    "Spawn": {
        func: ps.spawn,
        params: function (command, args) {
            return [command, args];
        }
    },
    "ExecFile": {
        func: ps.execFile,
        params: function (command, args) {
            return [command, args];
        }
    },
    "Exec": {
        func: ps.exec,
        params: function (command, args) {
            return [[command].concat(args).join(" ")];
        }
    }
};

var variants = {
    "PipePipe": ["cat"],
    "TmpPipe": ["cat", ["<INPUT>"]],
    "PipeTmp": ["tee", ["<OUTPUT>"]],
    "TmpTmp": ["cp", ["<INPUT>", "<OUTPUT>"]]
};

Object.keys(functions).forEach(function (f) {
    var func = functions[f].func;
    var paramsTransformer = functions[f].params;
    Object.keys(variants).forEach(function (v) {
        var params = paramsTransformer.apply(this, variants[v]);

        /**
         * Test standard usage for each function and variant
         */
        exports["testDefault" + f + v] = function (test) {
            test.expect(1);
            es.readArray(source).pipe(func.apply(this, params)).pipe(es.wait(function (err, target) {
                test.equal(target, "abb");
                test.done();
            }));
        };

        /**
         * Verify the emiting of "started"-event
         */
        exports["testStartedEvent" + f + v] = function (test) {
            test.expect(3);
            var latch = 2;
            es.readArray(source).pipe(func.apply(this, params)).on("started", function () {
                test.ok(arguments[0].hasOwnProperty("pid"), "First argument should be a child_process object.");
            }).on("exit", function(code,signal) {
                test.equal(code,0,"Checking return code");
                test.ok(!signal, "Checking signal parameter");
                if (--latch==0) { test.done() }
            }).pipe(es.wait(function () {
                if (--latch==0) { test.done() }
            }));
        };

        /**
         * Verify the emiting of "started"-event
         */
        exports["testErrorEvent" + f + v] = function (test) {
            es.readArray(source).pipe(func.call(this, params[0] + "xxxxx", params[1])).on("error", function (error) {
                test.ok(true, "Must receive error event received "+error);
                test.done();
            }).pipe(es.wait(function (err, target) {
            }));
        };

        /**
         * An error must be emitted, when the process did not create the output temp file.
         */
        if (v.match(/Tmp$/)) {
            exports["testNoWriteToTmpFile" + f + v] = function (test) {
                test.expect(1);
                var params = paramsTransformer.call(this, 'echo', variants[v][1]);
                es.readArray(source).pipe(func.apply(this, params)).on("error", function () {
                    test.ok(true, "First argument should be a child_process object.");
                    test.done();
                }).pipe(es.wait(function (err, target) {
                }));
            };
        }

    });
});


exports.testChangePlaceHolders = function (test) {
    var ps = new ProcessStreams("[IN]", "[OUT]");
    es.readArray(source).pipe(ps.exec("cp [IN] [OUT]")).pipe(es.wait(checkResult(test)));
};

function wrapper(input, output, callback) {
    if (typeof(input) === "string") {
        input = fs.createReadStream(input);
    }
    if (typeof(output) === "string") {
        output = fs.createWriteStream(output);
        output.on("error", callback);
        output.on("finish", function () {
            callback();
        });
    } else {
        callback();
    }
    input.pipe(output);
}

exports.testFactoryPipePipe = function (test) {
    es.readArray(source).pipe(ps.factory(false, false, wrapper)).pipe(es.wait(checkResult(test)));
};
exports.testFactoryTmpPipe = function (test) {
    es.readArray(source).pipe(ps.factory(true, false, wrapper)).pipe(es.wait(checkResult(test)));
};
exports.testFactoryPipeTmp = function (test) {
    es.readArray(source).pipe(ps.factory(true, false, wrapper)).pipe(es.wait(checkResult(test)));
};
exports.testFactoryTmpTmp = function (test) {
    es.readArray(source).pipe(ps.factory(true, false, wrapper)).pipe(es.wait(checkResult(test)));
};


