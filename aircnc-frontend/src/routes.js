import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import Dashboard from "./pages/Dashboard";
import NewSpot from "./pages/Dashboard/New";
import Settings from "./pages/Dashboard/Settings";
import UpdateSpot from "./pages/Dashboard/Update";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/Dashboard/New" component={NewSpot} />
        <Route exact path="/Dashboard/Update" component={UpdateSpot} />
        <Route exact path="/Dashboard/Settings" component={Settings} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
