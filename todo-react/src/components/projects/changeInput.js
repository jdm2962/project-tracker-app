import React from "react";

import { convertToSpaces } from "../../helpers";


class ChangeInput extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			value : convertToSpaces(this.props.value),
		};

		this.setInput = this.setInput.bind(this);
		this.changeProjectState = this.changeProjectState.bind(this);
	}

	setInput(event)
	{
		this.setState({value : event.target.value});
		this.props.setEditInput(event.target.value);
	};

	changeProjectState(event)
	{
		this.props.changeProjectState(event, this.state.value);
	}

	componentDidMount()
	{
		let input = document.getElementById("changeInput");
		input.focus();
	}


	render()
	{
		return(
			<div id = "editProject">
				<input 
					type = "text"
					value = {this.state.value}
					onChange = {this.setInput}
					onKeyUp = {this.changeProjectState}
					className = "input is-large is-primary"
					id = "changeInput"/>
					</div>
		);
	}
}

export default ChangeInput;