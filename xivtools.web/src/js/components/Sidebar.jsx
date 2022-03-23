    import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemSearch from "./ItemSearch";
import { getUsersRaids, drawerOpen, logoutSuccess } from "../actions/index";
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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddBoxOutlined from '@material-ui/icons/AddBoxOutlined';
import Popover from '@material-ui/core/Popover';
import Search from "@material-ui/icons/Search";
import Home from "@material-ui/icons/Home";
import FaceIcon from "@material-ui/icons/Face";
import ViewList from "@material-ui/icons/ViewList";
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
    backgroundColor: 'white',
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
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    }
  },
  icons: {
    color: 'black',
  },
  typo: {
    color: 'black',
  },
}));

export default function Sidebar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(true);
  const [openT, setOpenT] = useState(true);
  const openSelector = useSelector(state => state.form.open);
  const theme = useTheme();
  const classes = useStyles();
  const { container } = props;
  const selector = useSelector(state => state.raid.userRaids);
  const formSelector = useSelector(state => state.form.raidChange);
  const authSelector = useSelector(state => state.auth);
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  const handleSearchClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutSuccess());
    dispatch(getUsersRaids());
  };

  const handleDrawerClose = () => {
    console.log("drawer close clicked");
    dispatch(drawerOpen(false));
  }


  useEffect(() => {
    if(authSelector.login_complete){
      dispatch(getUsersRaids(user));
    }
  }, [user, formSelector, authSelector.login_complete]);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickT = () => {
    setOpenT(!openT);
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
            <ChevronLeftIcon className={classes.icons} />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Home className={classes.icons} />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h1" variant="h6" className={classes.typo} noWrap>
                Home
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleSearchClick}>
            <ListItemIcon>
              <Search className={classes.icons} />
            </ListItemIcon>
            <ListItemText>
              <Typography component="h1" variant="h6" className={classes.typo} noWrap>
                Search
              </Typography>
            </ListItemText>
          </ListItem>
          <Popover
            id={id}
            open={openPop}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <ItemSearch onClose={handleClose}/>
          </Popover>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <ViewList className={classes.icons}/>
            </ListItemIcon>
            <ListItemText>
              <Typography component="h1" variant="h6" className={classes.typo} noWrap>
                Raid Tracker
              </Typography>
            </ListItemText>
            {open ? <ExpandLess className={classes.icons} /> : <ExpandMore className={classes.icons} />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItem style={{ paddingLeft: 36 }} button component={Link} to={`/raid_tracker/add_new_raid`}>
                <ListItemIcon>
                  <AddBoxOutlined className={classes.icons} />
                </ListItemIcon>
                <ListItemText>
                  <Typography component="h1" variant="h6" className={classes.typo} noWrap>
                    Add New Raid
                  </Typography>
                </ListItemText>
              </ListItem>
              {"raidid" in selector && selector.raidid != null ? (
                selector.raidid.map((el, ind) => (
                  <ListItem key={el} style={{ paddingLeft: 36 }} button component={Link} to={`/raid_tracker/team/${el}`}>
                    <ListItemIcon>
                      <SupervisedUserCircleRoundedIcon className={classes.icons} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography component="h1" variant="h6" className={classes.typo} noWrap>
                        {selector.raidname[ind]}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))) :
                null
              }
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClickT}>
            <ListItemIcon>
              <ViewList className={classes.icons}/>
            </ListItemIcon>
            <ListItemText>
              <Typography component="h1" variant="h6" className={classes.typo} noWrap>
                Training
              </Typography>
            </ListItemText>
            {openT ? <ExpandLess className={classes.icons} /> : <ExpandMore className={classes.icons} />}
          </ListItem>
          <Collapse in={openT} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItem style={{ paddingLeft: 36 }} button component={Link} to={`/games/ucob/quickmarch`}>
                <ListItemIcon>
                    <SupervisedUserCircleRoundedIcon className={classes.icons} />
                </ListItemIcon>
                <ListItemText>
                  <Typography component="h1" variant="h6" className={classes.typo} noWrap>
                    UCOB
                  </Typography>
                  <Typography component="h1" variant="h6" className={classes.typo} noWrap>
                    Quickmarch
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem style={{ paddingLeft: 36 }} button component={Link} to={`/games/ucob/heavensfall`}>
                <ListItemIcon>
                    <SupervisedUserCircleRoundedIcon className={classes.icons} />
                </ListItemIcon>
                <ListItemText>
                  <Typography component="h1" variant="h6" className={classes.typo} noWrap>
                    UCOB
                  </Typography>
                  <Typography component="h1" variant="h6" className={classes.typo} noWrap>
                    Heavensfall
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
        <Hidden mdUp>
          <List>
            {authSelector.is_authenticated ? (
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <FaceIcon className={classes.icons} />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItem>
            ) : (
              <ListItem button component={Link} to="/login">
                <ListItemIcon>
                  <FaceIcon className={classes.icons} />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItem>
            )}
          </List>
        </Hidden>
        <Divider />
      </Drawer>
  );
}
