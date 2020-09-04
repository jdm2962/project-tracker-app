import React from "react";

export default class Todo extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			todo : this.props.todo.todo,
			isdone : this.props.todo.isdone,
			todoId : this.props.todoid
		};

		this.inputChange = this.inputChange.bind(this);
	}

	inputChange(event)
	{
		let changeIsDone = this.props.changeIsDone;
		let todo = this.props.todo;
		todo.isdone = event.target.checked;
		changeIsDone(todo);
	}

	render()
	{
		return(
			<div>
				<input type = "checkbox" defaultChecked = {this.props.todo.isdone} onChange = {this.inputChange}/>
				<span>{this.state.todo}</span>
			</div>
		);
	}
}