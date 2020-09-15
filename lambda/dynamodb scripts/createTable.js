const aws = require("aws-sdk");
aws.config.update({region : "us-east-1"});

const dynamoDb = new aws.DynamoDB();


/* 
	primary key:
		partition - userId : uuid
		sort - project : ""
	Other attriutes:
		todos : [ of {}s]
		dateCreated : ""
		projectId : uuid? or auto increment
		projectColor : ""

*/

function createTable()
{
	const params = 
	{
		TableName : "Projects",
		ProvisionedThroughput :
		{
			ReadCapacityUnits : 5,
			WriteCapacityUnits : 5
		},

		AttributeDefinitions :
		[
			{
				AttributeName : "userId",
				AttributeType : "S"
			},
			{
				AttributeName : "project",
				AttributeType : "S"
			}	
		],

		KeySchema : 
		[
			{
				AttributeName : "userId",
				KeyType : "HASH"
			},
			{
				AttributeName : "project",
				KeyType : "RANGE"
			}
		]
	};

	return new Promise((resolve, reject) => 
	{
		dynamoDb.createTable(params, (err, data) =>
		{
			if(err) reject(err);
			else resolve(data);
		});
	});
}


createTable()
	.then(data => console.log(data))
	.catch(err => console.log(err))