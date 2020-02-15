import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsersRaids } from "../actions/index";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddBoxOutlined from '@material-ui/icons/AddBoxOutlined';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';


export default function Sidebar({ match }) {
  const [open, setOpen] = useState(false);
  const selector = useSelector(state => state.raid.userRaids);
  const formSelector = useSelector(state => state.form.raidChange);
  const user = localStorage.getItem('user')
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersRaids(user));
  }, [user, formSelector]);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
    <h1>XIV TOOLS</h1>
    <List disablePadding dense>
      <ListItem button component={Link} to="/">
        <ListItemText>Home</ListItemText>
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Raid Tracker" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding dense>
          <ListItem style={{ paddingLeft: 36 }} button component={Link} to={`/raid_tracker/add_new_raid`}>
            <ListItemText>
              <AddBoxOutlined />
              <span className="sidebar-subitem-text">
                  Add new Raid Team
              </span>
            </ListItemText>
          </ListItem>
          {"raidid" in selector && selector.raidid != null ? (
              selector.raidid.map((el, ind) => (
                <ListItem key={el} style={{ paddingLeft: 36 }} button component={Link} to={`/raid_tracker/team/${el}`}>
                  <ListItemText>
                    <SupervisedUserCircleRoundedIcon />
                    <span className="sidebar-subitem-text">
                      {selector.raidname[ind]}
                    </span>
                  </ListItemText>
                </ListItem>
              ))) : null}
        </List>
      </Collapse>
    </List>
    </div>
  );
}
