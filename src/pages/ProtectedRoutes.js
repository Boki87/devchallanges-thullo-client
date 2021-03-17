import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Boards from "./Boards";

const ProtectedRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/">
          <Boards />
        </Route>
      </Switch>
    </Router>
  );
};

export default ProtectedRoutes;
