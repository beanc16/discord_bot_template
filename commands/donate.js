const BaseCommand = require("./miscellaneous/BaseCommand");
const { MetaInfoController } = require("@beanc16/discordjs-helpers");



class Donate extends BaseCommand
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
			if (info.donationLink)
			{
				const donationMessage = `You can support my creator by donating here:
					${info.donationLink}
					`.split("\t").join("");	// Remove tabs.

				message.channel.send(donationMessage);
			}

			else
			{
				message.channel.send("My creator has not set up a donation link");
			}
		});
	}



    get abbreviations()
    {
        return [
            `${this.commandName}`,
			"donation",
        ];
    }



    /*
     * Help documentation
     */

    get description()
    {
        return "Display a link that lets you financially support my creator.";
    }
}



module.exports = new Donate();
