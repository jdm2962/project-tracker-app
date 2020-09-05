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

		this.undoAll = this.undoAll.bind(this);
		this.deleteTodos = this.deleteTodos.bind(this);
	}

	undoAll()
	{
		this.props.undo();
	}

	deleteTodos()
	{
		this.props.deleteTodos(this.state.finTodos);
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
				<button onClick = {this.undoAll}>Undo All</button>
				<button onClick = {this.deleteTodos}>Clear All</button>
				{finTodos.map(todo => 
					<Todo 
						todo = {todo} key = {todo.todoid} 
						changeIsDone = {this.props.changeIsDone} 
					/>
				)}
			</div>
		);
	}
}