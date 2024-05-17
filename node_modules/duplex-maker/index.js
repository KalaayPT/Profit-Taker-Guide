var util = require('util');
var stream = require('stream');

module.exports = DuplexMaker

util.inherits(DuplexMaker, stream.Duplex);
function DuplexMaker (writable, readable) {
  if(!(this instanceof DuplexMaker)) return new DuplexMaker(writable, readable)
  stream.Duplex.call(this);
  var duplex = this;

  if(!readable) {
    readable = stream.PassThrough();
    readable.end();
  }
  readable.on('end', this.push.bind(this, null));
  this.on('finish', writable.end.bind(writable));

  this._write = function _write(chunk, encoding, finish) {
    writable.write(chunk, encoding, finish);
  }

  this._read = function (size) {
    read_until_good();

    function read_until_good () {
      var chunk = readable.read(size);
      if(chunk !== null) return duplex.push(chunk);
      readable.once('readable', read_until_good);
    }
  }

}

