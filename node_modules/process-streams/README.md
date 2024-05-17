Motivation
----------

The goal of this small package is to provide a interface for streaming data to
and from child-processes. It may be possible to stream data to a process via stdout
and read the result from stdin, but it may also be necessary to store the data in a
temporary file and provide the filename to the process as argument.

A concrete example is ffmpeg: It is possible to encode webm-videos to a stream,
but h264 must always be stored in a temporary file first. On the other hand in some cases
[it is not possible to stream data into ffmpeg](http://superuser.com/questions/822500/pipe-issue-with-ffmpeg),
so data must be stored in a temporary file prior to calling ffmpeg.



Overview
--------

ProcessStreams provides the methods `exec`, `execFile` and `spawn` from the `child_process` with the same arguments.
The return value however is always a through-stream. The command line arguments are examined for occurences of
the strings `<INPUT>` and `<OUTPUT>`.

 * If `<INPUT>` is present, the stream input is piped into a temporary file and `<INPUT>` is replaced by its filename.
 * If `<OUTPUT>` is present, it is replaced by the name of a temporary file and the contents of this file is
 used as stream output for the resulting stream.
 * If `<INPUT>` or `<OUTPUT>` are not present, the stream input is directly piped to the child processes stdin
 (or the child processes stdout is piped to the stream output).

Temporary files are always deleted when no longer needed.

Functions
---------

#### `ps.spawn(command, [args], [options])`

For details about function arguments please refer to the api documentation of
[child_process.spawn(command, [args], [options])](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)


#### `ps.exec(command, [options], callback)`

For details about function arguments please refer to the api documentation of
[child_process.exec(command, [options], callback)](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)


#### `ps.execFile(file, [args], [options], [callback])`

For details about function arguments please refer to the api documentation of
[child_process.execFile(file, [args], [options], [callback])](http://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback)

#### `ps.factory(useTmpIn, useTmpOut, callback)`

This function uses the provided callback to connect input and output of the resulting stream. `useTmpIn` and `useTmpOut` are booleans that define which
parts of the stream temp should use temp files.
`callback` has the signature `function(input, output, callback)`. "input" and "output" are either streams of paths of temporary files. The callback must
be called when data is available for output. If "tmpUseOut" is `false`, this can be called immediately. It "tmpUseOut" is `true` it must be called, when the
output tempfile has completely been written to.

Simple Examples
--------

The following examples actually only pipe data from stdin to stdout, but via child processes with different temp-file options.

``` js
   var ProcessStream = require("process-streams");
   var ps = new ProcessStream();
   // Temporary files for input and output
   process.stdin.pipe(ps.exec("cp <INPUT> <OUTPUT>")).pipe(process.stdout);
   process.stdin.pipe(ps.spawn("cp",["<INPUT>","<OUTPUT>"])).pipe(process.stdout);
   process.stdin.pipe(ps.execFile("cp",["<INPUT>","<OUTPUT>"])).pipe(process.stdout);

   // Stream input, use temp-file for output
   process.stdin.pipe(ps.spawn("tee",["<OUTPUT>"])).pipe(process.stdout);

   // Temp-file for input, Stream for output
   process.stdin.pipe(ps.spawn("cat ",["<INPUT>"])).pipe(process.stdout);

   // Pipe both sides
   process.stdin.pipe(ps.spawn("cat")).pipe(process.stdout);
```

Changing the placeholder tokens
-------------------------------
The tokens `<INPUT>` and `<OUTPUT>` can be changed:

``` js
   var ProcessStream = require("process-streams");
   var ps = new ProcessStream('[IN]','[OUT]');
   process.stdin.pipe(ps.exec("cp [IN] [OUT]")).pipe(process.stdout);
```

Events
------
Process errors (such as not finding the executable file) are emitted on the resulting stream as `'error'` event.
The `'started'` event is emitted when the is started. Its first argument is the child-process object, second and
third arguments are the `command` and `args` passed to `ps.exec`, `ps.spawn` or `ps.execFile`), but with the
placeholders resolved to the their actual temporary files.

``` js
    var ProcessStream = require("process-streams");
    var ps = new ProcessStream('[IN]','[OUT]');
    process.stdin.pipe(ps.spawn("cp", ["[IN]","[OUT]"])).on("error", function(err) {
        // Handle errors
    }).on("input-closed", function(err) {
       // Handle ECONNRESET and EPIPE processe's stdin
    }).on("started", function(process, command, args) {
       // If "ps.exec" is called, 'command' contains the whole resolved command and 'args' is undefined.
    }).on("exit", function(code, signel) {
      // see the 'child_process' documentation for the 'exit'-event.
    }).pipe(process.stdout);
```

*As of version 1.0.0 the API will only be changed in accordance to semver. Feedback is welcome, although I cannot guarantee any response times at the moment.*


Changes
--------
#### 1.0.1

  * Testcase-fixes for iojs 1.2 and node 0.12
  * Changed some dependencies to stable versions of other packages

#### 1.0.0

  * There are no API changes in this version, but I have decided that the API should be stable now. Thus, version 1.0.0

#### 0.4.5

  * All testcases should now run after `npm install`. All test-data is provided in dependencies (even for testECONRESET.js).
    `package.json` is now complete, the README updated.

#### 0.4.4

  * Added license information to package.json

#### 0.4.3

  * Fixed error handling for `exec` and `execFile`
  * Callback for `exec` and `execFile` is now forwarded to `child_process`
    at the correct location, so that callbacks actually get called.

#### 0.4.2
  * When using no in-tempfile, it may happen that the command (e.g. 'head -2') close the input stream before it is
    completely read. This may result in a `EPIPE` or `ECONNRESET` but is not an actual error, since the output is
    still correct. This error does not cause an `error`-event anymore, but an `input-closed` event.

