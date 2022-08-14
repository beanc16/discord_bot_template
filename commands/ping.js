// Library & Custom Variable
const BaseCommand = require("./miscellaneous/BaseCommand");
const { permissionsEnum } = require("@beanc16/discordjs-helpers");



class Ping extends BaseCommand
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
        const latency = Date.now() - message.createdTimestamp;
        const pongMsg = `🏓 Latency is ${latency}ms 🏓`;
        message.channel.send(pongMsg);
    }



    /*
     * Help documentation
     */

    get description()
    {
        return `Get the bot's response time in milliseconds.`;
    }
}



module.exports = new Ping();
