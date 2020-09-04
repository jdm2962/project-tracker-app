import React from "react";

import {v4} from "uuid"

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
	}


	addTodo(todo)
	{
		let newTodos = [...this.state.todos];
		let newTodo =
		{
			todo : todo,
			isDone : false,
			todoid : v4()
		}
		newTodos.push(newTodo);
		this.setState({todos : newTodos});
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
			<div>
				<TodoInput addTodo = {this.addTodo}/>
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
		);
	}
}

export default TodoContainer;