import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App";
import Sidebar from "./js/components/Sidebar";
import RaidTrackerHome from "./js/components/RaidTrackerHome";


render(
  <Provider store={store}>
    <Router>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <Route exact path="/" component={App} />
          <Route path="/raid_tracker" component={RaidTrackerHome} />
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
