import React from "react";

import { Link } from "react-router-dom";


const Home = () =>
{
	return(
		<div>
			<h1>Homepage</h1>
			<Link to = "/login">Login</Link>
			<Link to = "/signup">Sign up!</Link>
		</div>
	);
};


export default Home;