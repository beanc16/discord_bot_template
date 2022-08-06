const { DiscordBotSettingsMicroservice } = require("@beanc16/microservices-abstraction");
const {
    appId,
    defaultPrefix,
} = require("../../src/botSettings.json");
const serverPrefixesCache = {};



async function getPrefix(message)
{
    return new Promise(function (resolve, reject)
    {
        const serverId = (message.channel.type === "dm")
            ? message.channel.id    // Use channel ID for DMs
            : message.guild.id;     // Use server ID for non-DMs
        _tryResolvePrefixFromCache(resolve, serverId);
    
        // The prefix is not cached, so go get it.
        DiscordBotSettingsMicroservice.v1.get({
            appId,
            serverId,
        })
        .then(function (response)
        {
            const [{ prefix }] = response.data.data.servers;
            _resolvePrefix(resolve, serverId, prefix);
        })
        .catch(function (err)
        {
            if (err.response && err.response.status && err.response.status === 404)
            {
                _handle404(resolve, reject, err, serverId);
            }

            else
            {
                reject(err);
            }
        });
    });
}



/*
 * Helpers
 */

function _tryResolvePrefixFromCache(resolve, serverId)
{
    // The prefix is cached.
    if (serverPrefixesCache[serverId])
    {
        resolve(serverPrefixesCache[serverId]);
    }
}

function _resolvePrefix(resolve, serverId, prefix)
{
    // Save to cache for faster access.
    serverPrefixesCache[serverId] = prefix;

    resolve(prefix);
}

function _handle404(resolve, reject, err, serverId)
{
    const { data } = err.response;

    // App DOES NOT exist.
    if (data.message && data.message.toLowerCase().includes("no apps were found"))
    {
        // TODO: Handle app not existing.
        reject("Not yet handling an app not existing");
    }

    // App & Bot DO exist, but the current server DOES NOT.
    else if (data.message && data.message.toLowerCase().includes("does not contain a server"))
    {
        DiscordBotSettingsMicroservice.v1.upsertBotPrefix({
            appId,
            serverId,
            serverPrefix: defaultPrefix,
        })
        .then(function (response)
        {
            _resolvePrefix(resolve, serverId, defaultPrefix);
        })
        .catch(function (err2)
        {
            reject(err2);
        })
    }

    // Unknown error occurred.
    else
    {
        // TODO: Handle unknown error.
    }
}



module.exports = {
    getPrefix,
};