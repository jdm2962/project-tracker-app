import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "../../sass/home.scss";

import { sortByDate } from "../../helpers.js";

import Login from "../login/login";
import Stats from "./stats.js";
import Project from "../projects/project";


const Home = (props) =>
{

	const [projects, setProjects] = useState([]);
	const [sortedProjects, setSortedProjects] = useState([]);

	useEffect(() =>
	{
		let title = document.getElementById("title");
		title.innerHTML = "Home";

		// check local storage
		if(props.loggedIn)
		{	
			let projs = JSON.parse(localStorage.getItem("projects"));
			if(projs)
			{
				setProjects(projs);
				let sorted = sortByDate(projs);
				setSortedProjects(projs.slice(0, 5))
			}
			// if not cached, query db
			else
			{
				const userId = 1;
				fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/projects/" + userId)
					.then(res => res.json())
					.then(data => 
					{
						setProjects(data);
						// set local storage
						localStorage.setItem("projects", JSON.stringify(data));
						// sort projects and keep only 5
						let sorted = sortByDate(data);
						setSortedProjects(data.slice(0, 5))
						
					})
					.catch(err => console.log(err))
			}
		}
	}, [props.loggedIn]);


	return(

		<>
			{
				props.loggedIn 
					?
						<div className = "section homeContainer" id = "homeContainer">
							<div className = "columns">
								<div className = "has-background-light column" id = "addProjectContainer">
									<p className = "is-size-4 mb-2">Hello!</p>
									<NavLink 
										className = "button is-success mb-1 projectsButton"
										to = "/projects">
											Create a new project
									</NavLink>
									<p className = "content">and start tracking tasks!</p>
								</div>
								<Stats projects = {projects}/>
							</div>
							<div className = "currentProjects has-background-light">
								<p className = "content is-size-5 is-bold">Recently Created Projects</p>
								<div className = "recentProjects">
								{
									sortedProjects.map(project => {
										return(
												<Project key = {project.projectId} project = {project}/>
									)})
								}
								</div>
							</div>
						</div>
					:
						<Login 
							loggedIn = {props.loggedIn}
							setLoggedIn = {props.setLoggedIn}/>
			}
		</>
	);
};


export default Home;