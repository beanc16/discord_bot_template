const BaseCommand = require("./miscellaneous/BaseCommand");
const {
	MetaInfoController,
	permissionsEnum,
	Text,
} = require("@beanc16/discordjs-helpers");
const Package = require('../package');



class About extends BaseCommand
{
    async run({
        args,
        attachments,
        bot,
        channel,
        helpers: {
            allBotCommandNames,
            allBotCommandAbbreviations,
            botHasCommand,
            botGetCommand,
        },
        prefix,
        message,
        reactions,
        server,
        user,
    })
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



    get abbreviations()
    {
        return [
            `${this.commandName}`,
			"info",
        ];
    }



    /*
     * Help documentation
     */

    get description()
    {
        return "Display information about me and my creator.";
    }
}



module.exports = new About();



function _getHomeServerInvite(info)
{
	if (info.homeServerInvite)
	{
		return `${Text.italic("Feedback and More Info:")}
			To give feedback or to learn more about me and my creator, join my home discord server here:
			${info.homeServerInvite}`
			.split("\t").join("");	// Remove tabs.
	}

	return "";
}
