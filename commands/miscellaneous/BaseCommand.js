const path = require("path");



class BaseCommand
{
    async run({
        args,
        attachments,
        bot,
        channel,
        helpers: {
            allBotCommandNames,
            allBotCommandAbbreviations,
            botHasAbbreviation,
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
        throw new Error(`${this.commandName} has not yet been implemented!`);
    }



    get abbreviations()
    {
        return [
            `${this.commandName}`
        ];
    }

    get requiredPermissions()
    {
        return [];
    }



    /*
     * Help documentation
     */

    get commandName()
    {
        return this.constructor.name.toLowerCase();
    }

    get description()
    {
        return `${this.commandName}'s description has not yet been implemented`;
    }

    get examples()
    {
        return [
            `${this.commandName}`
        ];
    }

    _getCommandName(fileName)
    {
        // File name with extension
        const fileNameWithExtension = path.basename(fileName);
        const extensionIndex = fileNameWithExtension.indexOf(".js");

        // File name without extension
        return fileNameWithExtension.substring(0, extensionIndex);
    }
}



module.exports = BaseCommand;
