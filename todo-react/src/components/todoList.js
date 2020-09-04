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
				<button>
					Mark All Done
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













