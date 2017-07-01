# decompress-gz [![Build Status](https://travis-ci.org/ccarmona/decompress-gz.svg?branch=master)](https://travis-ci.org/ccarmona/decompress-gz)

> gz decompress plugin


## Install

```
$ npm install --save decompress-gz
```


## Usage

```js
const decompress = require('decompress');
const decompressGz = require('decompress-gz');

decompress('unicorn.gz', 'dist', {
	plugins: [
		decompressGz()
	]
}).then(() => {
	console.log('Files decompressed');
});
```


## API

### decompressGz()(input)

Returns both a Promise for a Buffer.

#### input

Type: `Buffer`

Buffer to decompress.


## License

MIT © [Carlos Carmona](https://github.com/ccarmona)
