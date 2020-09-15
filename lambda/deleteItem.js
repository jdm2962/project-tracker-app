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
		}

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

let proj = 
{
	project : "New Project",
	userId : "1"
};

// deleteItem(proj)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err))





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