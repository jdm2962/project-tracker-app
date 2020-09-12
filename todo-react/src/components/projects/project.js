import React, { useState } from "react";
import { Link } from "react-router-dom";

import ChangeInput from "./changeInput";

import "./projects.css";


const Project = (props) =>
{

	const project = props.project;
	const [editable, setEditable] = useState(false);
	const [editInput, setEditInput] = useState("");
	

	const makeEditable = () =>
	{
		setEditable(!editable);			
	};


	const changeProjectState = (event, childValue) =>
	{
		if(event.key === "Escape")
		{
			setEditable(!editable);
		}
		else if(event.key === "Enter")
		{
			if(project.project !== childValue)
			{
				let projects = props.projects;
				let index = projects.indexOf(project)
				let setProjects = props.setProjects;
				let updatedProjects = projects.filter(proj => project.projectId !== proj.projectId);
				let updatedProject = project;
				updatedProject.project = childValue;
				updatedProjects.splice(index, 0, updatedProject);
				setProjects(updatedProjects);
				setEditable(!editable);
			}
			else 
			{
				setEditable(!editable);
				return;
			}
			
		}
		else
		{
			return;
		}
	};

	const submitChanges = () =>
	{
		console.log(editInput, project.project);
		if(project.project !== editInput && editInput !== "")
		{

			console.log("if");
			let projects = props.projects;
			let setProjects = props.setProjects;
			let index = projects.indexOf(project)
			let updatedProjects = projects.filter(proj => project.projectId !== proj.projectId);
			let updatedProject = project;
			updatedProject.project = editInput;
			updatedProjects.splice(index, 0, updatedProject);
			setProjects(updatedProjects);
			setEditable(!editable);
		}
		else if(project.project === editInput || editInput === "")
		{
			setEditable(!editable);
			return;
		}
	};

	const deleteTodo = () =>
	{
		let projects = props.projects;
		let setProjects = props.setProjects;
		let updatedProjects = projects.filter(proj => project.projectId !== proj.projectId);
		setProjects(updatedProjects);
	};

	return(
		<div id = "projectContainer">
			<span className = "editButtons">
				<button 
					className = "button is-warning"
					onClick = {makeEditable}>
					<span className="icon is-small ">
						<i className="far fa-edit iconStyle"></i>
					</span>
				</button>
				<button 
					className = "button is-danger"
					onClick = {deleteTodo}>
					<span className="icon is-small ">
						<i className="far fa-trash-alt iconStyle"></i>
					</span>
				</button>

				{
					editable &&
					
					<button 
						className = "button is-success"
						onClick = {submitChanges}>
						<span className="icon is-small ">
							<i className="fas fa-check-square iconStyle"></i>
						</span>
					</button>
					
				}
			</span>
			{
				editable 
				?
					<ChangeInput 
						value = {project.project}
						changeProjectState = {changeProjectState}
						setEditInput = {setEditInput}/>
				:
					<button 
						className = "button is-medium"
						style = {{backgroundColor : project.projectColor}}>
							{project.project}
					</button>
			}
		</div>
	);
};


export default Project;