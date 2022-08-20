const name = {
	message: `Enter the command's name.
			(The name of the file & what users will type to run the command, excluding the prefix.)
		
		Example:
		prefix
		
		Command Name*`
		.split("\t").join(""),       					// Remove tabs.
	required: true,
};



module.exports = name;
