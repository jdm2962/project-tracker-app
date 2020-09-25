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


const sortByDate = (arr) =>
{
	if(arr.length > 1)
	{
		let sorted = arr.sort((firstVal, nextVal) =>
		{
			let currentDate = new Date(firstVal.dateCreated);
			let nextDate = new Date(nextVal.dateCreated);

			if(currentDate > nextDate) 
			{
				return -1;
			}
			else if(currentDate < nextDate)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		});

		return sorted;
	}
	else
	{
		return arr;
	}
};


exports.formatSpaces = formatSpaces;
exports.convertToSpaces = convertToSpaces;
exports.sortByDate = sortByDate;