function parseBoolean(value)
{
	if (value.toLowerCase() === "true" || value.toLowerCase() === "false")
	{
		return JSON.parse(value.toLowerCase());
	}

	return value;
}



module.exports = parseBoolean;
