const BaseCommand = require("./miscellaneous/BaseCommand");
const { MetaInfoController } = require("@beanc16/discordjs-helpers");



class Invite extends BaseCommand
{
    async run({
        args,
        attachments,
        bot,
        channel,
        helpers: {
            allBotCommandNames,
            allBotCommandAbbreviations,
            botHasCommand,
            botGetCommand,
        },
        prefix,
        message,
        reactions,
        server,
        user,
    })
	{
		MetaInfoController.get()
		.then(function (info)
		{
			if (info.inviteLink)
			{
				const inviteMessage = `You can invite me to your server here:
					${info.inviteLink}
					`.split("\t").join("");	// Remove tabs.
	
				message.channel.send(inviteMessage);
			}

			else
			{
				message.channel.send("My creator has not set up an invite link.");
			}
		});
	}



    /*
     * Help documentation
     */

    get description()
    {
        return "Get a link that lets you invite me to a server.";
    }
}



module.exports = new Invite();
