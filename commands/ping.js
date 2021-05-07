// Library & Custom Variable
const Command = require("./miscellaneous/command");
const PermissionsEnum = require("../helpers/enums/PermissionsEnum");



class Ping extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, prefix)
    {
		const pongMsg = "🏓 Latency is " + 
						(Date.now() - message.createdTimestamp) + 
						"ms 🏓";
        message.channel.send(pongMsg);
    }
	
	getCommandAbbreviations()
	{
		return super.getCommandAbbreviations("ping");
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
        return 'Get a simple "Pong!" ' + "response to test the " + 
			   "bot's response time.";
	}
	
    getHelpExamples()
    {
		return super.getHelpExamples("ping");
    }
}



let thisCommand = new Ping();

// Export functions (for require statements in other files)
module.exports = thisCommand.getAsJson();
