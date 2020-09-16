import React from "react";

import {v4} from "uuid"
import moment from "moment";

import "./todos.css";

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
			todos : this.props.todos || [],
		};


		this.addTodo = this.addTodo.bind(this);
		this.changeIsDone = this.changeIsDone.bind(this);
		this.markAllDone = this.markAllDone.bind(this);
		this.undoAll = this.undoAll.bind(this);
		this.deleteTodos = this.deleteTodos.bind(this);
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
			this.setState({todos : newTodos}, () => this.props.updateProjectTodos(this.state.todos));
		}
		
	}

	changeIsDone(todo)
	{
		let todos = [...this.state.todos];
		// create a new list of todos with the updated todo
		let newTodos = todos.filter(oldTodo => oldTodo.todoid !== todo.todoid);
		newTodos.push(todo);
		this.setState({todos : newTodos}, () => this.props.updateProjectTodos(this.state.todos));
	}

	markAllDone()
	{
		let newTodos = [...this.state.todos].map((todo) => 
			{
				todo.isdone = true;
				return todo;
			});
		this.setState({todos : newTodos}, () => this.props.updateProjectTodos(this.state.todos));
	}

	undoAll()
	{
		let newTodos = [...this.state.todos].map((todo) => 
			{
				todo.isdone = false;
				return todo;
			});
		this.setState({todos : newTodos}, () => this.props.updateProjectTodos(this.state.todos));
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
		this.setState({todos : newTodos}, () => this.props.updateProjectTodos(this.state.todos));
	}

	
	componentDidMount()
	{
		let title = document.querySelector("#title");
		title.innerHTML = "TODOS";
	}

	componentDidUpdate(prevState, prevProps)
	{
		if(this.props.todos !== prevProps.todos)
		{
			this.setState({todos : this.props.todos});
		}
	}


	render()
	{
		let todos = this.state.todos;
		return(
			<div className = "section todoContainer" id = "todoContainer" key = {this.props.todos}>
				<TodoInput 
					addTodo = {this.addTodo}
					inputIsVisible = {this.props.inputIsVisible}
					setinputIsVisible = {this.props.setInputIsVisible}/>
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