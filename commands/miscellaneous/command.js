// Library & Custom Variable
const path = require("path");

class Command
{
	constructor()
	{}
	
	run(bot, user, userId, channelId, message, args, prefix, {
		botCommandNames,
		botCommandAbbreviations,
		botHasCommand,
		botGetCommand,
	})
	{
		throw new Error("Run for command has not been implemented!");
	}
	
	getCommandAbbreviations(...abbreviations)
	{
		if (abbreviations != null || abbreviations.length != 0)
		{
			return abbreviations;
		}
		
		throw new Error("Abbreviations for command have not been " + 
						"implemented!");
	}
	
	getRequiredPermissions()
	{
		return [];
	}
	
	
	
	/**********************
	 * HELP DOCUMENTATION *
	 **********************/
	
	getCommandName(fileName)
	{
		const fileNameWithExtension = path.basename(fileName);
		const extensionIndex = fileNameWithExtension.indexOf(".js");
		return fileNameWithExtension.substring(0, extensionIndex);
	}
	
	getHelpDescription(str)
	{
		throw new Error("Help description has not been implemented!");
	}
	
    getHelpExamples(...examples)
    {
		if (examples != null || examples.length != 0)
		{
			return examples;
		}
		
		throw new Error("Help examples have not been implemented!");
    }
	
	
	
	/******************
	 * module.exports *
	 ******************/
	
	getAsJson()
	{
		return {
			run: (bot, user, userId, channelId, message, args, prefix, options) => 
						this.run(bot, user, userId, channelId, message,
									args, prefix, options),

			commandAbbreviations: this.getCommandAbbreviations(),
			
			requiredPerms: this.getRequiredPermissions(),
			
			
			
			/**********************
			 * HELP DOCUMENTATION *
			 **********************/
			
			commandName: this.getCommandName(),
			
			helpDescription: this.getHelpDescription(),
			
			helpExamples: this.getHelpExamples(),
		};
	}
}



module.exports = Command;
