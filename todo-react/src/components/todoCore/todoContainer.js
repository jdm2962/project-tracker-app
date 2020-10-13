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
			todos : this.props.todos || [],
		};


		this.addTodo = this.addTodo.bind(this);
		this.changeIsDone = this.changeIsDone.bind(this);
		this.markAllDone = this.markAllDone.bind(this);
		this.undoAll = this.undoAll.bind(this);
		this.deleteTodos = this.deleteTodos.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
		this.moveTodo = this.moveTodo.bind(this);
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

	deleteTodo(todo)
	{
		let newTodos = [...this.state.todos];
		newTodos.forEach((currentTodo, index) =>
		{
			if(currentTodo.todo === todo)
			{
				newTodos.splice(index, 1);
			}
		});
		this.setState({todos : newTodos}, () => this.props.updateProjectTodos(this.state.todos));
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

	updateTodo(todo, newTodo)
	{
		let newTodos = [...this.state.todos];
		newTodos.forEach((currentTodo, index) => 
		{
			if(currentTodo.todo === todo)
			{
				newTodos[index].todo = newTodo;
			}
		});

		this.setState({todos : newTodos}, () => this.props.updateProjectTodos(this.state.todos));
	}

	swapTodos(todo, todos, where)
	{
		let updatedTodos = [...todos]; 
		let todoIndex;
		let swapIndex;
		let swapTodo;
		let top = false;
		let bottom = false;

		todos.forEach((currentTodo, index) =>
		{
			if(currentTodo.todoid === todo.todoid)
			{
				todoIndex = index;
				if(todoIndex === 0 && where === "up")
				{
					// todo is at the top of list already
					top = true;
					return;
				}
				else
				{
					if(where === "up")
					{
						swapIndex = index -1;
						swapTodo = todos[swapIndex];	
					}
					else 
					{
						// intent is to move down
						// check if already at bottom
						if(index === todos.length - 1)
						{
							bottom = true;
							return;
						}
						else
						{
							swapIndex = index +1;
							swapTodo = todos[swapIndex];
						}
					}
				}
			}
		})
		// swap todos
		updatedTodos[swapIndex] = todo;
		updatedTodos[todoIndex] = swapTodo;
		// let newTodos = updatedTodos.concat(finTodos);
		if(top) return "at top";
		else if(bottom) return "at bottom";
		else return updatedTodos;
	}

	moveTodo(todo, where, isdone)
	{
		let todos = this.state.todos.filter(todo => !todo.isdone);
		let finTodos = this.state.todos.filter(todo => todo.isdone);
		let updatedTodos;
		
		if(isdone)
		{
			// finished todos
			updatedTodos = this.swapTodos(todo, finTodos, where);
			if(updatedTodos === "at top")
			{
				return;
			}
			else if (updatedTodos === "at bottom")
			{
				return;
			}
			else
			{
				let newTodos = updatedTodos.concat(todos);
				this.setState({todos : newTodos}, () => this.props.updateProjectTodos(this.state.todos));
			}

		}
		else
		{
			// not finished todos
			updatedTodos = this.swapTodos(todo, todos, where);
			if(updatedTodos === "at top")
			{
				return;
			}
			else if (updatedTodos === "at bottom")
			{
				return;
			}
			else
			{
				let newTodos = updatedTodos.concat(finTodos);
				this.setState({todos : newTodos}, () => this.props.updateProjectTodos(this.state.todos));
			}
		}

		// else if(where === "down")
		// {
		// 	console.log("down");
		// 	console.log(todo, where, isdone);
		// }
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
						todos = {todos ? todos.filter(todo => !todo.isdone) : [] }
						changeIsDone = {this.changeIsDone}
						markAllDone = {this.markAllDone}
						deleteTodos = {this.deleteTodos}
						deleteTodo = {this.deleteTodo}
						updateTodo = {this.updateTodo}
						moveTodo = {this.moveTodo}/>
					<FinishedTodosList 
						finishedTodos = {todos ? todos.filter(todo => todo.isdone) : []} 
						changeIsDone = {this.changeIsDone} 
						undo = {this.undoAll}
						deleteTodos = {this.deleteTodos}
						deleteTodo = {this.deleteTodo}
						updateTodo = {this.updateTodo}
						moveTodo = {this.moveTodo}/>
				</div>
			</div>
		);
	}
}

export default TodoContainer;