#!/usr/bin/env node

'use strict';
const fs = require('fs');
const meow = require('meow');
const fn = require('gzip-size');
const pb = require('pretty-bytes');

const cli = meow(`
	Usage
	  $ gzip-size <file>
	  $ cat <file> | gzip-size

	Example
	  $ gzip-size index.js
	  211
`);

const input = cli.input[0];
const bytesFlag = cli.flags.b;

if (!input && process.stdin.isTTY) {
	console.error('Specify a filename');
	process.exit(1);
}

const source = input ? fs.createReadStream(input) : process.stdin;

source.pipe(fn.stream()).on('gzip-size', gzipSize => {
	if (bytesFlag) {
		console.log(pb(gzipSize));
	} else {
		console.log(gzipSize);
	}
});
