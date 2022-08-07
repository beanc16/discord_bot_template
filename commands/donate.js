// Library & Custom Variables
const Command = require("./miscellaneous/command");
const { permissionsEnum } = require("@beanc16/discordjs-helpers");
const DonationInfo = require('./customization/donationInfo');



class Donate extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, prefix)
    {
		// Initialize the message to display
        const donationMessage = "You can support my creator by " + 
								"donating here:\n" +
							    DonationInfo.donationLink;

        // Send a message to the channel
        message.channel.send(donationMessage);
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
