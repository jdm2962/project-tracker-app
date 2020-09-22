import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";

import Header from "./components/main/header";
import Footer from "./components/main/footer";
import Home from "./components/main/home";
import TodoContainer from "./components/todoCore/todoContainer";
import Login from "./components/login/login";
import SignUp from "./components/login/signup";
import Projects from "./components/projects/projects";
import ProjectTodos from "./components/projects/projectTodos";



function App() {
  return (
	<Router>
		<Header />

		<Switch>
			<Route path = "/projects">
				<Projects />
			</Route>
			<Route path = "/project/:project" render = {props => <ProjectTodos {...props} />}>
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

		<Footer />
	</Router>
  );
}

export default App;
