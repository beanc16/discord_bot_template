// Library & Custom Variables
const Command = require("./miscellaneous/command");
const InviteInfo = require('./customization/inviteInfo');



class Invite extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, prefix)
    {
		// Initialize the message to display
        const inviteMessage = "You can invite me to your server " + 
							  "here:\n" + InviteInfo.inviteLink;

        // Send a message to the channel
        message.channel.send(inviteMessage);
    }
	
	getCommandAbbreviations()
	{
		return super.getCommandAbbreviations("invite", "inv");
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
