// Library & Custom Variable
const Command = require("./miscellaneous/command");
const ServerPrefixesManager = require("./managers/" + 
									  "serverPrefixesManager");



class Prefix extends Command
{
	constructor()
	{
		super();
	}
	
	run(bot, user, userId, channelId, message, args, currentPrefix, 
		serverPrefixes)
    {
		// The user CAN manage the server/guild
		if (message.member.permissions.has("MANAGE_GUILD"))
		{
			// Get the new prefix based on the message (.prefix !)
			let newPrefix = getNewPrefix(args);

			// Update the prefix if it changed
			tryUpdatePrefix(message, currentPrefix, newPrefix);
		}
		
		// The user CAN NOT manage the server/guild
		else
		{
			// Send a message to the channel
			message.channel.send('You do not have permission to ' + 
								 'manage the server.');

			return currentPrefix;
		}
    }
	
	getCommandAbbreviations()
	{
		return super.getCommandAbbreviations("prefix", "pref");
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
        return "Changes the prefix that must be typed before a " + 
			   "command.";
	}
	
    getHelpExamples()
    {
		return super.getHelpExamples("prefix !");
    }
}



let thisCommand = new Prefix();

// Export functions (for require statements in other files)
module.exports = thisCommand.getAsJson();

function getNewPrefix(args)
{
    // Initialize a blank prefix
    let newPrefix = "";

    // Loop over each argument
    for (let i = 0; i < args.length; i++)
    {
        // If it's not the first argument, add space
        if (i !== 0)
        {
            newPrefix += " ";
        }

        // Add the current argument to the new prefix
        newPrefix += args[i];
    }

    // Return the new prefix
    return newPrefix;
}

function tryUpdatePrefix(message, currentPrefix, newPrefix)
{
	// A new prefix WAS set
	if (newPrefix !== "")
	{
		// Update .json file if the prefix changed
		ServerPrefixesManager.tryUpdatePrefixJsonFile(message, 
													  newPrefix);
		
		// Send a message to the channel
		message.channel.send('The prefix has been changed from: "' +
							 currentPrefix + '" to "' + newPrefix + 
							 '"');
		
		return newPrefix;
	}

	// A new prefix WAS NOT set
	else
	{
		// Send a message to the channel
		message.channel.send('No new prefix was detected. The ' + 
							 'prefix will stay as: ' + 
							 '"' + currentPrefix + '"');

		return currentPrefix;
	}
}
