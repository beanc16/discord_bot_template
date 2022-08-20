// Non-Booleans
const author = require("./author");
const botName = require("./botName");
const creationPurpose = require("./creationPurpose");
const defaultPrefix = require("./defaultPrefix");
const description = require("./description");
const donationLink = require("./donationLink");
const homeServerInvite = require("./homeServerInvite");
const inviteLink = require("./inviteLink");

// Booleans
const allowCommandsInDms = require("./allowCommandsInDms");
const allowCommandsInServers = require("./allowCommandsInServers");
const botPrefixIsCaseSensitive = require("./botPrefixIsCaseSensitive");



module.exports = {
    // Export in the order that the user should be prompted
    botName,
    author,
    description,
    defaultPrefix,
    creationPurpose,
    homeServerInvite,
    inviteLink,
    donationLink,
    botPrefixIsCaseSensitive,
    allowCommandsInDms,
    allowCommandsInServers,
};
