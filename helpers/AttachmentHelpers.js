class AttachmentHelpers
{
	static isLessThanEmojiMaxFileSize(attachment)
	{
		return (attachment[1].size <= 256000);
	}
	
	static isBiggerThanEmojiMaxFileSize(attachment)
	{
		return (attachment[1].size > 256000);
	}
	
	static isImage(attachment)
	{
		const fileName = attachment[1].name;
		return (fileName.includes("png") ||
				fileName.includes("jpg") ||
				fileName.includes("jpeg") ||
				fileName.includes("gif"));
	}
	
	static getNameWithoutExtension(attachment)
	{
		const curFileName = attachment[1].name;
		return curFileName.replace(/\.[^/.]+$/, "");
	}
}



module.exports = AttachmentHelpers;
