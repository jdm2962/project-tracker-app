import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import Header from "./components/todoCore/header";
import Home from "./components/todoCore/home";
import TodoContainer from "./components/todoCore/todoContainer";
import Login from "./components/login/login";
import SignUp from "./components/login/signup";
import Projects from "./components/projects/projects";



function App() {
  return (
  	<Router>
  		<Header />

  		<Switch>
  			<Route path = "/projects">
  				<Projects />
  			</Route>
  			<Route path = "/todos">
  				<TodoContainer />
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
