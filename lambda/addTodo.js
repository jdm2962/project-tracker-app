const db = require("/opt/nodejs/db-helpers");


exports.handler = async (event, context) => {
    
    let statusCode;
    let data;
    let todoId;
    let queryParams = event.queryStringParameters;
    
    let pool = await db.pool;

    // check whether todoId provided
    if(!queryParams.todoId)
    {
    	statusCode = 400;
    	data = "Missing parameter: todoId. Please provide...";
    }
    else
    {
        todoId = queryParams.todoId;
    	try 
    	{
	    	let text = `DELETE FROM Todos
					WHERE todoId = $1
					RETURNING *`;
			let values = [todoId];
			let result = await pool.query(text, values);
	    	data = result.rows;
	    	statusCode = 200;
    	}
    	catch(err)
    	{
    		console.log(err);
    		statusCode = 500;
    		data = "Server error... Contact support";
    	}
    }


    const response = {
        statusCode: statusCode,
        body: JSON.stringify(data),
    };
    return response;
};


