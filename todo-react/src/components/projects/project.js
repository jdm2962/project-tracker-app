import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import ChangeInput from "./changeInput";
import ProjectTodos from "./projectTodos";

import { formatSpaces } from "../../helpers";
import { convertToSpaces } from "../../helpers";

import "./projects.css";


const Project = (props) =>
{
	const project = props.project;

	return(
		<div id = "projectContainer">
			<button 
				className = "button is-medium projectButton"
				style = {{backgroundColor : project.projectColor, border : "none"}}>
					<NavLink 
							to = 
							{{
								pathname : `/project/${project.project}/${project.projectId}`, 
								state: {project : project}
							}}
							className = "has-text-dark">
							{convertToSpaces(project.project)}
					</NavLink>
			</button>
		</div>
	);
};


export default Project;