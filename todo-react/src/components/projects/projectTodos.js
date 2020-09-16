import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import "./todos.css";

import TodoContainer from "../todoCore/todoContainer";

import {formatSpaces} from "../../helpers";
import {convertToSpaces} from "../../helpers";

const ProjectTodos = (props) =>
{	
	// let project = props.location.state.project;
	const { project } = useParams();
	const { userId } = props.location.state;

	const formattedProject = formatSpaces(project);
	const url = "https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/project/" + userId + "/" + formattedProject;

	const [currentProject, setCurrentProject] = useState({});
	const [inputIsVisible, setInputIsVisible] = useState(false);
	const [isCancelButton, setIsCancelButton] = useState(false);

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
		// clear all todos
			// check for empty list.. if empty, don't send request
		if(currentProject.todos.length > 0)
		{	
			let updatedProject = {...currentProject};
			updatedProject.todos = [];
			setCurrentProject(updatedProject);
			let options = 
			{
				method : "POST",
				body : JSON.stringify(updatedProject)
			};
			fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/project",options)
				.then(res => res.json())
				.then(data => console.log(data))
				.catch(err => console.log(err))
		}
	};


	const updateProjectTodos = (todos) =>
	{
		let updatedProject = {...currentProject};
		updatedProject.todos = todos;
		setCurrentProject(updatedProject);

	};

	const toggleInputVisible = () =>
	{	
		setInputIsVisible(!inputIsVisible);
		setIsCancelButton(!isCancelButton);
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
			<h2 className = "title mt-4 has-text-light">{convertToSpaces(project)}</h2>
			
			<div className="field is-grouped mr-6" id = "controlButtons">
				<p className="control" id = "addTodoBtnContainer">
				{
					isCancelButton
					?
						<button 
							onClick = {toggleInputVisible}
							className = "button is-danger"
							id = "addTodoButton">
								Cancel
						</button>

					:
						<button 
							onClick = {toggleInputVisible}
							className = "button is-success"
							id = "addTodoButton">
								Add a Todo!
						</button>
				}

				</p>

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
			<TodoContainer 
				todos = {currentProject.todos} 
				updateProjectTodos = {updateProjectTodos}
				inputIsVisible = {inputIsVisible}
				setinputIsVisible = {setInputIsVisible}/>
		</>
		);

};


export default ProjectTodos;











