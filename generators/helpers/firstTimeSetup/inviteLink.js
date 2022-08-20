const inviteLink = {
	description: `Enter the a link for users to invite the bot to their server.
				(Displayed when a user runs the invite command.)
		
		Invite Link`
		.split("\t").join(""),       					// Remove tabs.
	required: false,
};



module.exports = inviteLink;
