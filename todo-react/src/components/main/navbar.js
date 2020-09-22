import React from "react";
import { NavLink } from "react-router-dom";

import "../../sass/header.scss";

const NavBar = () =>
{

	const activate = () =>
	{
		const navMenu = document.querySelector(".navbar-burger");
		const hamburger = document.querySelector("#navbar");

		navMenu.classList.toggle("is-active");
		hamburger.classList.toggle("is-active");
	
	};
	
	return(
		<>
			<nav 
				className="navbar is-link" 
				role="navigation" 
				aria-label="main navigation">
				
				<div className="navbar-brand">
				    <a 
				    	role="button" 
				    	className="navbar-burger burger" 
				    	aria-label="menu" 
				    	aria-expanded="false" 
				    	data-target="navbar" 
				    	onClick = {activate}>
					    	<span aria-hidden="true"></span>
					    	<span aria-hidden="true"></span>
					    	<span aria-hidden="true"></span>
				    </a>
				</div>
				<div className = "navbar-menu" id = "navbar">
					<div className = "navbar-end">
						<div className = "linkContainer">
							<NavLink 
								to = "/" 
								className = "navbarItem" 
								exact activeClassName = "isActive">
									Home
							</NavLink>
						</div>
						<div className = "linkContainer">
							<NavLink 
								to = "/projects"
								id = "navbar-item"
								className = "navbarItem" 
								exact activeClassName = "isActive">
									Projects
							</NavLink>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
};


export default NavBar;