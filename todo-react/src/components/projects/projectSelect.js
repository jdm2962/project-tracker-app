import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import history from "../main/history";

import {convertToSpaces} from "../../helpers";


const ProjectSelect = (props) =>
{
	const [projects, setProjects] = useState([]);
	const [value, setValue] = useState(convertToSpaces(props.projectName));

	const getProjects = (userId) =>
	{
		// check local storage first
		let projs = JSON.parse(localStorage.getItem("projects"));
		if(projs)
		{
			setProjects(projs);
		}
		else
		{
			fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/projects/" + userId)
				.then(res => res.json())
				.then(data => 
				{
					setProjects(data);
					localStorage.setItem("projects", JSON.stringify(data));
				})
				.catch(err => console.log(err))
		}
	};
	
	const handleChange = (event) =>
	{
		setValue(event.target.value);
		// get updated projects
		getProjects(1);
		projects.forEach((listProject, index) => 
		{
			if(convertToSpaces(listProject.project) === event.target.value)
			{
				props.setCurrentProject(projects[index]);
				history.push(`/project/${listProject.project}/${listProject.projectId}`)
			}
		});
	};


	useEffect(() =>
	{
		console.log("projectSelect ran");
		getProjects(1);
		setValue(convertToSpaces(props.projectName)); 	
	}, [setValue, props.projectName]);



	return(			
		<div className = "select ml-5 projectSelect">
			<select 
				value = {value}
				onChange = {handleChange}>
				{
					projects.length > 0
						?
							projects.map(proj => 
								<option 
									key = {proj.projectId} 
									value = {convertToSpaces(proj.project)}>
										{convertToSpaces(proj.project)}
								</option>)
						:
							<option>No projects</option>
				}
			</select>
		</div>
	);
};


export default ProjectSelect;