import React, { useState } from "react";
import { Route } from "react-router-dom";
import { addRaidTeam } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function RaidTracker(props) {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.auth);
  const user = localStorage.getItem('user');
  const [newRaidValues, setNewRaidValues] = useState({raidname: "",user: user});
  const [searchRaidValues, setSearchRaidValues] = useState({raidid: ""});

  const handleSubmitNewRaid = (event) => {
    event.preventDefault();
    dispatch(addRaidTeam({newRaidValues}));
    setNewRaidValues({raidname: "", user: user});
  }

  const handleChangeNewRaid = (event) => {
    setNewRaidValues({ [event.target.id]: event.target.value, user: user})
  }

  const handleSubmitSearchRaid = (event) => {
    event.preventDefault();
    props.history.push( `/raid_tracker/team/${searchRaidValues.raidid}`);
    setSearchRaidValues({raidid: ""});
  }

  const handleChangeSearchRaid = (event) => {
    setSearchRaidValues({ [event.target.id]: event.target.value})
  }

  return (
    <div>
      {selector.is_authenticated ? (
        <div>
        <p>ADD NEW TEAM</p>
        <form onSubmit={handleSubmitNewRaid}>
          <div className="form-group">
            <label htmlFor="title">Add Raid</label>
            <input
              type="text"
              id="raidname"
              onChange={handleChangeNewRaid}
              className="form-control"
              value={newRaidValues.raidname}
            />
          </div>
          <button type="submit" className="btn btn-primary">SAVE</button>
        </form>
        <p>SEARCH FOR AN EXISTING TEAM</p>
        <form onSubmit={handleSubmitSearchRaid}>
          <div className="form-group">
            <label htmlFor="title">Search Raids</label>
            <input
              type="text"
              id="raidid"
              onChange={handleChangeSearchRaid}
              className="form-control"
              value={searchRaidValues.raidid}
            />
          </div>
          <button type="submit" className="btn btn-primary">SAVE</button>
        </form>
        </div>
      ) : (
        <div>
          <p>Login to add a new Raid Team or enter a Raid ID to view an existing Raid.</p>
          <form onSubmit={handleSubmitSearchRaid}>
            <div className="form-group">
              <label htmlFor="title">Search Raids</label>
              <input
                type="text"
                id="raidid"
                onChange={handleChangeSearchRaid}
                className="form-control"
                value={searchRaidValues.raidid}
              />
            </div>
            <button type="submit" className="btn btn-primary">SAVE</button>
          </form>
        </div>
      )}
    </div>
  );
}
