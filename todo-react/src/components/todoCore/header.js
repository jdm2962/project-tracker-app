import React from "react";

import NavBar from "../projects/navbar";

class Header extends React.Component
{

	render()
	{
		return(

			<section className="hero is-primary is-bold">
				<div className="hero-body" id = "hero-body">
					<div className="container">
						<h1 className="title">
				        	Project Tracker
				    	</h1>
					</div>
				  </div>
				<div className = "hero-foot">
					<NavBar />
				</div>
			</section>
		);
	}
}

export default Header;