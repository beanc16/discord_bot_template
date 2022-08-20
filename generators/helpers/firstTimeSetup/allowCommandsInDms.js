const parseBoolean = require("./helpers/parseBoolean");



const allowCommandsInDms = {
	description: `Enter whether users should be allowed to run commands in the bot's DMs (true/false).
		
		Allow Commands in DMs*`
		.split("\t").join(""),      					// Remove tabs.
	message: "Allow Commands in DMs must be a boolean.",
	pattern: /^(true|false)$/i,
	default: "true",
	required: true,
	before: parseBoolean,
};



module.exports = allowCommandsInDms;
