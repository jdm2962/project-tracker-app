import React, { useState } from "react";
import { v4 } from "uuid";

import "./projects.css";

import Project from "./project";

const Projects = () =>
{
	const [value, setValue] = useState("");
	const [projects, setProjects] = useState([]);
	const [color, setColor] = useState("#1abc9c");

	let colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#f1c40f", "#e67e22", "#e74c3c", "#f39c12", "#d35400", "#c0392b"
	];

	const pickColor = () =>
	{
		let random = Math.floor(Math.random() * 15);
		if(colors[random] === color)
		{
			random = null;
			pickColor();
		}
		else
		{
			setColor(colors[random]);
			return colors[random];
		}
	};
	

	const addProject = () =>
	{
		
		if(value !== "")
		{
			let newProjects = [...projects];
			let newProject = 
			{
				project : value,
				userId : "1",
				projectId : v4(),
				projectColor : pickColor()
			}
			newProjects.push(newProject);
			setProjects(newProjects);
			let options = 
			{
				method : "POST",
				body : JSON.stringify(newProject)
			};
			
			fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/project", options)
				.then(res => res.json())
				.then(data => console.log(data))
				.catch(err => console.log(err))

			setValue("");
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
			<h3 className = "title is-6 has-text-light mb-2">Add a Project:</h3>
			<div className="field ml-5">
				<div className="control is-flex">
					<input 
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