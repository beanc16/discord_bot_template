// Custom Variable
const CommandHelpers = require("../helpers/commandHelpers");



// Get the command abbreviations
const allCommandNames = CommandHelpers.getAllCommandNames();

// Make a singleton
const CommandNamesSingleton = {
	instance: allCommandNames
};

Object.freeze(CommandNamesSingleton);



module.exports = CommandNamesSingleton;
