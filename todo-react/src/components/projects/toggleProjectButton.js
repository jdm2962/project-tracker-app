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
						className = "button is-danger"
						onClick = {toggleCancelButton}>
							Cancel
					</button>
				:
					<button 
						className = "button is-primary"
						onClick = {toggleAddProject}>
							Add a Project
					</button>
			}
		</span>
	);
};


export default ToggleProjectButton;



