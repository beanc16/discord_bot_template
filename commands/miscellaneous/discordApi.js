const baseUrl = "https://cdn.discordapp.com";


class DiscordApi
{
	static getEmojiUrl(emojiId, extension)
	{
		return baseUrl + "/emojis/" + emojiId + extension;
	}
}



module.exports = DiscordApi;
