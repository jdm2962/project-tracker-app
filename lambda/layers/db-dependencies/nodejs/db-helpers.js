const { Pool } = require("pg");

const aws = require("aws-sdk");
// update config:region
aws.config.update({region : "us-east-1"});
const ssm = new aws.SSM();



// query ssm for db info
function getDbCredentials()
{
	const params =
	{
		Names :
		[
			"todo-db-username",
			"todo-db-password",
			"todo-db-name",
			"todo-host"
		]
	}

	return new Promise((resolve, reject) =>
	{
		ssm.getParameters(params, (err, data) =>
		{
			if(err) reject(err);
			else 
			{
				let returnCredentials = {};
				let dbData = data["Parameters"];

				returnCredentials.database = dbData[0].Value;
				returnCredentials.password = dbData[1].Value;
				returnCredentials.user = dbData[2].Value;
				returnCredentials.host = dbData[3].Value;
				returnCredentials.port = 5432;

				resolve(returnCredentials);
			}
		});
	});
}


let credentials = 
(async () => {
	let result = await getDbCredentials();	
	return result;
})();

let pool = 
(async () => {
	let pool = new Pool(await credentials);
	return pool;
})();


exports.pool = pool;