/*
 * NOTE:
 * The bot will never see or use this file. This exists purely as a
 * quality of life improvement to help developers create new command 
 * files quicker.
 */

// Library
const prompt = require("prompt");	// For reading command line input
const path = require("path");
const fs = require("fs");
const { permissionsEnum } = require("@beanc16/discordjs-helpers");

// Telemetry
const { logger } = require("@beanc16/logger");

// Custom Variable
const commandTemplateFilePath = path.join(__dirname, 
										  "./commandTemplate.txt");
const commandFolderPath = path.join(__dirname, "../commands/");



// Start the prompt
prompt.start();

// Create the schema for user input
const schema = {
	properties: {
		// Command name
		name: {
			message: "Enter the command's name (this will be the " + 
					 "name of the file & what user's will type to " + 
					 "run your command in discord, excluding the " + 
					 "prefix).\n\n" +
					 
					 "Example:\n" + 
					 "prefix\n\n" + 
					 
					 "command name",
			required: true
		},
		
		// Help description
		description: {
			message: "Enter the command's description that will " + 
					 "appear when a user calls the help command on " + 
					 "this command.\n\n" +
					 
					 "Example:\n" + 
					 "Changes the prefix that must be typed before " + 
					 "a command.\n\n" + 
					 
					 "help description",
		},
		
		// Command abbreviations
		abbreviations: {
			message: "Enter the command's abbreviations as a comma " + 
					 "separated list (including the command's " + 
					 "original name is optional).\n\n" +
					 
					 "Example:\n" + 
					 "pref, pre\n\n" + 
					 
					 "command abbreviations"
		},
		
		// Help example
		examples: {
			message: "Enter an example of how a user might call the " +
					 "command (don't include any prefix).\n\n" +
					 
					 "Example:\n" + 
					 "prefix !\n\n" + 
					 
					 "help example",
		},
		
		// Permissions
		permissions: {
			message: "Enter the numbers below that correspond to " + 
					 "the permissions required to use this command " + 
					 "as a comma separated list.\n\n" +
					 
					 permissionsEnum.getAsString() + "\n\n" +
					 
					 "Example:\n" + 
					 "0, 8, 22, 5\n\n" + 
					 
					 "command required permissions",
		},
		
	}
};



// Get user input
prompt.get(schema, function (err, result)
{
	if (err)
	{
		logger.error("Error generating new command", err);
		return 1;
	}
	
	// Add the command name to the abbreviations if it isn't included
	result.abbreviations = prepareAbbreviations(result);
	
	// Add a capitalized version of the command name to the result
	result["nameCapital"] = capitalizeFirstLetter(result.name);
	
	// Convert the permissions to the enum form
	result.permissions = preparePermissions(result);
	
	let commandTemplate = fs.readFileSync(commandTemplateFilePath, "utf8");
	commandTemplate = updateCommandTemplate(commandTemplate, result);
	
	// Save to file
	fs.writeFile(`${commandFolderPath}${result.name}.js`, commandTemplate);
});




function prepareAbbreviations(result)
{
	let abbreviations = result.abbreviations;

	// If no abbreviation were given, return only the command name
	if (abbreviations.length == 0)
	{
		return '"' + result.name + '"';
	}
	
	// Add the command name as an abbreviation if it isn't already one
	else if (!abbreviations.includes(result.name))
	{
		abbreviations = result.name + ", " + abbreviations
	}
	
	// Remove all space from & add quotes around each abbreviation
	let array = abbreviations.split(",");
	for (let i = 0; i < array.length; i++)
	{
		array[i] = '"' + array[i].trim() + '"';
	}
	abbreviations = array.join(", ");
	
	return abbreviations;
}

function preparePermissions(result)
{
	let permissions = result.permissions;
	
	if (permissions.length == 0)
	{
		return "";
	}
	
	// Split the string of permissions into an array
	permissions = permissions.split(",");
	
	// Remove spacing from each element in the array
	permissions = permissions.map(element => element.trim());
	
	// Return it as output to put into the file
	return permissionsEnum.convertFromIndexArray(permissions);
}

function capitalizeFirstLetter(str)
{
	let firstLetter = str.charAt(0);
	return firstLetter.toUpperCase() + str.slice(1);
}

function updateCommandTemplate(commandTemplate, result)
{
	for (let key in result)
	{
		commandTemplate = replaceAllOfType(commandTemplate, key, 
										   result[key]);
	}
	
	return commandTemplate;
}

function replaceAllOfType(str, variableName, variable)
{
	const regex = new RegExp(`<${variableName}>`, "g");
	return str.replace(regex, variable);
}
