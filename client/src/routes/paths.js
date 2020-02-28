import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../components/login";
import AdminMaster from "../components/master/admin.master";

class Paths extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signin" component={LoginPage} />

          <Route exact path="/dashboard" component={AdminMaster} />
        </Switch>
      </div>
    );
  }
}
export default Paths;
