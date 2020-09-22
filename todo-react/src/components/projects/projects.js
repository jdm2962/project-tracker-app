import React, { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";

import "./projects.css";

import Project from "./project";
import ToggleProjectButton from "./toggleProjectButton";
import ProjectInput from "./projectInput";

import { formatSpaces } from "../../helpers";
import { convertToSpaces } from "../../helpers";
import { sortByDate } from "../../helpers";


const moment = require("moment");

const Projects = () =>
{
	const [value, setValue] = useState("");
	const [projects, setProjects] = useState([]);
	const [color, setColor] = useState("#e67e22");
	const [isHidden, setIsHidden] = useState(true);
	const [isNewProject, setIsNewProject] = useState(true);

	const alreadyExists = useRef();
	

	//**** TEMPORARY GET FROM LOGGED IN USER LATER
	let userId = "1";
	//****

	

	useEffect(() =>
	{
		let local = localStorage.getItem("projects");
		// change page title
		let title = document.querySelector("#title");
		title.innerHTML = "Projects";
		if(!local || local.length === 0)
		{
			fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/projects/" + userId)
				.then(res => res.json())
				.then(data => 
				{
					// sort projects
					let sortedProjects = sortByDate(data);
					setProjects(sortedProjects);
					localStorage.setItem("projects", JSON.stringify(data));
				})
				.catch(err => console.log(err))		
		}
		else
		{
			let projs = JSON.parse(localStorage.getItem("projects"));
			setProjects(projs);
		}
	}, [userId]);


	const addProject = () =>
	{
			
		let modifiedValue = formatSpaces(value);
		let modifiedProject;
		let isNewProj = isNewProject;

		// don't add if empty string
		if(value !== "")
		{
			// check whether project already exists
			projects.forEach(project => 
			{
				// check for duplicate project names
				if(value === convertToSpaces(project.project))
				{
					setIsNewProject(false);
					isNewProj = false;
				}
			});

			if(isNewProj)
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

				// update local storage
				localStorage.setItem("projects", JSON.stringify(newProjects));

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
			else
			{
				alreadyExists.current.classList.remove("is-hidden")
				return;
			}

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
		
		// toggle "Project already Exists span if necessary"
		if(!isNewProject)
		{
			setIsNewProject(true);
			alreadyExists.current.classList.add("is-hidden");
		}
	};

	const exitInput = (event) =>
	{
		let keyCode = event.keyCode || event.which;
		if(keyCode === 27)
		{
			document.getElementById("projectCancel").click();
		}
	};


	return(
		<div className = "section pt-4" id = "projects">
			<h2 
				className = "content mb-5 projectsH2">
					Projects
			</h2>
			<div>
				<ToggleProjectButton 
					isHidden = {isHidden} 
					setIsHidden = {setIsHidden}/>
				<span 
					className = "has-text-danger content ml-6 is-size-3 has-text-weight-bold is-hidden"
					ref = {alreadyExists}>
						Project Already Exists
				</span>
			</div>
			<ProjectInput 
				isHidden = {isHidden}
				value = {value}
				changeInput = {changeInput}
				exitInput = {exitInput}
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