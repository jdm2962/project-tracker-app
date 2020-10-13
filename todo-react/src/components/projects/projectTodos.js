import React, { useState, useEffect } from "react";

import TodoContainer from "../todoCore/todoContainer";
import ProjectSettings from "./projectSettings";
import ProjectSelect from "./projectSelect";

import {formatSpaces} from "../../helpers";
import {convertToSpaces} from "../../helpers";
import history from "../main/history";

const ProjectTodos = (props) =>
{	
	const [projectInfo, setProjectInfo] = useState(props.location.pathname.split("/"));
	const [projectName, setProjectName] = useState(projectInfo[2]);
	const [projectId, setProjectId] = useState(projectInfo[3]);
	const [currentProject, setCurrentProject] = useState({});
	const [inputIsVisible, setInputIsVisible] = useState(false);
	const [isCancelButton, setIsCancelButton] = useState(false);
	const [settingsIsVisible, setSettingsIsVisible] = useState(false);

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
		// set local storage
		let projects = JSON.parse(localStorage.getItem("projects"));
		projects.forEach(proj => 
		{
			if(proj.project === updatedProject.project)
			{
				projects[projects.indexOf(proj)] = updatedProject;
			}
		});

		localStorage.setItem("projects", JSON.stringify(projects));

	};

	const updateProjectName = (projName) =>
	{
		let updatedProjects;
		let oldProject = {...currentProject};
		let updatedProject = {...currentProject};
		// update project
		updatedProject.project = formatSpaces(projName);

		// set local storage
		let currentProjects = JSON.parse(localStorage.getItem("projects"));
		currentProjects.forEach((project, index) => 
		{
			if(project.project === oldProject.project)
			{
				updatedProjects = [...currentProjects];
				updatedProjects[index] = updatedProject;
				localStorage.setItem("projects", JSON.stringify(updatedProjects));
			}
		});

		// update project name and current project
		setProjectName(projName);
		setCurrentProject(updatedProject);

		// update url
		history.replace(`/project/${projName}/${currentProject.projectId}`);

		// need both old and new items for db update
		let projs = {};
		projs.oldProject = oldProject;
		projs.updatedProject = updatedProject;

		// update db
		const options = 
		{
			method : "PUT",
			body : JSON.stringify(projs)
		}
		fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/project", options)
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err))
	};

	const toggleInputVisible = () =>
	{	
		setInputIsVisible(!inputIsVisible);
		setIsCancelButton(!isCancelButton);
	};

	const toggleSettings = () => 
	{
		setSettingsIsVisible(!settingsIsVisible);
	};

	useEffect(() =>
	{
		// load from local storage if available
		let projects = JSON.parse(localStorage.getItem("projects"));
		if(projects)
		{
			projects.forEach(proj =>
			{
				if(proj.projectId === projectId)
				{
					setCurrentProject(proj);
				}
			});
		}
		else
		{
			// if nothing in local storage, query db
			let userId = 1;
			fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/project/" + userId + "/" + projectName)
				.then(res => res.json())
				.then(data => 
				{
					setCurrentProject(data)
				})
				.catch(err => console.log(err))
		}
	}, [projectId, setCurrentProject]);

	useEffect(() => 
	{
		// update page title
		let title = document.querySelector("#title");
		title.innerHTML = convertToSpaces(convertToSpaces(projectName));
}, [projectName]);



	return(
		<div 
			className = "section has-background-light" 
			id = "projectTodos">
			<div id = "projectBar">
				<h2 
					className = "content mt-4 projectName">
							{currentProject.project ? convertToSpaces(currentProject.project) : ""}
				</h2>
				<div id = "selectContainer">
					<ProjectSelect 
						projectName = {projectName}
						currentProject = {currentProject}
						setCurrentProject = {setCurrentProject}/>
					<button 
						className = "button" id = "cog"
						onClick = {toggleSettings}>
						<span className = "icon">
							<i className="fas fa-cog"></i>
						</span>
					</button>
				</div>
			</div>

			<ProjectSettings 
				projectName = {currentProject.project}
				updateProjectName = {updateProjectName}
				saveToDb = {saveToDb}
				settingsIsVisible = {settingsIsVisible}
				setSettingsIsVisible = {setSettingsIsVisible}/>
			
			<div className="field is-grouped" id = "controlButtons">
				<p className="control" id = "addTodoBtnContainer">
				{
					isCancelButton
					?
						<button 
							onClick = {toggleInputVisible}
							className = "button is-danger"
							id = "cancelTodoButton">
								Cancel
						</button>

					:
						<button 
							onClick = {toggleInputVisible}
							className = "button is-link"
							id = "addTodoButton">
								Add a Task!
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
					className = "button is-danger"
					id = "clearButton">
						Clear
				</button>
				</p>
			</div>
			<TodoContainer 
				todos = {currentProject.todos} 
				updateProjectTodos = {updateProjectTodos}
				inputIsVisible = {inputIsVisible}
				setinputIsVisible = {setInputIsVisible}/>
		</div>
		);

};


export default ProjectTodos;