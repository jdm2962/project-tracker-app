import React from "react";

import { Link, useLocation, Redirect } from "react-router-dom";


const Home = (props) =>
{
	let location = useLocation();
	let hashArr;
	let redirect = false;
	console.log(location);
	if(location.hash.includes("#!"))
	{
		hashArr = location.hash.split("#!");
		redirect = true;
	}

	return(
		<div>
		{
			redirect 
				?
					<Redirect to = {hashArr[1]}/>
				:
					<div>
						<h1>Welcome!</h1>
						<p>Create a new project!</p>

						{/*<Link to = "/login">Login</Link>
						<Link to = "/signup">Sign up!</Link>*/}
					</div>
		}
		</div>
	);
};


export default Home;