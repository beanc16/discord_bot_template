// Library & Custom Variables
const Command = require("./miscellaneous/command");
const { permissionsEnum } = require("@beanc16/discordjs-helpers");
const MetaInfoController = require("../src/managers/MetaInfoController");



class Donate extends Command
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
			if (info.donationLink)
			{
				const donationMessage = `You can support my creator by donating here:
					${info.donationLink}
					`.split("\t").join("");	// Remove tabs.

				message.channel.send(donationMessage);
			}

			else
			{
				message.channel.send("My creator has not set up a donation link");
			}
		});
    }
	
	getCommandAbbreviations()
	{
		return super.getCommandAbbreviations("donate", "donation");
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
        return "Display a link that lets you financially support my " +
			   "creator.";
	}
	
    getHelpExamples()
    {
		return super.getHelpExamples("donate");
    }
}



let thisCommand = new Donate();

// Export functions (for require statements in other files)
module.exports = thisCommand.getAsJson();
