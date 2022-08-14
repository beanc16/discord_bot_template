// Library & Custom Variables
const Command = require("./miscellaneous/command");
const { permissionsEnum, Text } = require("@beanc16/discordjs-helpers");



class Help extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, prefix, {
		botCommandNames,
		botCommandAbbreviations,
		botHasAbbreviation,
		botHasCommand,
		botGetCommand,
	})
    {
        // There's no arguments
        if (args.length === 0)
        {
            _sendBaseHelpMessage(bot, userId, channelId, prefix, message, botCommandNames);
        }

        // There are arguments
        else
        {
			const commandName = args[0];
			if (botHasAbbreviation(commandName))
			{
				const command = botGetCommand(commandName);
				_getCommandsHelpMessage(command, bot, userId, channelId, prefix, message);
				return;
			}
			
			// The command DOES NOT exist
			message.channel.send(_getCommandDoesNotExistMessage(prefix));
        }
    }
	
	getCommandAbbreviations()
	{
		return super.getCommandAbbreviations("help", "h");
	}
	
	getRequiredPermissions()
	{
		return [];
	}
	
	
	
	/**********************
	 * HELP DOCUMENTATION *
	 **********************/
	
	getCommandName()
	{
		return super.getCommandName(__filename);
	}
	
	getHelpDescription()
	{
        return "Display a list of available commands or detailed information about a specific command.";
	}
	
    getHelpExamples()
    {
		return super.getHelpExamples("help", "help ping", "help prefix");
    }
}



let thisCommand = new Help();

// Export functions (for require statements in other files)
module.exports = thisCommand.getAsJson();



// Send help message (when there's no arguments)
function _sendBaseHelpMessage(bot, userID, channelID, prefix, message, botCommandNames)
{
	const botPing = Text.Ping.user(bot.user.id);

	let helpMessage =
		`To run a command, use ${Text.Code.oneLine(`${prefix}commandName`)} or ${botPing} commandName
		For example, ${Text.Code.oneLine(`${prefix}ping`)} or ${botPing} help
		
		Use ${Text.Code.oneLine(`${prefix}help commandName`)} for more information on a specific command
		For example, ${Text.Code.oneLine(`${prefix}help ping`)} or ${Text.Code.oneLine(`${prefix}help prefix`)}
		
		Note, commands are NOT case sensitive. You can type them with any combination of uppercase and lowercase letters, as long as the command is still spelled correctly.
		
		${Text.bold("All Command")}
		\`\`\`
		`.split("\t").join("");	// Remove tabs.
	
	botCommandNames.forEach(function (command)
	{
		helpMessage += `${prefix}${command}\n`;
	});

    // Close the multi-line text
    helpMessage += "```";

    // Send a message to the channel
    message.channel.send(helpMessage);
}



function _getCommandsHelpMessage(command, bot, userID, channelID, prefix, message)
{
	// Get command's info
	let commandName = command.commandName;
	let abbreviations = command.commandAbbreviations;
	let description = command.helpDescription;
	let examples = command.helpExamples;

	// Send message with info
	_sendSpecificHelpMessage(bot, userID, channelID, prefix, 
							commandName, abbreviations, description, 
							examples, message);
}

function _sendSpecificHelpMessage(bot, userID, channelID, prefix, 
								commandName, abbreviations,
								description, examples, message)
{
	const abbreviationsStr = abbreviations.reduce(function (acc, cur)
	{
		acc += `${Text.Code.oneLine(`${prefix}${cur}`)}\n`;
		return acc;
	}, `\n${Text.italic("Abbreviations:")}\n`);

	const examplesStr = examples.reduce(function (acc, cur)
	{
		acc += `${Text.Code.oneLine(`${prefix}${cur}`)}\n`;
		return acc;
	}, `\n${Text.italic("Examples")}:\n`);

	let helpMessage =
		`${Text.bold(`${prefix}${commandName}`)}
		
		${Text.italic("Description:")}
		${description}
		`.split("\t").join("");	// Remove tabs.
	
	if (abbreviations.length > 0)
	{
		helpMessage += abbreviationsStr;
	}
	
	if (examples.length > 0)
	{
		helpMessage += examplesStr;
	}

    // Send a message to the channel
    message.channel.send(helpMessage);
}

function _getCommandDoesNotExistMessage(prefix)
{
	return `No help information on that command is available.
			Please check ${Text.Code.oneLine(`${prefix}help`)} to view all commands.`
			.split("\t").join("");	// Remove tabs.
}
