import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Events from "./pages/Events";
import MyRegistrations from "./pages/MyRegistrations";
import CreateEvent from "./pages/CreateEvent";
import JoinEvent from "./pages/JoinEvent";
import Register from "./pages/Register";

import TopNav from "./components/TopNav";

export default function Routes() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" exact component={Home} />
        <Route path="/events" exact component={Events} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/joinevent" component={JoinEvent} />
        <Route path="/myregistrations" component={MyRegistrations} />
        <Route path="/createevent" component={CreateEvent} />
      </Switch>
    </BrowserRouter>
  );
}
