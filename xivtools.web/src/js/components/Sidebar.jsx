import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsersRaids, drawerOpen } from "../actions/index";
import Divider from "@material-ui/core/Divider";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddBoxOutlined from '@material-ui/icons/AddBoxOutlined';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import back1 from "../../images/toolbar1.png";
import back2 from "../../images/toolbar2.png";
import back3 from "../../images/toolbar3.png";
import back4 from "../../images/toolbar4.png";

const images = [back1, back2, back3, back4];
const rnd = Math.floor(Math.random() * 4);
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  hideIcon: {
    display: 'none',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    background: `url(${images[rnd]})`,
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    }
  },
}));

export default function Sidebar(props) {
  const [open, setOpen] = useState(true);
  const openSelector = useSelector(state => state.form.open);
  const theme = useTheme();
  const classes = useStyles();
  const { container } = props;
  const selector = useSelector(state => state.raid.userRaids);
  const formSelector = useSelector(state => state.form.raidChange);
  const authSelector = useSelector(state => state.auth.login_complete);
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  const handleDrawerClose = () => {
    console.log("drawer close clicked");
    dispatch(drawerOpen(false));
  }


  useEffect(() => {
    if(authSelector){
      dispatch(getUsersRaids(user));
    }
  }, [user, formSelector, authSelector]);
  const handleClick = () => {
    setOpen(!open);
  };


  return (
      <Drawer
      classes={{
        paper: clsx(classes.drawerPaper, !openSelector && classes.drawerPaperClose),
      }}
        variant="permanent"
        open={openSelector}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Home
            </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClick}>
            <Box component="span" visibility={!openSelector ? "hidden" : "visible"}>
              <ListItemText primary="Raid Tracker" />
            </Box>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding dense>
              <ListItem style={{ paddingLeft: 36 }} button component={Link} to={`/raid_tracker/add_new_raid`}>
                <ListItemText>
                  <AddBoxOutlined />
                  <Box component="span" visibility={!openSelector ? "hidden" : "visible"}>
                    <Typography component="h1" variant="button" color="inherit" noWrap>
                      Add New Raid Team
                      </Typography>
                  </Box>
                </ListItemText>
              </ListItem>
              {"raidid" in selector && selector.raidid != null ? (
                selector.raidid.map((el, ind) => (
                  <ListItem key={el} style={{ paddingLeft: 36 }} button component={Link} to={`/raid_tracker/team/${el}`}>
                    <ListItemText>
                      <SupervisedUserCircleRoundedIcon />
                      <Box component="span" visibility={!openSelector ? "hidden" : "visible"}>
                        <Typography component="h1" variant="button" color="inherit" noWrap className={classes.title}>
                          {selector.raidname[ind]}
                        </Typography>
                      </Box>
                    </ListItemText>
                  </ListItem>
                ))) :
                null
              }
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
  );
}
