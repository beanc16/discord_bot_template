const description = {
	description: `Enter the description for the bot's package.json.
		
		Package Description*`
		.split("\t").join(""),       					// Remove tabs.
	message: "Package Description is required.",
	required: true,
};



module.exports = description;
