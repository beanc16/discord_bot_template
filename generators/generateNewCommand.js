/*
 * NOTE:
 * The bot will never see or use this file. This exists purely as a
 * quality of life improvement to help developers create new command 
 * files quicker.
 */

// Reading command line input
const prompt = require("prompt");

// Files & Paths
const fs = require("fs");
const appRootPath = require("app-root-path");
const commandsFolder = appRootPath.resolve("./src/commands");
const commandTemplatePath = appRootPath.resolve("./handlebars/command.handlebars");

// Templating
const Handlebars = require("handlebars");

Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

Handlebars.registerHelper("capital", function(str)
{
	const firstLetter = str.charAt(0);
	return firstLetter.toUpperCase() + str.slice(1);
});

// Helpers
const schemaProperties = require("./helpers/generateNewCommand");

// Other
const { permissionsEnum } = require("@beanc16/discordjs-helpers");
const { logger } = require("@beanc16/logger");



// Start the prompt
prompt.start();

// Create the schema for user input
const schema = {
	properties: schemaProperties,
};



// Get user input
prompt.get(schema, function (err, result)
{
	if (err)
	{
		logger.error("Error running generate new command", err);
		return 1;
	}
	
	// Convert the permissions to the enum form
	result.permissions = _preparePermissions(result);


	// Read the command template file
	const commandTemplateText = fs.readFileSync(commandTemplatePath, "utf8");
	const commandTemplate = Handlebars.compile(commandTemplateText);

	// Get the text to write to the output file
	const commandFileOutput = commandTemplate(result);

	// Write the output
	console.log("About to save");
	fs.writeFileSync(`${commandsFolder}/${result.name}.js`, commandFileOutput, function (err)
	{
		if (err)
		{
			logger.error("Error generating new command", err);
		}

		else
		{
			logger.info("Successfully generated new command", {
				name: result.name,
				relativePath: `${commandsFolder}/${result.name}.js`,
			});
		}
	});
});




function _preparePermissions(result)
{
	let permissions = result.permissions;
	
	if (permissions.length == 0) return;
	
	// Split the string of permissions into an array
	permissions = permissions.split(",");
	
	// Remove spacing from each element in the array
	permissions = permissions.map(element => element.trim());
	
	// Return an array of `permissionsEnum.${key}` strings
	return permissionsEnum.convertFromIndexArray(permissions);
}
