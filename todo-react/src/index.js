import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// bulma
import 'bulma/css/bulma.css';
// css
import "./css/index.css";
import "./css/projects.css";
import "./css/todos.css";
import "./css/login.css";
// sass
import "./sass/home.scss";
import "./sass/header.scss";
import "./sass/footer.scss";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
