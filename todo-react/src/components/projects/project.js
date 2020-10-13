import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import ChangeInput from "./changeInput";
import ProjectTodos from "./projectTodos";

import { formatSpaces } from "../../helpers";
import { convertToSpaces } from "../../helpers";



const Project = (props) =>
{
	const project = props.project;

	return(

			
		<>
			<NavLink 
					to = 
					{{
						pathname : `/project/${project.project}/${project.projectId}`
					}}
					className = "projectButton  button is-link">
					{convertToSpaces(project.project)}
			</NavLink>
		</>

	);
};


export default Project;