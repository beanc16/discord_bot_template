const fs = require("fs");
const path = require("path");
const appRootPath = require("app-root-path");
const CommandNode = require("./CommandNode");



class CommandsContainer
{
    static _commands = {};
    static _abbreviations = [];

    static get commandNames()
    {
        return Object.keys(CommandsContainer._commands);
    }

    static get abbreviations()
    {
        if (CommandsContainer._abbreviations.length === 0)
        {
            CommandsContainer._abbreviations = Object.values(CommandsContainer._commands).reduce(function (acc, commandNode)
            {
                if (!!commandNode.abbreviations)
                {
                    acc.push(...commandNode.abbreviations);
                }

                return acc;
            }, []);
        }

        return CommandsContainer._abbreviations;
    }



    static _initialize()
    {
        const commandsDirPath = appRootPath.resolve("./commands");

        // Get all files and directories in the commands folder.
        const files = fs.readdirSync(commandsDirPath);

        // Initialize each command.
        files.forEach((fileName) =>
        {
            // Is a command file
            if (path.extname(fileName).toLowerCase() === ".js")
            {
                const extensionIndex = fileName.indexOf(".js");
                const commandName = fileName.substring(0, extensionIndex);

                const commandPath = path.join(commandsDirPath, commandName);
                const command = require(commandPath);

                CommandsContainer.addCommand({
                    commandName,
                    command,
                })
            }
        });
    }

    static getCommand(commandName)
    {
        if (!CommandsContainer._commands[commandName])
        {
            return CommandsContainer.getCommandFromAbbreviation(commandName);
        }

        return CommandsContainer._commands[commandName].command;
    }

    static getCommandFromAbbreviation(commandName)
    {
        for (const commandNode of Object.values(CommandsContainer._commands))
        {
            if (commandNode.abbreviations.includes(commandName))
            {
                return commandNode.command;
            }
        };

        throw new Error(`Unknown command: ${commandName}`);
    }

    static addCommand({
        commandName,
        command,
    })
    {
        if (!commandName)
        {
            throw new Error(`Invalid commandName in addCommand: ${commandName}`);
        }
        
        CommandsContainer._commands[commandName] = new CommandNode(command);
    }

    static hasCommand(commandName)
    {
        return (!!CommandsContainer._commands[commandName]);
    }

    static hasAbbreviation(commandName)
    {
        return CommandsContainer._abbreviations.includes(commandName);
    }
}

CommandsContainer._initialize();



module.exports = CommandsContainer;
