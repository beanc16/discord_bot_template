const BaseCommand = require("./miscellaneous/BaseCommand");
const { permissionsEnum } = require("@beanc16/discordjs-helpers");
// TODO: ^ Remove permissionsEnum from all commands not using it.



class Ping extends BaseCommand
{
    async run({
        // TODO: Remove unused parameters here and in other commands.
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
        return `Get my response time in milliseconds.`;
    }
}



module.exports = new Ping();
