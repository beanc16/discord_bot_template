// Library & Custom Variable
const Command = require("./miscellaneous/command");
const PermissionsEnum = require("../helpers/enums/PermissionsEnum");

class Say extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, prefix)
	{
        // Form a message from what the user said after the command
		const msg = args.join(" ");

		// The user DID include a message
		if (msg.length > 0)
		{
			// Send a message to the channel
			message.channel.send(msg);
		}

		// The user DID NOT include a message
		else
		{
			// Send a message to the channel
			message.channel.send("No message to say detected.");
		}
	}
	
	getCommandAbbreviations()
	{
		return super.getCommandAbbreviations("say", "repeat");
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
		return "Make me repeat what you say.";
	}
	
	getHelpExamples()
	{
		return super.getHelpExamples("say Hi!");
	}
}



let thisCommand = new Say();

// Export functions (for require statements in other files)
module.exports = thisCommand.getAsJson();
