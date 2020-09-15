const aws = require("aws-sdk");
aws.config.update({region : "us-east-1"});

const dynamoDb = new aws.DynamoDB(); 
const converter = aws.DynamoDB.Converter;



function getProjects(userId)
{
	const params = 
	{
		TableName : "Projects",
		ExpressionAttributeValues :
		{
			":uId" : {S : userId}
		},
		KeyConditionExpression : "userId = :uId", 
		ProjectionExpression : "userId, project"
	};

	return new Promise((resolve, reject) =>
	{
		dynamoDb.query(params, (err, data) =>
		{
			if(err) reject(err);
			else resolve(data);
		});
	});
}



exports.handler = async (event) => 
{

	let statusCode;
	let data;
	let userId = event.pathParameters.userId;
	let projects = [];

	try
	{
		let result = await getProjects(userId);
		let dbProjects = await result.Items;

		dbProjects.forEach(project =>
		{
			let currentProject = {};
			for(const [key, value] of Object.entries(project))
			{
				currentProject[key] = converter.output(value);
			}
			projects.push(currentProject);

		});

		data = projects;
		statusCode = 200;
	}
	catch(err)
	{
		console.log(err);
		data = err;
		statusCode = 500;
		
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
        body: JSON.stringify(data)
    };
    
    return response;
};


