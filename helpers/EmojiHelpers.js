const DiscordApi = require("../commands/miscellaneous/discordApi");

class EmojiHelpers
{
	static getEmojiExtension(parsedEmoji)
	{
		let extension = ".png";
		
		if (parsedEmoji.animated)
		{
			extension = ".gif";
		}
		
		return extension;
	}
	
	static getEmojiUrl(emojiId, extension)
	{
		return DiscordApi.getEmojiUrl(emojiId, extension);
	}
	
	static async addEmojiToServer(message, emojiUrl, emojiName, callback)
	{
		return new Promise(function (resolve, reject)
		{
			message.guild.emojis
				.create(emojiUrl, emojiName)
				.then(function (emoji)
				{
					if (callback != null)
					{
						callback(emoji);
					}
					
					resolve(emoji);
				})
				.catch(function (err)
				{
					reject(err);
				});
		});
	}
	
	static async sendAsMessage(message, emojiId, emojiName, isAnimated,
							   strBeforeEmoji = "", strAfterEmoji = "")
	{
		return new Promise(function (resolve, reject)
		{
			// Animated emoji
			if (isAnimated)
			{
				message.channel.send(strBeforeEmoji + "<a:" + 
									 emojiName + ":" + emojiId + ">" + 
									 strAfterEmoji)
					.then(function ()
					{
						resolve();
					})
					.catch(function (err)
					{
						reject(err);
					});
			}
			
			// Static emoji
			else
			{
				message.channel.send(strBeforeEmoji + "<:" + 
									 emojiName + ":" + emojiId + ">" + 
									 strAfterEmoji)
					.then(function ()
					{
						resolve();
					})
					.catch(function (err)
					{
						reject(err);
					});
			}
		});
	}
}



module.exports = EmojiHelpers;
