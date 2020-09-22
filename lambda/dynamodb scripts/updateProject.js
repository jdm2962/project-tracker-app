const aws = require("aws-sdk");
aws.config.update({region : "us-east-1"});

const dynamoDb = new aws.DynamoDB(); 
const converter = aws.DynamoDB.Converter;



function putItem(project)
{
	let entryItem = {};

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

const deleteItem = (project) =>
{
	const params = 
	{
		TableName : "Projects",
		Key : 
		{
			"userId" : {S : project.userId},
			"project" : {S : project.project}
		},
        ReturnValues : "ALL_OLD"
	};

	return new Promise((resolve, reject) =>
	{
		dynamoDb.deleteItem(params, (err, data) =>
		{
			if(err) reject(err);
			else resolve(data);
		});
	});
};





exports.handler = async (event) => {
    
    // expect an array of two objects: new and old
    let projects = JSON.parse(event.body);
    let oldProject = projects[0];
    let newProject = projects[1];
    let result;
    let statusCode;
    let data;
    
    try
    {
        // delete old
        result = await deleteItem(oldProject);
        if(result === oldProject)
        {
            try
            {
                result = await putItem(newProject);
                data = "Success. Project updated";
                statusCode = 200;
            }
            catch(err)
            {
                data = "Error entering project...";
                statusCode = 500;
            }
        }
        else
        {
            data = "There was an error deleting your project";
            statusCode = 500;
        }
        
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
