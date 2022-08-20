/*
 * NOTE:
 * The bot will never see or use this file. This exists purely as a
 * quality of life improvement to help developers do their first time
 * setup quicker.
 */

const prompt = require("prompt");	// For reading command line input
const fs = require("fs");
const appRootPath = require("app-root-path");
const packageJsonPath = appRootPath.resolve("package.json");
const package = require(packageJsonPath);
const { DiscordBotSettingsMicroservice } = require("@beanc16/microservices-abstraction");
const { logger } = require("@beanc16/logger");

const schemaProperties = require("./helpers/firstTimeSetup");



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
		logger.error("Error running first time setup", err);
		return 1;
	}

	const { app, data } = _parseResultToBotCreationPayload(result);

	logger.debug("Creating bot settings and app...", { app, data });

	DiscordBotSettingsMicroservice.v1.create({
		app,
		data,
	})
	.then((response) => _writeToPackageJson({ app, response, result }))
	.catch(function (err)
	{
		logger.error("Error creating bot", err);
	});
});





function _parseResultToBotCreationPayload(result)
{
	const app = {
		displayName: result.botName,
		searchName: result.botName.toLowerCase().split(" ").join("-"),
		envs: [
			"dev",
			"prod",
		],
	};

	const data = {
		defaultPrefix: result.defaultPrefix,
		botPrefixIsCaseSensitive: result.botPrefixIsCaseSensitive,
		allowCommandsInDms: result.allowCommandsInDms,
		allowCommandsInServers: result.allowCommandsInServers,
	};

	if (result.creationPurpose.length > 0) data.creationPurpose = result.creationPurpose;
	if (result.inviteLink.length > 0) data.inviteLink = result.inviteLink;
	if (result.homeServerInvite.length > 0) data.homeServerInvite = result.homeServerInvite;
	if (result.donationLink.length > 0) data.donationLink = result.donationLink;

	return {
		app,
		data,
	};
}

function _writeToPackageJson({ app, response, result })
{
	logger.info(response.data);

	// Update package.json.
	package.name = app.searchName;
	package.description = result.description;
	package.author = result.author;

	fs.writeFile(packageJsonPath, JSON.stringify(package, null, 4), function (err)
	{
		if (err)
		{
			logger.error("Error updating package.json on first time setup", err);
		}

		else
		{
			logger.info("Successfully updated package.json on first time setup");
		}
	});
}
