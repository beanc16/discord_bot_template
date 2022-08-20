const parseBoolean = require("./helpers/parseBoolean");



const botPrefixIsCaseSensitive = {
	description: `Enter whether the bot's prefix should be case senstive (true/false).
		
		Case Sensitive Prefix*`
		.split("\t").join(""),      					// Remove tabs.
	message: "Case Sensitive Prefix must be a boolean.",
	pattern: /^(true|false)$/i,
	default: "false",
	required: true,
	before: parseBoolean,
};



module.exports = botPrefixIsCaseSensitive;
