const db = require("/opt/nodejs/db-helpers");
const uuid = require("uuid");
const moment = require("moment");



exports.handler = async function(event, context)
{
    // table : todoId(uuid), todo(string), isDone(bool: 0 or 1+, dateCreated)
    let todoId;
    let dateCreated = "";
    let todo = "";
    let isDone;
    let data;
    let statusCode;
    let pool = await db.pool;
    let queryParams = event.queryStringParameters;
    
    if(!queryParams["isDone"] || !queryParams["todo"])
    {   
        data = "Missing either todo or isDone parameteres.";
        statusCode = 400;
    }
    else
    {
        statusCode = 200;
        data = `todo: ${queryParams["todo"]} isDone: ${queryParams["isDone"]}`;

        todo = queryParams["todo"];
        isDone = queryParams["isDone"] || false;
        dateCreated = moment().format("YYYY-MM-DD hh:mm:ss");
        // todoId = uuid.v4();
        todoId = queryParams["todoId"] || uuid.v4();
        let text = 'INSERT INTO Todos(todoId, todo, isDone, dateCreated) VALUES($1, $2, $3, $4) RETURNING *';
        let values = [todoId, todo, isDone, dateCreated];
        try
        {
            let result = await pool.query(text, values);
            data = result.rows;
        }
        catch(err)
        {
            console.log(err);
            statusCode = 500;
            data = "Server Error... Contact support."
        }
        
        console.log(dateCreated);
    }
    
    
    let response = 
    {
        statusCode : statusCode,
        body : JSON.stringify(data)
    };
    
    return response;


}
