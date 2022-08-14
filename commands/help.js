const BaseCommand = require("./miscellaneous/BaseCommand");
const { Text } = require("@beanc16/discordjs-helpers");



class Help extends BaseCommand
{
    async run({
        args,
        bot,
        helpers: {
            allBotCommandNames,
			botHasAbbreviation,
            botGetCommand,
        },
        prefix,
        message,
    })
	{
		const commandName = args[0];
		let helpMsg;

        // There ARE NOT arguments.
        if (args.length === 0)
        {
            helpMsg = _getBaseHelpMessage({
				bot,
				prefix,
				message,
				allBotCommandNames,
			});
        }

        // There ARE arguments AND the command DOES exist.
        else if (botHasAbbreviation(commandName))
        {
			const command = botGetCommand(commandName);

			helpMsg = _getHelpMessageForExistingCommand({
				abbreviations: command.abbreviations,
				commandName: command.commandName,
				description: command.description,
				examples: command.examples,
				message,
				prefix,
			});
        }

        // There ARE arguments BUT the command DOES NOT exist.
		else
		{
			helpMsg = _getHelpMessageForNonexistantCommand(prefix);
		}

		message.channel.send(helpMsg);
	}



    /*
     * Help documentation
     */

    get description()
    {
        return "Display a list of available commands or detailed information about a specific command.";
    }

	get examples()
	{
		return [
			`${this.commandName}`,
			`${this.commandName} ping`,
			`${this.commandName} prefix`,
		];
	}
}



module.exports = new Help();



function _getBaseHelpMessage({
	bot,
	prefix,
	allBotCommandNames,
})
{
	const botPing = Text.Ping.user(bot.user.id);

	let helpMessage =
		`To run a command, use ${Text.Code.oneLine(`${prefix}commandName`)} or ${botPing} commandName
		For example, ${Text.Code.oneLine(`${prefix}ping`)} or ${botPing} help
		
		Use ${Text.Code.oneLine(`${prefix}help commandName`)} for more information on a specific command
		For example, ${Text.Code.oneLine(`${prefix}help ping`)} or ${Text.Code.oneLine(`${prefix}help prefix`)}
		
		Note, commands are NOT case sensitive. You can type them with any combination of uppercase and lowercase letters, as long as the command is still spelled correctly.
		
		${Text.bold("All Commands")}
		`.split("\t").join("");	// Remove tabs.

	// Add list of command names to help message
	helpMessage += allBotCommandNames.reduce(function (acc, commandName)
	{
		return acc += `${prefix}${commandName}\n`;
	}, "```") + "```";

    return helpMessage;
}

function _getHelpMessageForExistingCommand({
	abbreviations,
	commandName,
	description,
	examples,
	prefix,
})
{
	// Base help message.
	let helpMessage =
		`${Text.bold(`${prefix}${commandName}`)}
		
		${Text.italic("Description:")}
		${description}
		`.split("\t").join("");	// Remove tabs.
	
	// Add abbreviations.
	if (abbreviations.length > 0)
	{
		helpMessage += abbreviations.reduce(function (acc, cur)
		{
			return acc += `${Text.Code.oneLine(`${prefix}${cur}`)}\n`;
		}, `\n${Text.italic("Abbreviations:")}\n`);
	}
	
	// Add examples.
	if (examples.length > 0)
	{
		helpMessage += examples.reduce(function (acc, cur)
		{
			return acc += `${Text.Code.oneLine(`${prefix}${cur}`)}\n`;
		}, `\n${Text.italic("Examples")}:\n`);
	}

    return helpMessage;
}

function _getHelpMessageForNonexistantCommand(prefix)
{
	return `No help information on that command is available.
		Please check ${Text.Code.oneLine(`${prefix}help`)} to view all commands.
		`.split("\t").join("");	// Remove tabs.
}
