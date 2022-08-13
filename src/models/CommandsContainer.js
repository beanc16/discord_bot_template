const CommandNode = require("./CommandNode");



class CommandsContainer
{
    constructor()
    {
        this._commands = {};
        this._abbreviations = [];
    }

    get commands()
    {
        return this._commands;
    }

    get abbreviations()
    {
        if (this._abbreviations.length === 0)
        {
            this._abbreviations = Object.values(this._commands).reduce(function (acc, commandNode)
            {
                if (!!commandNode.abbreviations)
                {
                    acc.push(...commandNode.abbreviations);
                }

                return acc;
            }, []);
        }

        return this._abbreviations;
    }



    getCommand(commandName)
    {
        if (!this._commands[commandName])
        {
            throw new Error(`Unknown command: ${commandName}`);
        }

        return this._commands[commandName];
    }

    addCommand({
        commandName,
        abbreviations,
        data,
    })
    {
        if (!commandName)
        {
            throw new Error(`Invalid commandName in addCommand: ${commandName}`);
        }
        
        this._commands[commandName] = new CommandNode({
            data,
            abbreviations,
        });
    }

    hasCommand(commandName)
    {
        return (!!this._commands[commandName]);
    }
}



module.exports = CommandsContainer;
