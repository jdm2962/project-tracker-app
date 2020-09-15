import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import TodoContainer from "../todoCore/todoContainer";

import {formatSpaces} from "../../helpers";

const ProjectTodos = (props) =>
{	
	// let project = props.location.state.project;
	let { project } = useParams();
	let { userId } = props.location.state;

	let formattedProject = formatSpaces(project);
	let url = "https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/project/" + userId + "/" + formattedProject;

	let [currentProject, setCurrentProject] = useState({});


	const saveToDb = () =>
	{
		let options = 
		{
			method : "POST",
			body : JSON.stringify(currentProject)
		};
		fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/project",options)
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err))
	};

	const clear = () =>
	{

	};

	const updateProjectTodos = (todos) =>
	{
		let updatedProject = {...currentProject};
		updatedProject.todos = todos;
		setCurrentProject(updatedProject);

	};

	useEffect(() =>
	{
		// fetch project and all its properties
			// sets project on project todos page
		fetch(url)
			.then(res => res.json())
			.then(data => setCurrentProject(data)
)
			.catch(err => console.log(err))
	}, []);

	return(
		<>
			<div className="field is-grouped" id = "controlButtons">
			  <p className="control">
			    <button 
			    	onClick = {saveToDb}
			    	className = "button is-link"
			    	id = "saveButton">
			    		Save
			    </button>
			  </p>
			  <p className="control">
			    <button 
			    	onClick = {clear}
			    	className = "button is-danger">
			    		Clear
			    </button>
			  </p>
			</div>
			<TodoContainer todos = {currentProject.todos} updateProjectTodos = {updateProjectTodos}/>
		</>
		);

};


export default ProjectTodos;











