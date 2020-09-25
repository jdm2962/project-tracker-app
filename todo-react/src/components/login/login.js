import React, { useEffect } from "react";

import "./login.css";


const Login = (props) =>
{

	useEffect(() =>
	{
		let title = document.getElementById("title");
		title.innerHTML = "Home";
	}, []);

	const login = () => 
	{
		props.setLoggedIn(true);
	};

	return(
		<div className = "loginContainer">
			<h1 className = "content is-size-1 is-bold">Login to start adding projects!</h1>

			<button 
				className = "button is-large is-success"
				onClick = {login}>
					Login
			</button>
		</div>
	);
};


export default Login;