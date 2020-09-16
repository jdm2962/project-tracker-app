import React from "react";

import "./todos.css";

export default class TodoInput extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = 
		{
			value : "",
			inputIsVisible : this.props.inputIsVisible,
			setInputIsVisible : this.props.setInputIsVisible
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

	componentDidUpdate(prevState, prevProp)
	{
		if(this.props.inputIsVisible !== prevProp.inputIsVisible)
		{
			this.setState({inputIsVisible : this.props.inputIsVisible});
		}
	}

	render()
	{
		let isVisible = this.state.inputIsVisible;

		return(
			<div className = {isVisible ? "todoInput mb-2" : "todoInput is-hidden"}>
				<div className="field">
					<div className="control">
						<input 
						type = "text" 
						value = {this.state.value} 
						onChange = {this.changeValue}
						onKeyPress = {this.submitTodo}
						className="input is-primary textInput"
						placeholder = "Add a TODO!"/>
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


























