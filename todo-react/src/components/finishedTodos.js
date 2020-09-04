import React from "react";

import Todo from "./todo";

export default class FinishedTodos extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			finTodos : this.props.finishedTodos || []
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot)
	{
		let todos = this.props.finishedTodos;

		if(this.props.finishedTodos !== prevProps.finishedTodos)
		{
			this.setState({finTodos : this.props.finishedTodos})
		}
	}

	render()
	{
		let finTodos = this.state.finTodos;
		return(
			<div>
				<h2>Finished List</h2>
				{finTodos.map(todo => <Todo todo = {todo} key = {todo.todoid} changeIsDone = {this.props.changeIsDone} />)}
			</div>
		);
	}
}