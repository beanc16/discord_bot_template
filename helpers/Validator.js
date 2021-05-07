class Validator
{
	static stringIsNumeric(str)
	{
		if (typeof str != "string")
		{
			console.log("not string");
			return false;
		}
		
		return !isNaN(str) && // use type coercion to parse the entirety of the string (`parseFloat` alone does not do this)...
			   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
	}
	
	static isUrl(str)
	{
		const pattern = new RegExp(
			'^(https?:\\/\\/)?' + 								// protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +// domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + 					// OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 				// port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + 						// query string
			'(\\#[-a-z\\d_]*)?$','i' 							// fragment locator
		);
		
		return !!pattern.test(str);
	}
}



module.exports = Validator;
