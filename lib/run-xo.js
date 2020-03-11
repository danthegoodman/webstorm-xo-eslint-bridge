'use strict';
const xo = require('xo');

const filename = process.argv[2];
const fix = process.argv[3] === 'true';

concatStream(process.stdin, content => {
	let result = xo.lintText(content, {
		stdin: true,
		stdinFilename: filename,
		filename: filename,
		fix: fix
	});

	process.stdout.write(JSON.stringify(result));
});

function concatStream(stream, cb) {
	const parts = [];
	let length = 0;

	stream.on('readable', () => {
		let chunk = stream.read();
		while (chunk) {
			parts.push(chunk);
			length += chunk.length;
			chunk = stream.read();
		}
	});

	stream.on('end', () => {
		cb(Buffer.concat(parts, length).toString('utf8'));
	});
}
