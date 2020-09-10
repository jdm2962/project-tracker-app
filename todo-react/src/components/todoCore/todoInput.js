import React from "react";

export default class TodoInput extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			value : ""
		};

		this.changeValue = this.changeValue.bind(this);
		this.passTodo = this.passTodo.bind(this);
		this.submitTodo = this.submitTodo.bind(this);
	}

	changeValue(event)
	{
		this.setState({value : event.target.value})
	}

	passTodo()
	{
		let value = this.state.value;
		let addTodo = this.props.addTodo;

		addTodo(value);
		this.setState({value : ""});
	}

	// add todo on enter keypress
	submitTodo(event)
	{
		// cross browser compatibility
		let keyCode = event.keyCode || event.which;
		if(keyCode === 13)
		{
			document.getElementById("addTodo").click();
		}
	}


	render()
	{

		return(
			<div className = "todoInput">
				<h2 className = "content is-large is-bold underline">Add a TODO!</h2>
				<div className="field">
					<div className="control">
						<input 
						type = "text" 
						value = {this.state.value} 
						onChange = {this.changeValue}
						onKeyPress = {this.submitTodo}
						className="input is-primary"/>
					</div>
				</div>

				 <button 
				 	className="button is-success" 
					onClick = {this.passTodo}
					id = "addTodo">
				Add Todo!
				</button>
			</div>
		);

	}
}


























