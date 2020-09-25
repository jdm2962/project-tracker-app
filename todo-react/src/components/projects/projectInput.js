import React, { useState, useRef, useEffect } from "react";

const ProjectInput = (props) =>
{
	const isHidden = props.isHidden;
	const value = props.value;
	const changeInput = props.changeInput;
	const keyAddProject = props.keyAddProject;
	const addProject = props.addProject;

	const textInput = useRef();

	useEffect(() =>
	{
		textInput.current.focus();		
	});

	const exitProjectInput = (event) =>
	{
		let exitInput = props.exitInput;
		exitInput(event);
	};


	return(

		<div className = { isHidden ? "is-hidden" : "field ml-5"}>
			<div className="control is-flex">
				<input 
					ref = {textInput}
					className="input mr-4" 
					type="text" 
					placeholder="Enter a project name!" 
					id = "projectInput" 
					onChange = {changeInput} 
					onKeyUp = {exitProjectInput}
					onKeyPress = {keyAddProject}
					value = {value}
					maxLength = "30"/>
				<button 
					className = "button is-link" 
					id = "addProject"
					onClick = {addProject}>
						Add Project
				</button>
			</div>

		</div>
	);
};


export default ProjectInput;









