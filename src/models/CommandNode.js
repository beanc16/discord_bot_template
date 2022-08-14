class CommandNode
{
    constructor(command)
    {
        this.command = command;
    }

    get abbreviations()
    {
        // TODO: Deprecate commandAbbreviations when fully off of v1.
        return this.command.commandAbbreviations || this.command.abbreviations;
    }
}



module.exports = CommandNode;
