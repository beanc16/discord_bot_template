// Library & Custom Variable
const BaseCommand = require("./miscellaneous/BaseCommand");
const { permissionsEnum } = require("@beanc16/discordjs-helpers");



class Say extends BaseCommand
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
		// The user DID include a message
		if (args.length > 0)
		{
			const msg = args.join(" ");
			message.channel.send(msg);
		}

		// The user DID NOT include a message
		else
		{
			message.channel.send("No message to say detected.");
		}
	}



    get abbreviations()
    {
        return [
            `${this.commandName}`,
			"repeat",
        ];
    }



    /*
     * Help documentation
     */

    get description()
    {
        return `Make me repeat what you say.`;
    }

	get examples()
	{
		return [
			`${this.commandName} Hi!`,
		];
	}
}



module.exports = new Say();
