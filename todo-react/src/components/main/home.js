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
					// sort projects and keep only 5
					let sorted = sortByDate(data);
					setSortedProjects(projs.slice(0, 5))
					
				})
				.catch(err => console.log(err))
		}
	}, []);


	return(

		<>
			{
				props.loggedIn 
					?
						<div className = "section homeContainer" id = "homeContainer">
							<div className = "columns">
								<div className = "addProjectContainer has-background-light column">
									<p className = "is-size-4 mb-2">Hello!</p>
									<span className = "ml-2">
										<NavLink 
											className = "button mb-1 projectsButton"
											to = "/projects">
												Create a new project
										</NavLink>
									</span>
									<p className = "content ml-6">and start tracking tasks!</p>
								</div>
								<Stats projects = {projects}/>
							</div>
							<div className = "currentProjects has-background-light">
								<p className = "content is-size-5 is-bold">Recently Created Projects</p>
								<div className = "recentProjects pb-3">
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