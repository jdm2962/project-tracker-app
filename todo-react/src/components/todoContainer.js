import React from "react";

import {v4} from "uuid"
import moment from "moment";


import TodoInput from "./todoInput"
import TodoList from "./todoList";
import FinishedTodosList from "./finishedTodos";

class TodoContainer extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			todos : [],
		};

		this.addTodo = this.addTodo.bind(this);
		this.changeIsDone = this.changeIsDone.bind(this);
		this.markAllDone = this.markAllDone.bind(this);
		this.undoAll = this.undoAll.bind(this);
		this.deleteTodos = this.deleteTodos.bind(this);
		this.saveToDb = this.saveToDb.bind(this);
		this.clear = this.clear.bind(this);
	}


	addTodo(todo)
	{
		if(todo === "")
		{
			return;
		}
		else
		{
			let newTodos = [...this.state.todos];
			let newTodo =
			{
				todo : todo,
				isdone : false,
				todoid : v4(),
				datecreated : moment().format("YYYY-MM-DD hh:mm:ss")
			}
			newTodos.push(newTodo);
			this.setState({todos : newTodos});
		}
		
	}

	changeIsDone(todo)
	{
		let todos = [...this.state.todos];
		// create a new list of todos with the updated todo
		let newTodos = todos.filter(oldTodo => oldTodo.todoid !== todo.todoid);
		newTodos.push(todo);
		this.setState({todos : newTodos});
	}

	markAllDone()
	{
		let newTodos = [...this.state.todos].map((todo) => 
			{
				todo.isdone = true;
				return todo;
			});
		this.setState({todos : newTodos});
	}

	undoAll()
	{
		let newTodos = [...this.state.todos].map((todo) => 
			{
				todo.isdone = false;
				return todo;
			});
		this.setState({todos : newTodos});
	}

	deleteTodos(todos)
	{
		let currentTodos = this.state.todos;
		let newTodos = [];
		todos.forEach(todo =>
		{
			currentTodos.splice(currentTodos.indexOf(todo), 1);
		});
		newTodos = [...currentTodos];
		this.setState({todos : newTodos});
	}

	saveToDb()
	{
		let options = 
		{
			method : "POST",
			body : JSON.stringify(this.state.todos)
		};
		fetch("https://1rmebtk837.execute-api.us-east-1.amazonaws.com/test-1/todos/save", options)
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err))
	}

	clear()
	{
		this.setState({todos : []});
		setTimeout(() => this.saveToDb(), 500);
	}
	
	componentDidMount()
	{
		fetch("https://1rmebtk837.execute-api.us-east-1.amazonaws.com/test-1/todos")
			.then(res => res.json())
			.then(data => this.setState({todos : data}))
	}


	render()
	{
		let todos = this.state.todos;
		return(
			<div className = "section todoContainer" id = "todoContainer">
				<div className="field is-grouped" id = "controlButtons">
				  <p className="control">
				    <button 
				    	onClick = {this.saveToDb}
				    	className = "button is-link"
				    	id = "saveButton">
				    		Save All
				    </button>
				  </p>
				  <p className="control">
				    <button 
				    	onClick = {this.clear}
				    	className = "button is-danger">
				    		Clear All
				    </button>
				  </p>
				</div>

				<TodoInput addTodo = {this.addTodo}/>
				<div className = "" id = "todoLists">
					<TodoList 
						todos = {todos.filter(todo => !todo.isdone)} 
						changeIsDone = {this.changeIsDone}
						markAllDone = {this.markAllDone}
						deleteTodos = {this.deleteTodos}/>
					<FinishedTodosList 
						finishedTodos = {todos.filter(todo => todo.isdone)} 
						changeIsDone = {this.changeIsDone} 
						undo = {this.undoAll}
						deleteTodos = {this.deleteTodos}/>
				</div>
			</div>
		);
	}
}

export default TodoContainer;