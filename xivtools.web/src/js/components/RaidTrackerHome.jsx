import React from "react";
import { Route, Switch } from "react-router-dom";
import RaidTracker from "./RaidTracker";
import NewRaidTeam from "./NewRaidTeam";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export default function RaidTrackerHome({ match }) {

  return (
    <div id="menu" className="row">
      <div className="col-12">
        <h1>RAID TRACKER</h1>
        <p>Your raid Teams:</p>
      </div>
      <div className="col-12">
        <Route
          path="/raid_tracker/team/:userid"
          render={(props) => <RaidTracker {...props} />}
        />
        <Route path={`${match.url}/add_new_raid`} component={NewRaidTeam} />
      </div>
    </div>
  );
}
