import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/navBar/NavBar";
import Boards from "./Boards";

const WrapperStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .pages-container {
    flex: 1;
    width: 100%;
    overflow-x: none;
    overflow-y: auto;
  }
`;

const ProtectedRoutes = () => {
  return (
    <WrapperStyled>
      <Router>
        <NavBar />
        <div className="pages-container">
          <Switch>
            <Route path="/">
              <Boards />
            </Route>
          </Switch>
        </div>
      </Router>
    </WrapperStyled>
  );
};

export default ProtectedRoutes;
