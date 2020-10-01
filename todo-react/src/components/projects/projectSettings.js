import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom"; 

import {convertToSpaces} from "../../helpers";

const ProjectSettings = (props) =>
{
	let project = props.projectName;
	const inputRef = useRef();
	const [isClicked, setIsClicked] = useState(false);
	const [textValue, setTextValue] = useState("");
	const [errorIsVisible, setErrorIsVisible] = useState(false);
	const [redirect, setRedirect] = useState(false);



	const changeText = (event) =>
	{
		if(event.target.value !== "")
		{
			setErrorIsVisible(false);
		}

		setTextValue(event.target.value);
	};

	const showInput = () =>
	{
		setIsClicked(!isClicked);
	};

	const closeInput = () =>
	{
		setIsClicked(!isClicked);
		if(errorIsVisible)
		{
			setErrorIsVisible(false);
		}
	};

	const updateProject = () =>
	{
		if(textValue !== "")
		{
			// console.log(textValue);
			let updateProjectName = props.updateProjectName;
			updateProjectName(textValue);
			setIsClicked(!isClicked);
		}
		else
		{
			setErrorIsVisible(true);
			inputRef.current.focus();
			return;
		}
	};

	const closeProjectSettings = () =>
	{
		props.setSettingsIsVisible(false);
		setIsClicked(false);
	};

	const submitChanges = (event) =>
	{
		if(event.keyCode === 13 || event.which === 13)
		{
			updateProject();
		}
	};

	const deleteProject = () =>
	{
		// alert verifiying decision
		let answer = prompt("This will permenantly delete your project. \n\nType 'delete' to confirm.", "");
		let currentProjects = JSON.parse(localStorage.getItem("projects"));
		let updatedProjects = [...currentProjects];
		let projectToDelete;

		if(answer === "delete")
		{
			console.log("okay deleting");
			currentProjects.forEach((proj, index) => 
			{
				if(proj.project === project)
				{
					projectToDelete = {...proj};
					updatedProjects.splice(index, 1);
					// set local storage
					localStorage.setItem("projects", JSON.stringify(updatedProjects));
					// update db
					const options = 
					{
						method : "DELETE",
						body : JSON.stringify(projectToDelete)
					};

					fetch("https://hmsjtztwr8.execute-api.us-east-1.amazonaws.com/test1/project", options)
						.then(res => res.json())
						.then(data => 
						{
							console.log(data);
							setRedirect(true);

						})
						.catch(err => console.log(err))
				}
			});

		}
		else
		{
			return;
		}

		// update local storage


		// update db

		// redirect back to projects page
	};

	useEffect(() =>
	{
		if(project)
		{
			setTextValue(convertToSpaces(project));
		}

		if(isClicked)
		{
			inputRef.current.focus();
		}

		if(isClicked && props.settingsIsVisible)
		{
			window.addEventListener("keyup", (event) => 
			{
				if(event.keyCode === 27 || event.which === 27)
				{
					setIsClicked(false);
				}
			});
		}
	}, [project, isClicked]);

	if(redirect)
	{
		return <Redirect to = "/projects"/>
	}
	else
	{
		return(

			props.settingsIsVisible &&
			<div className = "box" id = "projectSettings">
				<div id = "exitProjectSettings">
					<button 
						className = "button"
						onClick = {closeProjectSettings}>
						<span className = "icon">
							<i className="fas fa-times exit"></i>
						</span>
					</button>
				</div>
				<h3 
					className = "content">
						Settings
				</h3>

				{
					isClicked
					?
						<div>
							<span>
								<button 
									className = "button mr-2"
									onClick = {updateProject}>
										<span className = "icon">
											<i className="fas fa-check check"></i>
										</span>
								</button>
								<button className = "button"
										onClick = {closeInput}>
										<span className = "icon">
											<i className="fas fa-times exit"></i>	
										</span>
								</button>
							</span>
							{
								errorIsVisible
								&&
									<span 
										className = "has-text-danger content is-size-7 ml-3 mt-3 is-inline-block">
												Project name must contain a value.
									</span>
							}
							<input 
								ref = {inputRef}
								autoFocus = {true}
								className = "input"
								onChange = {changeText}
								onKeyUp = {submitChanges}
								value = {textValue}/>
						</div>
					:
						<React.Fragment>
							<button
								className = "button"
								onClick = {showInput}>
									Edit Project Name
							</button>

							<button
								className = "button"
								onClick = {deleteProject}>
									Delete Project
							</button>
						</React.Fragment>
				}

			</div>
			
		);
	}
};


export default ProjectSettings;