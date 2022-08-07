// Env variables
require('dotenv').config();

// Custom variables
const { Permissions, Text } = require("@beanc16/discordjs-helpers");
const ServerPrefixesManager =  require("./src/managers/serverPrefixesManager");
const CommandAbbreviationsSingleton =  require("./singletons/CommandAbbreviationsSingleton");
const { allowCommandsInDms } = require("./src/botSettings.json");

// Libraries
const Discord = require('discord.js');

// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(process.env.TOKEN);

// Telemetry
const { logger } = require("@beanc16/logger");





/************
 * COMMANDS *
 ************/

/**
 * On Ready
 */

bot.on('ready', function (evt)
{
	const devStr = (process.env.STAGE && process.env.STAGE === "dev")
		? "-dev"
		: "";

	logger.info(`${process.env.APPLICATION_NAME}${devStr} has connected.`);
});



/**
 * On Message
 */

bot.on('message', function (message)
{
	// Only respond to messages that aren't in DMs
	if (
		allowCommandsInDms !== true &&
		message.channel.type === "dm" && !message.author.bot
	)
	{
		message.channel.send("I'm a snobby bot and I refuse to run commands in DMs");
		return;
	}

	// Try to initialize the guild's prefix if it doesn't exist
	ServerPrefixesManager.getPrefix(message)
	.then(async function (prefix)
	{
		prefix = _getPrefixForDevEnvironment(prefix);
		
		if (prefix && (message.content.startsWith(prefix) || botWasPinged(message))
			&& !message.author.bot)
		{
			// Get the message as an array, excluding the ping or prefix
			let args = getArgs(message, prefix);

			// Set the command that was used
			const command = args[0].toLowerCase();

			// Remove the command from the arguments
			args.shift();

			// Run the command
			await runCommands(command, message.author, message.author.id, message.channel.id, message, args, prefix);
		}
	})
	.catch(function (err)
	{
		// TODO: Handle err
		logger.error(err);
	});
});



/**
 * Helpers
 */

function botWasPinged(message)
{
	const firstUserPinged = message.mentions.users.first();
	const botAsUser = message.client.user;
	
	// No users were pinged
	if (firstUserPinged == null || botAsUser == null)
	{
		return false;
	}
	
	// This bot WAS pinged
	else if (firstUserPinged.id == botAsUser.id)
	{
		return true;
	}
	
	// This bot WAS NOT pinged
	return false;
}

function getArgs(message, prefix)
{
	// Prefix was used, remove the prefix and all spacing
	if (message.content.startsWith(prefix))
	{
		return message.content.slice(prefix.length)
							  .trim()
							  .split(/[ \n]+/g);
	}
	
	// Bot was pinged, remove the ping and all spacing
	const userPing = Text.Ping.user(message.author.id);
	return message.content.slice(userPing.length + 1)
						  .trim()
						  .split(/[ \n]+/g);
}

async function runCommands(userCommand, user, userId, channelId, message, args, prefix)
{
    // Get the command that should be ran
    const commandName = getCommandToRun(userCommand);
	
	// The command DOES exist
	if (commandName)
	{
		const command = require("./commands/" + commandName);
		
		// Check if user has permission to run the command
		const permValidation = Permissions.getMsgSenderPerms(command, message);
		
		if (permValidation.hasAllPerms)
		{
			await command.run(bot, user, userId, channelId, message, args, prefix);
		}
		else
		{
			missingPermsMessage(message, permValidation.missingPerms);
		}
	}
	
	// The command DOES NOT exist
	else
	{
		noCommandFoundMessage(message, prefix);
	}
}

function getCommandToRun(userCommand)
{
    let trie = CommandAbbreviationsSingleton.instance;
	return trie.getData(userCommand);
}

// Tell the user that the command wasn't found
function noCommandFoundMessage(message, prefix)
{
    // Send a message to the channel
    message.channel.send("Unknown command\n" +
                         "Please check `" + prefix + "help` " + 
						 "to view a list of all available commands\n" +
						 "Or, check `" + prefix + "help " +
                         "commandName` for help with a specific " + 
						 "command");
}

// Tell the user the permissions they're missing(
function missingPermsMessage(message, missingPermsArray)
{
	let missingPermsStr = "";
	for (let i = 0; i < missingPermsArray.length; i++)
	{
		missingPermsStr += missingPermsArray[i];
		
		// Add a comma after all missing perms except for the last
		if (i != missingPermsArray.length - 1)
		{
			missingPermsStr +=  ", ";
		}
	}
	
	// Send a message to the channel
    message.channel.send("You cannot use that command because " + 
						 "you're missing the following " + 
						 "permissions:\n" + missingPermsStr);
}

function _getPrefixForDevEnvironment(prefix)
{
	// Add "d" to the end of the prefix
	if (process.env.STAGE === "dev")
	{
		const lastCharacterOfPrefix = prefix.slice(-1);
		const index = lastCharacterOfPrefix.search(/[\W_]$/);

		// The last character of the prefix IS a non-word character
		if (index !== -1)
		{
			const allOfPrefixExceptForLastCharacter = prefix.slice(0, -1);
			return `${allOfPrefixExceptForLastCharacter}d${lastCharacterOfPrefix}`;	// Example: `bot.` => `botd.`
		}

		// The last character of the prefix IS NOT a non-word character
		return `${prefix}d`;														// Example: `bot` => `botd`
	}

	return prefix;
}
