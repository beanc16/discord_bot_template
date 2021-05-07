// Library & Custom Variable
const path = require("path");
const CommandHelpers = require('../../helpers/commandHelpers');

class Command
{
	constructor()
	{}
	
	run(bot, user, userId, channelId, message, args, prefix)
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
		let fileNameWithExtension = path.basename(fileName);
		return CommandHelpers.getCommandName(fileNameWithExtension);
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
			run: (bot, user, userId, channelId, message, args, 
				  prefix) => 
						this.run(bot, user, userId, channelId, message,
								 args, prefix),

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
