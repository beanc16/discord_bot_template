// Custom Variable
const CommandHelpers = require("../helpers/commandHelpers");



// Get the command abbreviations
const allCommandAbbreviations = CommandHelpers.getAllCommandAbbreviations();

// Make a singleton
const CommandAbbreviationsSingleton = {
	instance: allCommandAbbreviations
};

Object.freeze(CommandAbbreviationsSingleton);



module.exports = CommandAbbreviationsSingleton;
