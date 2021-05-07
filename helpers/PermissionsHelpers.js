class PermissionsHelpers
{
	static msgSenderHasAllPerms(command, message)
	{
		let hasAllPerms = true;
		let missingPerms = [];
		
		for (let i = 0; i < command.requiredPerms.length; i++)
		{
			const permResults = 
				PermissionsHelpers.msgSenderHasPermission(
					command, message, command.requiredPerms[i]
				);
			
			if (!permResults.hasPerm)
			{
				hasAllPerms = false;
				missingPerms.push(permResults.missingPerm);
			}
		}
		
		return {
			"hasAllPerms": hasAllPerms,
			"missingPerms": missingPerms,
		};
	}
	
	static msgSenderHasPermission(command, message, curReqPerm)
	{
		const msgSender = message.member;
		let curPermStr = curReqPerm.value;
		
		// User doesn't have a permission
		let hasPerm = true;
		let missingPerm = null;
		if (!msgSender.hasPermission(curPermStr))
		{
			hasPerm = false;
			missingPerm = curReqPerm.display;
		}
		
		return {
			"hasPerm": hasPerm,
			"missingPerm": missingPerm,
		};
	}
}



module.exports = PermissionsHelpers;
