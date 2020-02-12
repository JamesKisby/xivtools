import React, { useState } from "react";
import { Link } from "react-router-dom";
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
          <ListItem style={{ paddingLeft: 36 }} button component={Link} to={`/raid_tracker/team/123456789`}>
            <ListItemText>
              <SupervisedUserCircleRoundedIcon />
              <span className="sidebar-subitem-text">
                First Raiding
              </span>
            </ListItemText>
          </ListItem>
          <ListItem style={{ paddingLeft: 36 }} button component={Link} to={`/raid_tracker/team/987654321`}>
            <ListItemText>
              <SupervisedUserCircleRoundedIcon />
              <span className="sidebar-subitem-text">
                First Raiding
              </span>
            </ListItemText>
          </ListItem>
        </List>
      </Collapse>
    </List>
    </div>
  );
}
