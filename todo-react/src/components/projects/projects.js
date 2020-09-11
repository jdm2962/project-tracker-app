import React, { useState } from "react";


const Projects = () =>
{
	const proj = 
	[
		{
			projectId : "1",
			projectName : "project functionaliy",
			userId : "123abc",
			dateCreated : "",
			isDone : "true/false",
			todos : 
			[
				{
					todoid : "123",
					todo : "something to do",
					isDone : "false",
					dateCreated : "date"
				},
				{
					todoid : "124",
					todo : "something else to do",
					isDone : "true",
					dateCreated : "date"
				},
			],
		}, 
	];
	const [projects, setProjects] = useState([]);

	return(
		<div>
			<h1>Projects Page</h1>
			{proj.map(project => {
				console.log(project);
				return <button key = {project.projectId}>{project.projectName}</button>
			})}
		</div>
	);
};


export default Projects;