var sink = require('stream-sink');
var stream = require('stream');
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;

var DuplexMaker = require('../');

describe('the DuplexMaker', function () {
  it('is a function', function () {
    expect(DuplexMaker).to.be.a('function');
  });

  it('should proxy its write calls to the given writable', function () {
    var writable = stream.PassThrough();
    sinon.stub(writable, '_write', function (chunk, encoding, finish) {
      expect(chunk.toString()).to.equal('hello world');
      finish();
    });

    var duplex = DuplexMaker(writable);
    duplex.end('hello world');
    assert(writable._write.called, '_write method not called');
  });

  it('should proxy EOF to the given writable', function (done) {
    var writable = stream.PassThrough();
    writable.on('finish', done);

    var duplex = DuplexMaker(writable);
    duplex.end();
  })

  it('should read from the readable stream', function (done) {
    var readable = stream.PassThrough();
    sinon.spy(readable, '_read')

    setTimeout(readable.end.bind(readable, 'hello world'), 30);

    var duplex = DuplexMaker(stream.PassThrough(), readable);
    duplex.pipe(sink()).on('data', function (content) {
      assert(readable._read.called, '_read not called');
      expect(content).to.equal('hello world');
      done();
    })
  })
})
