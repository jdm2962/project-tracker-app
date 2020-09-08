// const { db } = require("/opt/nodejs/db-helpers");
const { db } = require("./layers/db-dependencies/nodejs/db-helpers");


exports.handler = async (event, context) => {
    
    const todos = JSON.parse(event.body);
    let statusCode;
    let data;

    const pdb = await db;

    //clear todos
    try
    {
        await pdb.task(t =>
        {
            return t.none('DELETE FROM Todos');
        });
    }
    catch(err)
    {
        console.log(err);
        statusCode = 500;
        data = "Server Error... Contact support";
        const response = 
	    {
	    	headers : 
			{
				"Access-Control-Allow-Headers" : "Content-Type",
	            "Access-Control-Allow-Origin": "*",
	            "Access-Control-Allow-Methods": "*"
			},
	        statusCode: 200,
	        body: JSON.stringify(data),
	    };
	    return response;
    }

    try
    {
        await pdb.task(t =>
    	{
    		const queries = todos.map(data =>
    		{
    			return t.none('INSERT INTO Todos(todoId, todo, isDone, dateCreated) VALUES(${todoid}, ${todo}, ${isdone}, ${datecreated})', data);
    		});
    		return t.batch(queries);
    	});
    	data = "Success"
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
    	headers : 
		{
			"Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
		},
        statusCode: 200,
        body: JSON.stringify(data),
    };
    return response;






