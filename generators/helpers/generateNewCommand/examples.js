const examples = {
	message: `Enter examples of how a user might call the command as a comma separated list.
			(Don't include any prefix & if the only example is the command name itself, don't enter anything.)
		
		Example:
		prefix !
		
		Help Examples`
		.split("\t").join(""),       					// Remove tabs.
	required: false,
};



module.exports = examples;
