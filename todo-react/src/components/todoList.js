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
			<div>
				<h2>TODO</h2>
				<button onClick = {this.markDone}>
					Mark All Done
				</button>
				<button onClick = {this.deleteTodos}>
					Delete All
				</button>
				{todos.map((todo) => {
					return (
						<Todo key = {todo.todoid} todo = {todo} changeIsDone = {this.props.changeIsDone}/>
					)
				})}
			</div>
		);
	}

}













