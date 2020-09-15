import React, { useState, useRef, useEffect } from "react";

const ProjectInput = (props) =>
{

	const [cancelVisible, setCancelVisible] = useState(false);

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


	return(

		<div className = { isHidden ? "is-hidden" : "field ml-5"}>
			<div className="control is-flex">
				<input 
					ref = {textInput}
					className="input is-primary mr-4" 
					type="text" 
					placeholder="Enter a project name!" 
					id = "projectInput" 
					onChange = {changeInput} 
					onKeyPress = {keyAddProject}
					value = {value}/>
				<button 
					className = "button is-primary" 
					id = "addProject"
					onClick = {addProject}>
						Add Project
				</button>
			</div>

		</div>
	);
};


export default ProjectInput;









