import React, { useState } from "react";


const ToggleProjectButton = (props) =>
{

	const [cancelVisible, setCancelVisible] = useState(false);

	const isHidden = props.isHidden;
	const setIsHidden = props.setIsHidden;

	const toggleAddProject = () =>
	{
		setIsHidden(!isHidden);
		setCancelVisible(!cancelVisible);
	};

	const toggleCancelButton = () =>
	{
		setIsHidden(!isHidden);
		setCancelVisible(!cancelVisible);
	};


	return(
		<span className = "mb-2">
			{
				cancelVisible 
				?
					<button 
						className = "button is-danger mb-4"
						id = "projectCancel"
						onClick = {toggleCancelButton}>
							Cancel
					</button>
				:
					<button 
						className = "button is-link"
						onClick = {toggleAddProject}>
							Add a Project
					</button>
			}
		</span>
	);
};


export default ToggleProjectButton;



