const author = {
	description: `Enter the name of the bot's author.
				(Displayed when a user runs the about command.)
		
		Author/Team Name*`
		.split("\t").join(""),       					// Remove tabs.
	message: "Author/Team Name is required.",
	required: true
};



module.exports = author;
