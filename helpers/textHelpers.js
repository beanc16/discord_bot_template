// Export functions (for require statements in other files)
module.exports = {

    getUserPing: function (userId)
    {
        // Return the ping value of the user
        return "<@" + userId + ">";
    },

    getRolePing: function (roleId)
    {
        // Return the ping value of the user
        return "<@&" + roleId + ">";
    },

    getBoldText: function (str)
    {
        return "**" + str + "**";
    },

    getItalicText: function (str)
    {
        return "*" + str + "*";
    },

    getUnderlinedText: function (str)
    {
        return "__" + str + "__";
    },

    getCodeOneLineText: function (str)
    {
        return "`" + str + "`";
    },

    getCodeMultiLineText: function (str)
    {
        return "```" + str + "```";
    }
};
