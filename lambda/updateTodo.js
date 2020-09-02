const db = require("/opt/nodejs/db-helpers");
const moment = require("moment");


exports.handler = async (event) => {
    
	let statusCode;
	let data;
	let queryParams = event.queryStringParameters;

	let todoId = queryParams.todoId ? queryParams.todoId : undefined;
	let todo = queryParams.todo ? queryParams.todo : undefined;
	let isDone = queryParams.isDone ? queryParams.isDone : undefined;
	let dateCreated;
	
	let text;
	let values;
	
	let pool = await db.pool;

	if(!queryParams.todoId)
	{
		statusCode = 400;
		data = "Please supply the todoId";
	}
	else if(todo === undefined && isDone === undefined)
	{
		statusCode = 400;
		data = "At least one parameter is required: todo, isDone";
	}
	else
	{
	    dateCreated = moment().format("YYYY-MM-DD hh:mm:ss");
	    
		if(todo && isDone === undefined)
		{
			text = `UPDATE Todos
					SET todo = $1,
						dateCreated = $3
					WHERE todoId = $2
					RETURNING *`;
			values = [todo, todoId, dateCreated];
		}
		else if(isDone !== undefined && !todo)
		{
			text = `UPDATE Todos
					SET isDone = $1,
						dateCreated = $3
					WHERE todoId = $2
					RETURNING *`;
			values = [isDone, todoId, dateCreated];
		}
		else if(todo && isDone !== undefined)
		{
			text = `UPDATE Todos
					SET todo = $1,
						isDone = $2,
						dateCreated = $4
					WHERE todoId = $3
					RETURNING *`;
			values = [todo, isDone, todoId, dateCreated];
		}

		try
		{
			let result = await pool.query(text, values);
			data = result.rows;
			statusCode = 200;
		}
		catch(err)
		{
			console.log(err);
			statusCode = 500;
			data = "Server error ... Contact Support";
		}
	}



    const response = {
        statusCode: statusCode,
        body: JSON.stringify(data),
    };
    return response;
};