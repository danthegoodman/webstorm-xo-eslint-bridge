const cp = require('child_process');
const runXoPath = require.resolve('./run-xo');

class CLIEngine {
	constructor(options) {
		this.options = options;
	}

	// Xo is smart enough to ignore a file after it gets the file, so always treat it as not ignored.
	isPathIgnored(fileName) {
		return false;
	}

	// Webstorm grabs the config from the engine to determine if the file should be ignored before
	// it is sent to eslint. If ignored, webstorm acts as if no warnings were found.
	//
	// Because xo takes in a filename property when linting text, it can perform the ignoring check,
	// so we always tell webstorm that we're using these plugins so that it always asks xo to lint
	// the file (allowing xo to ignore it if it so wishes)
	getConfigForFile(fileName) {
		return {
			plugins: ['typescript', 'html', 'vue']
		}
	}

	executeOnText(content, fileName) {
		const result = cp.execFileSync(process.execPath, [runXoPath, fileName, this.options.fix === true], {
			input: content,
			encoding: 'utf8'
		});

		return JSON.parse(result);
	}
}

module.exports = {CLIEngine};
