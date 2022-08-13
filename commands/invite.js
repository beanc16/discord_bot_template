// Library & Custom Variables
const Command = require("./miscellaneous/command");
const { permissionsEnum } = require("@beanc16/discordjs-helpers");
const MetaInfoManager = require("../src/managers/MetaInfoManager");



class Invite extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, prefix)
    {
		MetaInfoManager.get()
		.then(function (info)
		{
			if (info.inviteLink)
			{
				const inviteMessage = `You can invite me to your server here:
					${info.inviteLink}
					`.split("\t").join("");	// Remove tabs.
	
				message.channel.send(inviteMessage);
			}

			else
			{
				message.channel.send("My creator has not set up an invite link");
			}
		});
    }
	
	getCommandAbbreviations()
	{
		return super.getCommandAbbreviations("invite", "inv");
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
        return "Display a link that lets you invite me to a server.";
	}
	
    getHelpExamples()
    {
		return super.getHelpExamples("invite");
    }
}



let thisCommand = new Invite();

// Export functions (for require statements in other files)
module.exports = thisCommand.getAsJson();
