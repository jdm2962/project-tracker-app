import React, { useState, useEffect } from "react";
import "../../sass/home.scss";

const Stats = (props) =>
{
	const [projects, setProjects] = useState(0);
	const [tasks, setTasks] = useState(0);
	const [tasksCompleted, setTasksCompleted] = useState(0);

	useEffect(() =>
	{
		let numTasks = 0;
		let numTasksCompleted = 0;
		let projs = props.projects;
		// # of projects
		setProjects(projs.length);
		// calculate # of tasks and tasks completed
		if(projs.length > 0)
		{
			projs.forEach(project => 
			{	
				project.todos.forEach(todo =>
				{
					if(todo.isdone)
					{
						numTasksCompleted += 1;
					}
					else
					{
						numTasks += 1;
	 				}
				});
			});
		}

		setTasks(numTasks);
		setTasksCompleted(numTasksCompleted);
	}, [props.projects]);


	return(
		<div className = "stats has-background-light column" id = "stats">
			<p className = "content is-size-4 is-bold">Your stats</p>
			<p className = "content is-size-6">Projects</p>
			<div className = "statNumbers content is-size-5 is-bold">{projects}</div>
			<p className = "content is-size-6">Tasks</p>
			<div className = "statNumbers content is-size-5 is-bold">{tasks}</div>
			<p className = "content is-size-6">Tasks Completed</p>
			<div className = "statNumbers content is-size-5 is-bold">{tasksCompleted}</div>
		</div>
	);

};


export default Stats;