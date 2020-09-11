import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import TodoContainer from "./components/todoCore/todoContainer";
import Header from "./components/todoCore/header";
import Home from "./components/todoCore/home";
import TodoPage from "./components/todoCore/todoPage";
import Login from "./components/login/login";
import SignUp from "./components/login/signup";
import Projects from "./components/projects/projects";



function App() {
  return (
  	<Router>
  		<span>
  			<Link to = "/">Home</Link>
  			<Link to = "/todos">Todos</Link>
  			<Link to = "/projects">Projects</Link>
  		</span>

  		<Switch>
  			<Route>
  				<Projects />
  			</Route>
  			<Route path = "/todos">
  				<TodoPage />
  			</Route>
  			<Route path = "/login">
  				<Login />
  			</Route>
  			<Route path = "/signup">
  				<SignUp />
  			</Route>
  			<Route path = "/">
  				<Home />
  			</Route>
  		</Switch>
  	</Router>
  	
  );
}

export default App;
