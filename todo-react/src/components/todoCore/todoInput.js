import React, {createRef} from "react";

import "./todos.css";

export default class TodoInput extends React.Component
{
	constructor(props)
	{
		super(props);
		this.inputRef = createRef();

		this.state = 
		{
			value : "",
			inputIsVisible : this.props.inputIsVisible,
			setInputIsVisible : this.props.setInputIsVisible
		};

		this.changeValue = this.changeValue.bind(this);
		this.passTodoUp = this.passTodoUp.bind(this);
		this.submitTodo = this.submitTodo.bind(this);
		this.exitTodoInput = this.exitTodoInput.bind(this);
	}

	changeValue(event)
	{
		this.setState({value : event.target.value})
	}

	passTodoUp()
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

	exitTodoInput(event)
	{
		let keyCode = event.keyCode || event.which;
		if(keyCode === 27)
		{
			document.getElementById("cancelTodoButton").click();
		}
	}

	componentDidUpdate(prevState, prevProp)
	{
		if(this.props.inputIsVisible !== prevProp.inputIsVisible)
		{
			this.setState({inputIsVisible : this.props.inputIsVisible});
		}

		this.inputRef.current.focus();
	}

	render()
	{
		let isVisible = this.state.inputIsVisible;

		return(
			<div className = {isVisible ? "todoInput mb-2" : "todoInput is-hidden"}>
				<div className="field">
					<div className="control">
						<input 
						autoFocus = {true}
						ref = {this.inputRef}
						type = "text" 
						value = {this.state.value} 
						onChange = {this.changeValue}
						onKeyPress = {this.submitTodo}
						onKeyUp = {this.exitTodoInput}
						className="input is-primary textInput"
						placeholder = "Add a TODO!"/>
					</div>
				</div>

				 <button 
				 	className="button is-link" 
					onClick = {this.passTodoUp}
					id = "addTodo">
				Add Todo!
				</button>
			</div>
		);

	}
}


























