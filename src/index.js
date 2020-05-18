import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import Search from "./search";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Route exact path="/" render={() => <App />} />
    <Route exact path="/search" render={() => <Search />} />
  </Router>,
  document.getElementById("root")
);
