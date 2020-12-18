// Libraries
const path = require("path");
const fs = require("fs");
let Trie = require("../custom_modules/Trie");

// Custom Variable
const commandsDirectory = path.join(__dirname, "../commands/");



// Export functions (for require statements in other files)
module.exports = {

    getAllCommandNames: function()
	{
		let trie = new Trie();
		
		iterateOverCommandFiles(function(fileNameWithExtension, commandName, commandsDirectory)
		{
			let command = require(commandsDirectory + commandName);
			trie.addCommand(commandName, command);
		});
		
		return trie;
	},
	
	getAllCommandAbbreviations: function()
	{
		let trie = new Trie();
		
		iterateOverCommandFiles(function(fileNameWithExtension, commandName, commandsDirectory)
		{
			// Get the array of command abbreviations from the file
			let curCommand = require(commandsDirectory + fileNameWithExtension);
			
			// If the command is not an empty object
			if (Object.keys(curCommand).length !== 0 && curCommand.constructor === Object)
			{
				let curAbbrevationsArray = curCommand.commandAbbreviations;
				
				for (let i = 0; i < curAbbrevationsArray.length; i++)
				{
					trie.addAbbreviation(curAbbrevationsArray[i], commandName);
				}
				
				trie.addCommand(commandName, commandName);
			}
		});
		
		return trie;
	},
	
	getCommandName: function(fileNameWithExtension)
	{
		let extensionIndex = fileNameWithExtension.indexOf(".js");
		return fileNameWithExtension.substring(0, extensionIndex);
	}
};



function iterateOverCommandFiles(functionToExecute)
{
	// Read the directory that commands are in
	let files = fs.readdirSync(commandsDirectory);
	
	for (let key in files)
	{
		let fileNameWithExtension = files[key];
		let extensionIndex = fileNameWithExtension.indexOf(".js");
		let commandName = fileNameWithExtension.substring(0, extensionIndex);
		
		// Is a .js command file, not a directory
		if (extensionIndex != -1)
		{
			functionToExecute(fileNameWithExtension, commandName, commandsDirectory);
		}
	}
}
