// Library & Custom Variables
const Command = require("./miscellaneous/command");
const { permissionsEnum, Text } = require("@beanc16/discordjs-helpers");
const Package = require('../package');
const MetaInfoController = require("../src/managers/MetaInfoController");



class About extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, prefix)
    {
		MetaInfoController.get()
		.then(function (info)
		{
			const aboutMessageText =
				`${Text.bold(info.botName)}

				${Text.italic("Version:")}
				${Package.version}

				${Text.italic("Created By:")}
				${Package.author}

				${Text.italic("Description:")}
				Hi, my name is ${info.botName}. ${info.creationPurpose || ""}

				${_getHomeServerInvite(info)}
				`.split("\t").join("");	// Remove tabs.

			message.channel.send(aboutMessageText);
		});
    }
	
	getCommandAbbreviations()
	{
		return super.getCommandAbbreviations("about", "info");
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
        return "Display information about me and my creator.";
	}
	
    getHelpExamples()
    {
		return super.getHelpExamples("about");
    }
}



let thisCommand = new About();

// Export functions (for require statements in other files)
module.exports = thisCommand.getAsJson();



function _getHomeServerInvite(info)
{
	return (info.homeServerInvite)

		? `${Text.italic("Feedback and More Info:")}
			To give feedback or to learn more about me and my creator, join my home discord server here:
			${info.homeServerInvite}`
			.split("\t").join("")	// Remove tabs.

		: "";
}
