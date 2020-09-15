const formatSpaces = (str) =>
{
	// check for spaces in project name
	let modifiedValue = str.trim();
	// check for excess spaces between words
	const regex = /\s{2,}/g;
	modifiedValue = modifiedValue.replace(regex, " ");
	let wordArr = modifiedValue.split(" ");
	if(wordArr.length > 1)
	{
		// join to be sent to db
	    modifiedValue = wordArr.join("+");
	}
	else 
	{
		return str;
	}

	return modifiedValue;
};


const convertToSpaces = (str) =>
{
	let strArr = str.split("+");
	return strArr.join(" ");
}


exports.formatSpaces = formatSpaces;
exports.convertToSpaces = convertToSpaces;