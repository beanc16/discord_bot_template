/*
 * NOTE:
 * The bot will never see or use this file. This exists purely as a
 * quality of life improvement to help developers do their first time
 * setup quicker.
 */

// Library
const prompt = require("prompt");	// For reading command line input
const path = require("path");
const FileManager = require("../custom_modules/fileManagement");
const { DiscordBotSettingsMicroservice } = require("@beanc16/microservices-abstraction");

// Telemetry
const { logger } = require("@beanc16/logger");

// Custom Variable
const customizationFolderPath = path.join(__dirname, "../commands/customization/");



// Start the prompt
prompt.start();

// Create the schema for user input
const schema = {
	properties: {
		// AboutInfo botName
		botName: {
			description: `Enter the bot's name.
				        (Displayed when a user runs the about command.)
				
				Bot Name*`
				.split("\t").join(""),       					// Remove tabs.
			message: "Bot Name is required.",
			required: true
		},
		
		// AboutInfo author
		author: {
			description: `Enter the name of the bot's author.
				        (Displayed when a user runs the about command.)
				
				Author/Team Name*`
				.split("\t").join(""),       					// Remove tabs.
			message: "Author/Team Name is required.",
			required: true
		},

		// DefaultPrefix prefix
		defaultPrefix: {
			description: `Enter the bot's default prefix.
				
				Default Prefix`
				.split("\t").join(""),       					// Remove tabs.
			default: "bot.",
			required: false,
		},
		
		// AboutInfo creationPurpose
		creationPurpose: {
			description: `Enter the reason why the bot is being made.
				        (Displayed when a user runs the about command.)
				
				Creation Purpose`
				.split("\t").join(""),       					// Remove tabs.
			required: false,
		},
		
		// AboutInfo homeServerInvite
		homeServerInvite: {
			description: `Enter the a link to the bot's home server.
				        (Displayed when a user runs the about command.)
				
				Home Server Invite`
				.split("\t").join(""),       					// Remove tabs.
			required: false,
		},

		// InviteInfo inviteLink
		inviteLink: {
			description: `Enter the a link for users to invite the bot to their server.
				        (Displayed when a user runs the invite command.)
				
				Invite Link`
				.split("\t").join(""),       					// Remove tabs.
			required: false,
		},

		// DonationInfo donationLink
		donationLink: {
			description: `Enter a link for user's to donate money to you.
				        (Displayed when a user runs the donate command.)
				
				Donation Link`
				.split("\t").join(""),      					// Remove tabs.
			required: false,
		},
		
		// Allows allowCommandsInDms
		allowCommandsInDms: {
			description: `Enter whether users should be allowed to run commands in the bot's DMs (true/false).
				
				Allow Commands in DMs*`
				.split("\t").join(""),      					// Remove tabs.
			message: "Allow Commands in DMs must be a boolean.",
			pattern: /^(true|false)$/i,
			default: "true",
			required: true,
			before: (value) => (value.toLowerCase() === "true" || value.toLowerCase() === "false")
								? JSON.parse(value.toLowerCase())
								: value,						// Parse to boolean.
		},
		
		// Allows allowCommandsInServers
		allowCommandsInServers: {
			description: `Enter whether users should be allowed to run commands in servers (true/false).
				
				Allow Commands in Servers*`
				.split("\t").join(""),      					// Remove tabs.
			message: "Allow Commands in DMs must be a boolean.",
			pattern: /^(true|false)$/i,
			default: "true",
			required: true,
			before: (value) => (value.toLowerCase() === "true" || value.toLowerCase() === "false")
								? JSON.parse(value.toLowerCase())
								: value,						// Parse to boolean.
		},
	}
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

	// TODO: Update name and description in package.json.

	logger.debug("Creating bot...", { app, data });
	DiscordBotSettingsMicroservice.v1.create({
		app,
		data,
	})
	.then(function (response)
	{
		logger.info(response.data);
	})
	.catch(function (err)
	{
		logger.error("Error creating bot", err);
	});

	/*
	//
	const jsonTextToWrite = {
		"aboutInfo": getJsonText(
			["botName", "author", "creationPurpose",
						"homeServerInvite"],
			[result.botName, result.author, result.creationPurpose,
						result.homeServerInvite]
		),
		"defaultPrefix": getJsonText(
			["prefix"], [result.defaultPrefix]
		),
		"donationInfo": getJsonText(
			["donationLink"], [result.donationLink]
		),
		"inviteInfo": getJsonText(
			["inviteLink"], [result.inviteLink]
		)
	};
	
	// Save to file
	for (let key in jsonTextToWrite)
	{
		FileManager.writeFile(customizationFolderPath + key + ".json",
			jsonTextToWrite[key]);
	}
	*/
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

function getJsonText(keysArray, valuesArray)
{
	let output = "{\n";

	for (let i = 0; i < keysArray.length; i++)
	{
		if (valuesArray[i] != null)
		{
			output += '\t"' + keysArray[i] + '": "' + valuesArray[i] + '",\n';
		}
	}

	// Remove last comma
	output = output.replace(/,\s*$/, "");

	output += "\n}";

	return output;
}
