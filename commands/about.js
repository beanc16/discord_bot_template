// Library & Custom Variables
const Command = require("./miscellaneous/command");
const TextHelpers = require('../helpers/textHelpers');
const AboutInfo = require('./customization/aboutInfo');
const Package = require('../package');



class About extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, prefix)
    {
		let creationPurpose = getCreationPurpose();
		let serverInvite = getHomeServerInvite();
		
        // Initialize the message to display
        let aboutMessage = TextHelpers.getBoldText(AboutInfo.botName) +
						   "\n\n" +

                           TextHelpers.getItalicText("Version:") + "\n" +
                           Package.version + "\n\n" +

                           TextHelpers.getItalicText("Created by:") +
						   "\n" +
                           Package.author + "\n\n" +

                           TextHelpers.getItalicText("Description:") +
						   "\n" +
                           "Hi, my name is " + AboutInfo.botName + 
						   ". " + creationPurpose + "\n\n" +

                           serverInvite;

        // Send a message to the channel
        message.channel.send(aboutMessage);
    }
	
	getCommandAbbreviations()
	{
		return super.getCommandAbbreviations("about", "info");
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



function getCreationPurpose()
{
	let creationPurpose;
	if (AboutInfo.creationPurpose != null)
	{
		creationPurpose = AboutInfo.creationPurpose;
	}
	else
	{
		creationPurpose = "";
	}
	
	return creationPurpose;
}

function getHomeServerInvite()
{
	let serverInvite;
	if (AboutInfo.homeServerInvite != null)
	{
		serverInvite = TextHelpers.getItalicText("Feedback and " +
											 "More Info:") + "\n" +
					   "To give feedback or to learn more about me " + 
					   "and my creator, join my home discord " + 
					   "server here:\n" +
					   AboutInfo.homeServerInvite;
	}
	else
	{
		serverInvite = "";
	}
	
	return serverInvite;
}
