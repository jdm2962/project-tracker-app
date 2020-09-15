import React from "react";
import { NavLink } from "react-router-dom";

import "./main.css";

import NavBar from "../main/navbar";

class Header extends React.Component
{

	render()
	{
		return(

			<section className="hero is-primary is-bold">
				<div className="hero-body" id = "hero-body">
					<div className="container">
						<h1 className="title">
							<NavLink
								to = "/home"
								className = "has-text-white">
									<span className = "icon mr-3">
										<i class="fas fa-tasks"></i>
									</span>
						        	Project Tracker
					        </NavLink>
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