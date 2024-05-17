'use strict';

module.exports = buf => {
	if (!buf || buf.length < 4) return false;

  return buf[0] === 0x28 && buf[1] === 0xB5 && buf[2] === 0x2F && buf[3] === 0xFD;
};