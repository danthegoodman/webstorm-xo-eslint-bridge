module.exports = {

	// Webstorm uses this API to support the "Extra eslint options" field.
	// xo v0.27 doesn't supply a CLI parsing api, so this bridge doesn't support this feature.
	parse(args) {
		return {};
	}

};
