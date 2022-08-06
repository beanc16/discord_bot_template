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
        const serverId = message.guild.id;
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
            if (err.statusCode && err.statusCode === 404)
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
    // App DOES NOT exist.
    if (err.message && err.message.toLowerCase().includes("no apps were found"))
    {
        // TODO: Handle app not existing.
        reject("Not yet handling an app not existing");
    }

    // App & Bot DO exist, but the current server DOES NOT.
    else if (err.message && err.message.toLowerCase().includes("does not contain a server"))
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
        .catch(function (err)
        {
            reject(err);
        })
    }
}



module.exports = {
    getPrefix,
};