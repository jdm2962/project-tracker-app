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
			<div className = "control" id = "finishedList">
				<h2 className = "content is-medium underline is-bold">Finished List</h2>

				<div className="field is-grouped">
				  <p className="control">
				    <button 
				    	onClick = {this.undoAll}
				    	className = "button is-link is-small">
				    		Undo All
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