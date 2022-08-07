// Library & Custom Variables
const Command = require("./miscellaneous/command");
const PermissionsEnum = require("../helpers/enums/PermissionsEnum");
const { Text } = require("@beanc16/discordjs-helpers");
const AboutInfo = require('./customization/aboutInfo');
const Package = require('../package');



const aboutMessageText =
`${Text.bold(AboutInfo.botName)}

${Text.italic("Version:")}
${Package.version}

${Text.italic("Created By:")}
${Package.author}

${Text.italic("Description:")}
Hi, my name is ${AboutInfo.botName}. ${_getCreationPurpose()}

${_getHomeServerInvite()}`;



class About extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, prefix)
    {
        message.channel.send(aboutMessageText);
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
        return "Display information about me, " + AboutInfo.botName + 
			   ", and my creator.";
	}
	
    getHelpExamples()
    {
		return super.getHelpExamples("about");
    }
}



let thisCommand = new About();

// Export functions (for require statements in other files)
module.exports = thisCommand.getAsJson();



function _getCreationPurpose()
{
	return AboutInfo.creationPurpose || "";
}

function _getHomeServerInvite()
{
	return (AboutInfo.homeServerInvite)

		? `${Text.italic("Feedback and More Info:")}
			To give feedback or to learn more about me and my creator, join my home discord server here:
			${AboutInfo.homeServerInvite}`
			.split("\t").join("")	// Remove tabs.

		: "";
}
