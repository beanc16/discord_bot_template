const abbreviations = require("./abbreviations");
const description = require("./description");
const examples = require("./examples");
const name = require("./name");
const permissions = require("./permissions");



module.exports = {
    // Export in the order that the user should be prompted
    name,
    description,
    abbreviations,
    examples,
    permissions,
};
