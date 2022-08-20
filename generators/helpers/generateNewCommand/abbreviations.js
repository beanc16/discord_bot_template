const abbreviations = {
	message: `Enter the command's abbreviations as a comma separated list.
			(If the only abbreviation is the command name itself, don't enter anything.)
		
		Example:
		pref, pre
		
		Command Abbreviations`
		.split("\t").join(""),       					// Remove tabs.
	required: false,
};



module.exports = abbreviations;
