import React, { useState, useEffect } from "react";

import { Link, useLocation, Redirect } from "react-router-dom";

import Login from "../login/login";


const RedirectTo = (props) =>
{
	let location = useLocation();
	let hashArr;
	console.log("home ran");

	// console.log(location);
	const [redirect, setRedirect] = useState(false);
	const [route, setRoute] = useState("/");

	useEffect(() =>
	{
		if(location.hash.includes("#!"))
		{
			hashArr = location.hash.split("#!");
			if(!hashArr[1])
			{
				hashArr[1] = "/";
			}
			setRedirect(true);
			setRoute(hashArr[1]);
		}
	});

	return(
		<>
			{
				redirect 
					?
						<Redirect  push to = {route === "/" || route === "/home" ? "/home" : route}/>
					:
						<Redirect to = "/home"/>
			}
		</>
	);
};


export default RedirectTo;