const aws = require("aws-sdk");
aws.config.update({region : "us-east-1"});

const dynamoDb = new aws.DynamoDB();


/* 
	primary key:
		partition - project : ""
		sort - userId : uuid
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
				AttributeName : "project",
				AttributeType : "S"
			},	
			{
				AttributeName : "userId",
				AttributeType : "S"
			}
		],

		KeySchema : 
		[
			{
				AttributeName : "project",
				KeyType : "HASH"
			},
			{
				AttributeName : "userId",
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