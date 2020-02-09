import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App";
import RaidTracker from "./js/components/RaidTracker";


render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/raid_tracker/:userid" component={RaidTracker} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
