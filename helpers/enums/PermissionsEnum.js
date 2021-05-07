const permissionsEnum = {
	ADMINISTRATOR: {
		value: "ADMINISTRATOR",
		display: "Administrator",
		index: 0,
	},
	CREATE_INSTANT_INVITE: {
		value: "CREATE_INSTANT_INVITE",
		display: "Create Instant Invite",
		index: 1,
	},
	KICK_MEMBERS: {
		value: "KICK_MEMBERS",
		display: "Kick Members",
		index: 2,
	},
	BAN_MEMBERS: {
		value: "BAN_MEMBERS",
		display: "Ban Members",
		index: 3,
	},
	MANAGE_CHANNELS: {
		value: "MANAGE_CHANNELS",
		display: "Manage Channels",
		index: 4,
	},
	MANAGE_GUILD: {
		value: "MANAGE_GUILD",
		display: "Manage Guild",
		index: 5,
	},
	ADD_REACTIONS: {
		value: "ADD_REACTIONS",
		display: "Add Reactions",
		index: 6,
	},
	VIEW_AUDIT_LOG: {
		value: "VIEW_AUDIT_LOG",
		display: "View Audit Log",
		index: 7,
	},
	PRIORITY_SPEAKER: {
		value: "PRIORITY_SPEAKER",
		display: "Priority Speaker",
		index: 8,
	},
	STREAM: {
		value: "STREAM",
		display: "Stream",
		index: 9,
	},
	VIEW_CHANNEL: {
		value: "VIEW_CHANNEL",
		display: "View Channel",
		index: 10,
	},
	SEND_MESSAGES: {
		value: "SEND_MESSAGES",
		display: "Send Messages",
		index: 11,
	},
	SEND_TTS_MESSAGES: {
		value: "SEND_TTS_MESSAGES",
		display: "Send TTS (text-to-speech) Messages",
		index: 12,
	},
	MANAGE_MESSAGES: {
		value: "MANAGE_MESSAGES",
		display: "Manage Messages",
		index: 13,
	},
	EMBED_LINKS: {
		value: "EMBED_LINKS",
		display: "Embed Links",
		index: 14,
	},
	ATTACH_FILES: {
		value: "ATTACH_FILES",
		display: "Attach Files",
		index: 15,
	},
	READ_MESSAGE_HISTORY: {
		value: "READ_MESSAGE_HISTORY",
		display: "Read Message History",
		index: 16,
	},
	MENTION_EVERYONE: {
		value: "MENTION_EVERYONE",
		display: "Mention Everyone",
		index: 17,
	},
	USE_EXTERNAL_EMOJIS: {
		value: "USE_EXTERNAL_EMOJIS",
		display: "Use External Emojis",
		index: 18,
	},
	VIEW_GUILD_INSIGHTS: {
		value: "VIEW_GUILD_INSIGHTS",
		display: "View Guild Insights",
		index: 19,
	},
	CONNECT: {
		value: "CONNECT",
		display: "Connect to Voice Channel",
		index: 20,
	},
	SPEAK: {
		value: "SPEAK",
		display: "Speak in Voice Channel",
		index: 21,
	},
	MUTE_MEMBERS: {
		value: "MUTE_MEMBERS",
		display: "Mute Members in Voice Channel",
		index: 22,
	},
	DEAFEN_MEMBERS: {
		value: "DEAFEN_MEMBERS",
		display: "Deafen Members in Voice Channel",
		index: 23,
	},
	MOVE_MEMBERS: {
		value: "MOVE_MEMBERS",
		display: "Move Members in Voice Channel",
		index: 24,
	},
	USE_VAD: {
		value: "USE_VAD",
		display: "Use VAD in Voice Channel",
		index: 25,
	},
	CHANGE_NICKNAME: {
		value: "CHANGE_NICKNAME",
		display: "Change Nickname",
		index: 26,
	},
	MANAGE_NICKNAMES: {
		value: "MANAGE_NICKNAMES",
		display: "Manage Nicknames",
		index: 27,
	},
	MANAGE_ROLES: {
		value: "MANAGE_ROLES",
		display: "Manage Roles",
		index: 28,
	},
	MANAGE_WEBHOOKS: {
		value: "MANAGE_WEBHOOKS",
		display: "Manage Webhooks",
		index: 29,
	},
	MANAGE_EMOJIS: {
		value: "MANAGE_EMOJIS",
		display: "Manage Emojis",
		index: 30,
	},
	
	getAsString: () => getAsString(),
	convertFromIndexArray: (indexArray) => convertFromIndexArray(indexArray),
};

function getAsString()
{
	let outputStr = "";
	let i = 0;
	for (let key in permissionsEnum)
	{
		let obj = permissionsEnum[key];
		
		if (key != "getAsString" && key != "convertFromIndexArray")
		{
			if (i > 0)
			{
				outputStr += ",\n";
			}
			
			outputStr += i + ": " + obj.display;
			i++;
		}
	}
	
	return outputStr;
}

function convertFromIndexArray(indexArray)
{
	// Convert array to numbers
	indexArray = indexArray.map(element => parseInt(element));
	
	// Order array of integers in ascending order
	indexArray.sort(function(a, b) {
		return a - b;
	});
	
	let outputArray = [];
	const keys = Object.keys(permissionsEnum);
	
	for (let i = 0; i < indexArray.length; i++)
	{
		// Get the key to reference from permissionsEnum
		let keyIndex = parseInt(indexArray[i]);
		let key = keys[keyIndex];
		
		// Add the permission to the output
		outputArray.push("PermissionsEnum." + key);
	}
	
	// Output the array with spaces after each comma
	return outputArray.join(", ").toString();
}



Object.freeze(permissionsEnum);

module.exports = permissionsEnum;
