const aws = require("aws-sdk");
aws.config.update({region : "us-east-1"});

const dynamoDb = new aws.DynamoDB(); 

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
    
    let project = JSON.parse(event.body);
    let result;
    let statusCode;
    let data;
    
    try
    {
        result = await deleteItem(project);
        if(result === project)
        {
            data = "Success. Project Deleted";
            statusCode = 200;
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



exports.deleteItem = deleteItem;