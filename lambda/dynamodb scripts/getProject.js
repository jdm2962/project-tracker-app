const aws = require("aws-sdk");
aws.config.update({region : "us-east-1"});

const dynamoDb = new aws.DynamoDB(); 
const converter = aws.DynamoDB.Converter;



function getProject(userId, project)
{
	const params = 
	{
		TableName : "Projects",
		Key :
		{
			"userId" : {S : userId},
			"project" : {S : project}
		}
	};

	return new Promise((resolve, reject) =>
	{
		dynamoDb.getItem(params, (err, data) =>
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
	let project = event.pathParameters.project;
	let dbProject;

	try
	{
		let result = await getProject(userId, project);
		dbProject = await result.Item;

		if(dbProject && dbProject.length !== 0)
		{
			for(const [key, value] of Object.entries(dbProject))
			{
				dbProject[key] = converter.output(value);
			}
			data = dbProject;
			statusCode = 200;
		}
		else
		{
			data = "Error fetching your project...";
			statusCode : 500;
		}
		
	}
	catch(err)
	{
		console.log(err);
		data = "Server Error... Contact Support" + err;
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
	        body: JSON.stringify(data),
	    };
	    return response;
};


