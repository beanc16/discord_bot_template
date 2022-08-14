const BaseCommand = require("./miscellaneous/BaseCommand");
const {
    permissionsEnum,
    ServerPrefixesController,
    Text,
} = require("@beanc16/discordjs-helpers");
const { logger } = require("@beanc16/logger");



class Prefix extends BaseCommand
{
    async run({
        args,
        prefix: currentPrefix,
        message,
    })
    {
        const newPrefix = args.join(" ");

        // A new prefix WAS set
        if (newPrefix !== "")
        {
            ServerPrefixesController.setPrefix(message, newPrefix)
            .then(function ()
            {
                message.channel.send(`The prefix has been changed from ${Text.Code.oneLine(currentPrefix)} to ${Text.Code.oneLine(newPrefix)}`);
            })
            .catch(function (err)
            {
                logger.error("Failed to set prefix", err);
                message.channel.send(`Failed to update prefix. It will stay as ${Text.Code.oneLine(currentPrefix)}`);
            });
        }

        // A new prefix WAS NOT set
        else
        {
            message.channel.send(`No new prefix was detected. The prefix will stay as ${Text.Code.oneLine(currentPrefix)}`);
        }
    }



    get requiredPermissions()
    {
        return [
            permissionsEnum.MANAGE_GUILD,
        ];
    }



    /*
     * Help documentation
     */

    get description()
    {
        return "Changes the prefix that must be typed before a command.";
    }

    get examples()
    {
        return [
            `${this.commandName} !`,
        ];
    }
}



module.exports = new Prefix();
