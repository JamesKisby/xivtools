import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App";
import Sidebar from "./js/components/Sidebar";
import Navbar from "./js/components/Navbar";
import RaidTrackerHome from "./js/components/RaidTrackerHome";
import RaidTracker from "./js/components/RaidTracker";
import NewRaidTeam from "./js/components/NewRaidTeam";
import Login from "./js/components/Login";
import LoginCallback from "./js/components/LoginCallback";


render(
  <Provider store={store}>
    <Router>
      <div className="row">
        <div className="col-2 sidebar">
          <Sidebar />
        </div>
        <div className="col-10">
          <Navbar />
          <Route exact path="/" component={App} />
          <Route path="/raid_tracker" component={RaidTrackerHome} />
          <Route path="/raid_tracker/team/:userid" component={RaidTracker} />
          <Route exact path="/raid_tracker/add_new_raid" component={NewRaidTeam} />
          <Route path="/login" component={Login} />
          <Route path="/oauth_callback" component={LoginCallback} />
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
