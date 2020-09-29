import React, { useState } from 'react';
import {
	Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import history from './components/main/history';

import Header from "./components/main/header";
import Home from "./components/main/home";
import Footer from "./components/main/footer";
import RedirectTo from "./components/main/redirectTo";
import Login from "./components/login/login";
import Projects from "./components/projects/projects";
import ProjectTodos from "./components/projects/projectTodos";



function App() 
{
	// const [loggedIn, setLoggedIn] = useState(false);
	const [loggedIn, setLoggedIn] = useState(true);
	const [prod, setProjd] = useState(true);	// set true for production(workaround for aws s3 redirection)

  return (
  	<>
		<Router history = {history}>
			<Header 
				loggedIn = {loggedIn}
				setLoggedIn = {setLoggedIn}/>

			<Switch>
				<Route path = "/projects">
					{loggedIn ? <Projects /> : <Redirect  to = "/"/> }
				</Route>
				<Route path = "/project/:project:projectId" render = {props => loggedIn ? <ProjectTodos {...props}/> : <Redirect  to = "/home"/>}>
				</Route>
				<Route path = "/login">
					<Login />
				</Route>
				<Route path = "/home">
					<Home 
						loggedIn = {loggedIn}
						setLoggedIn = {setLoggedIn}/>
				</Route>

				{
					prod
					?
						<Route path = "/" render = {props => <RedirectTo {...props}/>} />
					:
						<Route path = "/">
							<Home 
								loggedIn = {loggedIn}
								setLoggedIn = {setLoggedIn}/>
						</Route>
				}

				
			</Switch>

			<Footer />
		</Router>

	</>
  );
}

export default App;
