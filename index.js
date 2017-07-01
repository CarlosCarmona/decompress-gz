'use strict';
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const fileType = require('file-type');

module.exports = () => (input, opts) => {
	opts = opts || {};

	if (!Buffer.isBuffer(input)) {
		return Promise.reject(new TypeError(`Expected a Buffer, got ${typeof input}`));
	}

	if (Buffer.isBuffer(input) && (!fileType(input) || fileType(input).ext !== 'gz' || fileType(input).mime !== 'application/gzip')) {
		return Promise.resolve([]);
	}

	function decrompressBuff(buff, opts) {
		return new Promise(resolve => {
			zlib.gunzip(buff, async (err, datadec) => {
				if (err) {
					console.error(err);
					resolve([]);
				} else {
					const fdata = await new Promise(resolve => {
						fs.stat(opts.inputFile, (err, data) => {
							if (err) {
								resolve();
							} else {
								resolve(data);
							}
						});
					});

					if (fdata) {
						resolve([{path: path.basename(path.basename(opts.inputFile), '.gz'), data: datadec, type: 'file', mode: fdata.mode, mtime: fdata.mtime}]);
					} else {
						resolve([]);
					}
				}
			});
		});
	}
	return decrompressBuff(input, opts);
};
