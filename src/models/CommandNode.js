class CommandNode
{
    constructor(command)
    {
        this.command = command;
    }

    get abbreviations()
    {
        return this.command.commandAbbreviations;
    }
}



module.exports = CommandNode;
