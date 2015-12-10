var bson = null;

try {
	// Load the precompiled win32 binary
	if(process.platform == "win32" && process.arch == "x64") {
	  bson = require('./win32/x64/bson');
	} else if(process.platform == "win32" && process.arch == "ia32") {
	  bson = require('./win32/ia32/bson');
	} else {
	  bson = require('bindings')('bson.node');
	}
} catch(err) {
	// Attempt to load the release bson version
	try {
		bson = require('bindings')('bson.node');
	} catch (err) {
		console.log(err); // Show why it's not loading
		throw new Error("js-bson: Failed to load c++ bson extension, using pure JS version");
	}
}

exports.BSON = bson.BSON;

// Just add constants tot he Native BSON parser
exports.BSON.BSON_BINARY_SUBTYPE_DEFAULT = 0;
exports.BSON.BSON_BINARY_SUBTYPE_FUNCTION = 1;
exports.BSON.BSON_BINARY_SUBTYPE_BYTE_ARRAY = 2;
exports.BSON.BSON_BINARY_SUBTYPE_UUID = 3;
exports.BSON.BSON_BINARY_SUBTYPE_MD5 = 4;
exports.BSON.BSON_BINARY_SUBTYPE_USER_DEFINED = 128;
