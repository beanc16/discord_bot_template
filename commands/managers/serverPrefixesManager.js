// Libraries
const path = require("path");
const FileManager = require("../../custom_modules/fileManagement");

// Custom Variables
const defaultPrefix = require('../customization/defaultPrefix.json')
							  .prefix;
const serverPrefixesFilePath = path.join(__dirname, 
										 "../fileDatabase/" + 
										 "serverPrefixes.json");
let serverPrefixes = getAllServerPrefixes();
module.exports = {};





module.exports.tryInitializePrefix = function (message)
{
	if (!guildHasPrefix(message))
	{
		return initializePrefix(message);
	}
	
	const guildId = getGuildId(message);
	return serverPrefixes[guildId];
};

module.exports.tryUpdatePrefixJsonFile = function (message, newPrefix)
{
	const guildId = getGuildId(message);
	
	// Guild DOES have a prefix saved
	if (guildHasPrefix(message))
	{
		// The prefix HAS changed, so overwrite the .json file
		if (serverPrefixes[guildId] != newPrefix)
		{
			updateServerPrefixsVariable(guildId, newPrefix);
		}
	}
	
	// Guild DOES NOT have a prefix saved
	else
	{
		updateServerPrefixsVariable(guildId, newPrefix);
	}
};

module.exports.getGuildPrefix = function (message)
{
	if (!guildHasPrefix(message))
	{
		return initializePrefix(message);
	}
	
	const guildId = getGuildId(message);
	return serverPrefixes[guildId];
};



function getGuildId(message)
{
	return message.guild.id;
}

function getServerPrefixesFileContent()
{
	// Get data from the serverPrefixes.json file
	return FileManager.readFileSync(serverPrefixesFilePath);
}

function getAllServerPrefixes()
{
	// Return data from the serverPrefixes.json file
	const fileData = getServerPrefixesFileContent();
	return JSON.parse(fileData);
}



function guildHasPrefix(message)
{
	const guildId = getGuildId(message);
	return (serverPrefixes[guildId] != null);
}

function initializePrefix(message)
{
	const guildId = getGuildId(message);
	updateServerPrefixsVariable(guildId, defaultPrefix);
	
	return serverPrefixes[guildId];
}

function updateServerPrefixsVariable(guildId, newPrefix)
{
	serverPrefixes[guildId] = newPrefix;
	saveServerPrefixesToFile();
}

function saveServerPrefixesToFile()
{
	// Convert the serverPrefixes JSON data to a string & write to file
	const fileData = JSON.stringify(serverPrefixes);
	FileManager.writeFile(serverPrefixesFilePath, fileData);
}
