import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigate, Home, Sidebar } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigate />
        <Sidebar />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/details" exact component={() => <Home />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
