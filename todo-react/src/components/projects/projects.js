import React, { useState, useEffect } from "react";
import { v4 } from "uuid";

import "./projects.css";

import Project from "./project";
import ToggleProjectButton from "./toggleProjectButton";
import ProjectInput from "./projectInput";

import { formatSpaces } from "../../helpers";


const moment = require("moment");

const Projects = () =>
{
	const [value, setValue] = useState("");
	const [projects, setProjects] = useState([]);
	const [color, setColor] = useState("#e67e22");
	const [isHidden, setIsHidden] = useState(true);
	

	//**** TEMPORARY GET FROM LOGGED IN USER LATER
	let userId = "1";
	//****

	

	useEffect(() =>
	{
		// change page title
		let title = document.querySelector("#title");
		title.innerHTML = "Projects";

		fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/projects/" + userId)
			.then(res => res.json())
			.then(data => 
			{
				setProjects(data);
			})
			.catch(err => console.log(err))		
	}, [userId]);


	const addProject = () =>
	{
		
		let modifiedValue = formatSpaces(value);
		let modifiedProject;
		
		if(value !== "")
		{
			let newProjects = [...projects];
			let newProject = 
			{
				userId : "1",
				project : value.trim(),
				projectId : v4(),
				projectColor : color,
				dateCreated : moment().format("YYYY-MM-DD hh:mm:ss"),
				todos : []
			}
			newProjects.push(newProject);
			setProjects(newProjects);


			// send modified project to server
			modifiedProject = {...newProject};
			modifiedProject.project = modifiedValue;
			let options = 
			{
				method : "POST",
				body : JSON.stringify(modifiedProject)
			};
			fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/project/", options)
				.then(res => res.json())
				.then(data => 
				{
					console.log(data);
					setValue("");
				})
				.catch(err => console.log(err))

		}
	};

	const keyAddProject = (event) =>
	{
		let keyCode = event.keyCode || event.which;
		if(keyCode === 13)
		{
			document.getElementById("addProject").click();
		}
		else
		{
			return;
		}
	};

	const changeInput = (event) =>
	{
		setValue(event.target.value);
	};

	

	return(
		<div className = "section pt-4" id = "projects">
			<h1 className = "title is-2 is-bold has-text-light mb-5">Projects</h1>
			{/*<h3 className = "title is-6 has-text-light mb-2">Add a Project:</h3>*/}
			<ToggleProjectButton 
				isHidden = {isHidden} 
				setIsHidden = {setIsHidden}/>
			<ProjectInput 
				isHidden = {isHidden}
				value = {value}
				changeInput = {changeInput}
				addProject = {addProject}
				keyAddProject = {keyAddProject}/>

			<div className = " mt-6" id = "buttons">
				{
					projects.length > 0 ?
					projects.map(project => {
						return( 
							<div 
								className = "project"
								key = {project.projectId}>
								<Project  
									project = {project} 
									projects = {projects}  
									setProjects = {setProjects}/>
							</div>
						);
					})

					: <p className = "content is-medium">No projects to display...Get to work!</p>
				}
			</div>
		</div>
	);
};


export default Projects;