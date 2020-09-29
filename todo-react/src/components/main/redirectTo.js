import React, { useState, useEffect } from "react";

import { useLocation, Redirect } from "react-router-dom";



const RedirectTo = (props) =>
{
	let location = useLocation();
	let hashArr;

	// console.log(location);
	const [redirect, setRedirect] = useState(false);
	const [route, setRoute] = useState(props.location.state ? props.location.state.redir :  "/");
	useEffect(() =>
	{
		if(location.hash.includes("#!"))
		{
			hashArr = location.hash.split("#!");
			if(hashArr[1] === "/" || hashArr[1] === "")
			{
				hashArr[1] = "/home";
			}
			setRoute(hashArr[1]);
		}
		else if(location.hash === "")
		{
			setRoute("/home");
		}
	}, [props.location.state, route, redirect]);

	// {
	// 	redirect 
	// 		?
	// 			<Redirect  push to = {`${route}`}/>
	// 		:
	// 			<Redirect to = {{pathname : "/", state : {redir : route}}}/>
	// }

	return(
		<>
			<Redirect to = {{pathname : route, state : {redir : route}}}/>
		</>
	);
};


export default RedirectTo;