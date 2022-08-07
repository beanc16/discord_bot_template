const { DiscordBotSettingsMicroservice } = require("@beanc16/microservices-abstraction");
let metaInfoCache = {};



class MetaInfoManager
{
    static async get()
    {
        return new Promise(function (resolve, reject)
        {
            _tryResolveMetaInfoFromCache(resolve);
        
            // Meta info is not cached, so go get it.
            DiscordBotSettingsMicroservice.v1.get({
                appId: process.env.APP_ID
            })
            .then(function (response)
            {
                _resolveMetaInfo(resolve, response.data.data.data);
            })
            .catch(function (err)
            {
                if (err.response && err.response.status && err.response.status === 404)
                {
                    _handle404(resolve, reject, err);
                }
    
                else
                {
                    reject(err);
                }
            });
        });
    }

    static async upsert(metaInfo)
    {
        return new Promise(function (resolve, reject)
        {
            DiscordBotSettingsMicroservice.v1.upsertBotData({
                appId: process.env.APP_ID,
                data: metaInfo,
            })
            .then(function (response)
            {
                const newMetaInfo = response.data.data.results.new.data;
                _resolveMetaInfo(resolve, newMetaInfo);
            })
            .catch(function (err)
            {
                reject(err);
            });
        });
    }
}



/*
 * Helpers
 */

function _tryResolveMetaInfoFromCache(resolve)
{
    // The prefix is cached.
    if (metaInfoCache && Object.keys(metaInfoCache).length > 0)
    {
        resolve(metaInfoCache);
    }
}

function _resolveMetaInfo(resolve, data)
{
    // Save to cache for faster access.
    metaInfoCache = {
        ...metaInfoCache,
        ...data,
    };

    resolve(metaInfoCache);
}

function _handle404(resolve, reject, err)
{
    const { data } = err.response;

    // App DOES NOT exist.
    if (data.message && data.message.toLowerCase().includes("no apps were found"))
    {
        // TODO: Handle app not existing.
        reject("Not yet handling an app not existing");
    }

    // Unknown error occurred.
    else
    {
        // TODO: Handle unknown error.
        reject("Not yet handling an unknown error");
    }
}



module.exports = MetaInfoManager;
