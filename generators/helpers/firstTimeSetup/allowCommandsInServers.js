const parseBoolean = require("./helpers/parseBoolean");



const allowCommandsInServers = {
    description: `Enter whether users should be allowed to run commands in servers (true/false).
        
        Allow Commands in Servers*`
        .split("\t").join(""),      					// Remove tabs.
    message: "Allow Commands in DMs must be a boolean.",
    pattern: /^(true|false)$/i,
    default: "true",
    required: true,
    before: parseBoolean,
};



module.exports = allowCommandsInServers;
