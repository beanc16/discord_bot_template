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

// Telemetry
const { logger } = require("@beanc16/logger");

// Custom Variable
const customizationFolderPath = path.join(__dirname,
										"../commands/customization/");
const defaultPrefix = "$";
const defaultInvLink = "__PLEASE ADD INVITE LINK.__";
const defaultDonationLink = "__PLEASE ADD DONATION LINK.__";
const defaultCreationPurpose = "__PLEASE ADD CREATION PURPOSE.__";
const defaultHomeServerInvite = "__PLEASE ADD HOME INVITE LINK.__";



// Start the prompt
prompt.start();

// Create the schema for user input
const schema = {
	properties: {
		// AboutInfo botName
		botName: {
			message: "Enter the bot's name (this will be displayed " +
					 "when a user runs the about command).\n\n" +
					 
					 "Bot Name",
			required: true
		},
		
		// AboutInfo author
		author: {
			message: "Enter the bot's author (this will be " +
					 "displayed when a user runs the about " +
					 "command).\n\n" +
					 
					 "Author/Team Name",
			required: true
		},

		// DefaultPrefix prefix
		defaultPrefix: {
			message: "Enter the bot's default prefix (if nothing is " +
					 "entered, the default prefix will be $).\n\n" +

					 "Default Prefix"
		},
		
		// AboutInfo creationPurpose
		creationPurpose: {
			message: "Enter the reason why the bot is being made " +
					 "(this will be displayed when a user runs the " +
					 "about command). (You may leave this blank for " +
					 "now if you'd prefer to write it later.)\n\n" +
					 
					 "Creation Purpose"
		},
		
		// AboutInfo homeServerInvite
		homeServerInvite: {
			message: "Enter the a link to the bot's home server " +
				"(this will be displayed when a user runs the " +
				"about command). (You may leave this blank for " +
				"now if you'd prefer to write it later.)\n\n" +

				"Home Server Invite"
		},

		// InviteInfo inviteLink
		inviteLink: {
			message: "Enter the a link for users to invite the bot " +
					 "to their server (this will be displayed when " +
					 "a user runs the invite command). (You may " +
					 "leave this blank for now if you'd prefer to " +
					 "write it later.)\n\n" +

					 "Invite Link"
		},

		// DonationInfo donationLink
		donationLink: {
			message: "Enter the a link for user's to donate money " +
					 "to you (this will be displayed when a user " +
					 "runs the donate command). (You may leave this " +
					 "blank for now if you'd prefer to write it " +
					 "later.)\n\n" +

					 "Donation Link"
		}
		
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

	// Set default values for non-required fields
	result = prepareResult(result);

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
});





function prepareResult(result)
{
	// Prefix
	if (result.defaultPrefix.length == 0)
	{
		result.defaultPrefix = defaultPrefix;
	}

	// Invite
	if (result.inviteLink.length == 0)
	{
		result.inviteLink = defaultInvLink;
	}

	// Donation
	if (result.donationLink.length == 0)
	{
		result.donationLink = defaultDonationLink;
	}

	// About
	if (result.creationPurpose.length == 0)
	{
		result.creationPurpose = defaultCreationPurpose;
	}
	if (result.homeServerInvite.length == 0)
	{
		result.homeServerInvite = defaultHomeServerInvite;
	}

	return result;
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
