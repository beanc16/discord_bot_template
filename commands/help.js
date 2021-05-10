// Library & Custom Variables
const Command = require("./miscellaneous/command");
const PermissionsEnum = require("../helpers/enums/PermissionsEnum");
const TextHelpers = require('../helpers/textHelpers');
const CommandNamesSingleton = require("../singletons/" +
									  "CommandNamesSingleton");



class Help extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, prefix)
    {
        // There's no arguments
        if (args.length === 0)
        {
            sendBaseHelpMessage(bot, userId, channelId, prefix, 
								message);
        }

        // There are arguments
        else
        {
			const command = args[0];
			const trie = CommandNamesSingleton.instance;
			if (trie.hasWord(command))
			{
				let commandClass = require("./" + command);
				getCommandsHelpMessage(commandClass, bot, userId, 
									   channelId, prefix, message);
				return;
			}
			
			// The command DOES NOT exist
			message.channel.send("\nNo help information on that " + 
								 "command is available.\n" + 
								 "Please check `" + prefix + "help` " +
								 "to view all commands.");
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
        return "Display a list of available commands or detailed " + 
			   "information about a specific command.";
	}
	
    getHelpExamples()
    {
		return super.getHelpExamples("help", "help ping", 
									 "help prefix");
    }
}



let thisCommand = new Help();

// Export functions (for require statements in other files)
module.exports = thisCommand.getAsJson();



// Send help message (when there's no arguments)
function sendBaseHelpMessage(bot, userID, channelID, prefix, message)
{
    // Set base help message to send
    let helpMessage =
		"To run a command, use " +
        TextHelpers.getCodeOneLineText(prefix + "commandName") + 
		" or " + TextHelpers.getUserPing(bot.user.id) + 
		" commandName" + "\n" + 
		"For example, " + TextHelpers.getCodeOneLineText(
			prefix + "ping"
		) + " or " +
		TextHelpers.getUserPing(bot.user.id) + " help " + "\n\n" +

		"Use " + TextHelpers.getCodeOneLineText(
			prefix + "help commandName"
		) +
		" for more information on a specific command\n" +
		"For example, " + TextHelpers.getCodeOneLineText(
			prefix + "help ping"
		) + " or " +
		TextHelpers.getCodeOneLineText(
			prefix + "help prefix"
		) + "\n\n" +

		"Note, commands are NOT case sensitive. " +
		"You can type them with any combination of " +
		"uppercase and lowercase letters, as long as " +
		"the command is still spelled correctly.\n\n" +

		TextHelpers.getBoldText("All Commands") + "\n```\n";

    // Add each command to the help message
	let allCommands = CommandNamesSingleton.instance.getCommands();
    for (let i = 0; i < allCommands.length; i++)
    {
        helpMessage += prefix + allCommands[i] + "\n";
    }

    // Close the multi-line text
    helpMessage += "```";

    // Send a message to the channel
    message.channel.send(helpMessage);
}



function getCommandsHelpMessage(command, bot, userID, channelID, 
								prefix, message)
{
	// Get command's info
	let commandName = command.commandName;
	let abbreviations = command.commandAbbreviations;
	let description = command.helpDescription;
	let examples = command.helpExamples;

	// Send message with info
	sendSpecificHelpMessage(bot, userID, channelID, prefix, 
							commandName, abbreviations, description, 
							examples, message);
}

function sendSpecificHelpMessage(bot, userID, channelID, prefix, 
								 commandName, abbreviations,
                                 description, examples, message)
{
    // Set base help message to send
    let helpMessage = "**" + prefix + commandName + "**\n\n" +
                      "*Description:*\n" + description + "\n\n" + 
					  "*Abbreviations:*\n";

    // Loop over each of the command's abbreviations
    for (let i = 0; i < abbreviations.length; i++)
    {
        // Add the current prefix to the message of abbreviations
        helpMessage += "`" + prefix + abbreviations[i] + "`\n";
    }

    // Add the details and examples
    helpMessage += "\n*Examples:*\n";

    // Loop over each of the command's examples
    for (let i = 0; i < examples.length; i++)
    {
        // Add the current prefix to the message of examples
        helpMessage += "`" + prefix + examples[i] + "`\n";
    }

    // Send a message to the channel
    message.channel.send(helpMessage);
}
