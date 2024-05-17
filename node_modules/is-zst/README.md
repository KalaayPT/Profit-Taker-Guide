# is-zst

Check if a buffer is zst compressed.

## Usage

```js
const fs = require('fs');
const isZst = require('is-zst');

isZst(fs.readFileSync('foo.tar.zst'));
//=> true
```