const aws = require("aws-sdk");
aws.config.update({region : "us-east-1"});

const dynamoDb = new aws.DynamoDB(); 
const converter = aws.DynamoDB.Converter;



function putItem(project)
{
	let entryItem = {}

	// populate item with formatted values
	for(const [key, value] of Object.entries(project))
	{
		entryItem[key] = converter.input(value);
	}


	const params = 
	{
		Item : entryItem,
		TableName : "Projects",
		ReturnConsumedCapacity : "TOTAL"
	};

	return new Promise((resolve, reject) =>
	{
		dynamoDb.putItem(params, (err, data) =>
		{
			if(err) reject(err);
			else resolve(data);
		});
	});
}

exports.handler = async (event) => {
    
    let project = JSON.parse(event.body);
    let result;
    let statusCode;
    let data;
    
    try
    {
        result = await putItem(project);
        data = "Success";
        statusCode = 200;
        
    }
    catch(err)
    {
        console.log(err);
        statusCode = 500;
        data = "Server Error... Contact support";
    }
    
    
    
    
    const response =
    {
        statusCode: statusCode,
        	headers : 
		{
			"Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
		},
        body: JSON.stringify(data),
    };
    return response;
};
