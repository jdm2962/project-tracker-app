import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () =>
{

	const activate = () =>
	{
		const navMenu = document.querySelector(".navbar-burger");
		const hamburger = document.querySelector("#todoNavbar");

		navMenu.classList.toggle("is-active");
		hamburger.classList.toggle("is-active");
	
	};
	
	return(
		<>
			<nav className="navbar is-link" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
				    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="todoNavbar" onClick = {activate}>
				    	<span aria-hidden="true"></span>
				    	<span aria-hidden="true"></span>
				    	<span aria-hidden="true"></span>
				    </a>
				</div>
				<div className = "navbar-menu" id = "todoNavbar">
					<div className = "navbar-start">
						<NavLink to = "/" id = "navbar-item" className = "navbar-item" exact activeClassName = "is-active">Home</NavLink>
						<NavLink to = "/projects"  id = "navbar-item" className = "navbar-item" activeClassName = "is-active">Projects</NavLink>
						<NavLink to = "/Todos"  id = "navbar-item" className = "navbar-item" activeClassName = "is-active">Todos</NavLink>
					</div>
				</div>
			</nav>
		</>
	)
};


export default NavBar;