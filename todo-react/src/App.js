import React from 'react';

import TodoContainer from "./components/todoContainer";
import Header from "./components/header";

function App() {
  return (
    <div className = "appContainer center-vertical">
      <Header />
      <TodoContainer />
    </div>
  );
}

export default App;
