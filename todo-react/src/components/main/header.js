import React from "react";
import { NavLink } from "react-router-dom";

import "../../sass/header.scss";

import NavBar from "../main/navbar";

class Header extends React.Component
{

	render()
	{
		return(

			<section className="hero is-bold">
				<div className="hero-body" id = "hero-body">
					<div className="container is-flex">
						<h1 className="heroTitle">
							<NavLink
								to = "/home"
								className = "heroNavTitle">
									<span className = "icon mr-3">
										<i className="fas fa-tasks"></i>
									</span>
						        	Project Tracker
					        </NavLink>
				    	</h1>
						<NavBar />
					</div>
				  </div>
			</section>
		);
	}
}

export default Header;