const creationPurpose = {
	description: `Enter the reason why the bot is being made.
				(Displayed when a user runs the about command.)
		
		Creation Purpose`
		.split("\t").join(""),       					// Remove tabs.
	required: false,
};



module.exports = creationPurpose;
