import fs from 'fs';
import path from 'path';
import isJpg from 'is-jpg';
import pify from 'pify';
import test from 'ava';
import m from './';

const fsP = pify(fs);

test('extract file', async t => {
	const pathFile = path.join(__dirname, 'fixtures', 'file.jpg.gz');
	const buf = await fsP.readFile(pathFile);
	const opts = {};

	opts.inputFile = pathFile;

	const files = await m()(buf, opts);

	t.is(files[0].path, 'file.jpg');
	t.true(isJpg(files[0].data));
});

test('return empty array if non-valid file is supplied', async t => {
	const buf = await fsP.readFile(__filename);
	const files = await m()(buf);

	t.is(files.length, 0);
});

test('throw on wrong input', async t => {
	await t.throws(m()('foo'), 'Expected a Buffer, got string');
});
