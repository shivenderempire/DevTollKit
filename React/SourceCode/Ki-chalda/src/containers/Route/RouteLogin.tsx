import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
 import Login from "../Login/LoginPage";
import Webportal from "../WebPortal/WebPortal"
import HomePage from '../HomePage/HomePage';
// import Testpage from '../Testpage';
const RouteLogin = () => {
  return (
    <Switch>
      <Route path="/HomePage" exact component={HomePage} />
      <Route path="/Webportal" component={Webportal} />
      {/* <Route path="/TestPage" component={Testpage} /> */}
      <Route path="/Login" component={Login} />
      <Route path="/" exact component={Login} />
      <Redirect from="/HomePage" to="/" />
    </Switch>
  );
};

export default RouteLogin;
