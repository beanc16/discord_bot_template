const { permissionsEnum } = require("@beanc16/discordjs-helpers");



const permissions = {
	message: `Enter the numbers below that correspond to the permissions required to use the command as a comma separated list.
		(If no permissions are required, don't enter anything.)
		
		${permissionsEnum.getAsString()}
		
		Example:
		0, 8, 22, 5
		
		Command Permissions`
		.split("\t").join(""),       					// Remove tabs.
	required: false,
};



module.exports = permissions;
