const botName = {
	description: `Enter the bot's name.
				(Displayed when a user runs the about command.)
		
		Bot Name*`
		.split("\t").join(""),       					// Remove tabs.
	message: "Bot Name is required.",
	required: true,
};



module.exports = botName;
