import React from "react";

import Todo from "./todo";

export default class TodoList extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			todos : this.props.todos
		}

		this.markDone = this.markDone.bind(this);
		this.deleteTodos = this.deleteTodos.bind(this);
	}

	markDone()
	{
		let markAllDone = this.props.markAllDone;
		markAllDone();
	}

	deleteTodos()
	{
		this.props.deleteTodos(this.state.todos);
	}

	componentDidUpdate(prevProps, prevState, snapshot)
	{
		let todos = this.props.todos;

		if(this.props.todos !== prevProps.todos)
		{
			this.setState({todos : this.props.todos})
		}
	}

	render()
	{
		let todos = this.state.todos;

		return(
			<div className = "" id = "todoList">
				<h2 className = "content is-medium underline is-bold">TODO</h2>
				<div className="field is-grouped">
				  <p className="control">
				    <button 
				    	onClick = {this.markDone}
				    	className = "button is-link is-small">
				    		Mark All Done
				    </button>
				  </p>
				  <p className="control">
				    <button 
				    	onClick = {this.deleteTodos}
				    	className = "button is-danger is-small">
				    		Clear All
				    </button>
				  </p>
				</div>


				{todos.map((todo) => {
					return (
						<Todo key = {todo.todoid} todo = {todo} changeIsDone = {this.props.changeIsDone}/>
					)
				})}
			</div>
		);
	}

}













