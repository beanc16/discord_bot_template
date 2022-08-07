// Library & Custom Variable
const Command = require("./miscellaneous/command");
const { permissionsEnum } = require("@beanc16/discordjs-helpers");
const ServerPrefixesManagerV2 = require("../src/managers/serverPrefixesManagerV2");
const { logger } = require("@beanc16/logger");



class Prefix extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, currentPrefix, serverPrefixes)
    {
		const newPrefix = args.join(" ");

		// A new prefix WAS set
		if (newPrefix !== "")
		{
			ServerPrefixesManagerV2.setPrefix(message, newPrefix)
			.then(function ()
			{
				message.channel.send(`The prefix has been changed from \`${currentPrefix}\` to \`${newPrefix}\``);
			})
			.catch(function (err)
			{
				logger.error("Failed to set prefix", err);
				message.channel.send(`Failed to update prefix. It will stay as \`${currentPrefix}\``);
			});
		}

		// A new prefix WAS NOT set
		else
		{
			message.channel.send(`No new prefix was detected. The prefix will stay as \`${currentPrefix}\``);
		}
}
	
	getCommandAbbreviations()
	{
		return super.getCommandAbbreviations("prefix", "pref");
	}
	
	getRequiredPermissions()
	{
		return [permissionsEnum.MANAGE_GUILD];
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
        return "Changes the prefix that must be typed before a command.";
	}
	
    getHelpExamples()
    {
		return super.getHelpExamples("prefix !");
    }
}



let thisCommand = new Prefix();

// Export functions (for require statements in other files)
module.exports = thisCommand.getAsJson();
