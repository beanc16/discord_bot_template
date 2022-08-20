const description = {
	message: `Enter the command's description.
			(Displayed when a user runs the help command on this command.)
		
		Example:
		Changes the prefix that must be typed before a command.
		
		Help Description*`
		.split("\t").join(""),       					// Remove tabs.
	required: true,
};



module.exports = description;
