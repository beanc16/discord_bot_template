const fs = require("fs");
const path = require("path");
const appRootPath = require("app-root-path");
const { REST, Routes } = require('discord.js');
const { logger } = require("@beanc16/logger");
const { slashCommands: commonSlashCommands } = require("@beanc16/discordjs-common-commands");

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// TODO: Set up command registration to run on a dev-only command: https://discordjs.guide/creating-your-bot/command-deployment.html#global-commands

class SlashCommandsContainer
{
    static _slashCommands = {};

    static _initialize()
    {
        // Initialize common commands
        Object.values(commonSlashCommands).forEach((command) =>
        {
            SlashCommandsContainer.addCommand({
                commandName: command.commandName,
                command,
            });
        });

        // Initialize commands in the /src/commands-slash folder
        const commandsDirPath = appRootPath.resolve("./src/commands-slash");

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

                SlashCommandsContainer.addCommand({
                    commandName,
                    command,
                });
            }
        });
    }



    static getCommand(commandName)
    {
        return SlashCommandsContainer._slashCommands[commandName];
    }

    static getAllCommandsData()
    {
        const slashCommands = Object.values(SlashCommandsContainer._slashCommands);
        return slashCommands.map((slashCommand) => {
            return slashCommand.slashCommandData;
        });
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

        SlashCommandsContainer._slashCommands[commandName] = command;
    }

    static async registerCommands()
    {
        const allCommandsData = SlashCommandsContainer.getAllCommandsData();
        logger.info(`Starting refresh of ${allCommandsData.length} slash (/) commands`);
        const registeredSlashCommandData = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), // Can pass in a guildId as a second parameter to make a slash command available in only that guild (helpful for development)
            { body: allCommandsData },
        );
        logger.info(`Successfully refreshed ${registeredSlashCommandData.length} slash (/) commands`, registeredSlashCommandData);
    }
}
SlashCommandsContainer._initialize();   // TODO: Move this to bot.js and regiserSlashCommands



module.exports = SlashCommandsContainer;
