class CommandNode
{
    constructor(command)
    {
        this.command = command;
    }

    get abbreviations()
    {
        return this.command.abbreviations;
    }
}



module.exports = CommandNode;
