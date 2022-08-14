const BaseCommand = require("./miscellaneous/BaseCommand");



class Ping extends BaseCommand
{
    async run({
        message,
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
