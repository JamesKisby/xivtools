import React, { useState } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess, getUsersRaids, drawerOpen } from "../actions/index";
import { Link } from "react-router-dom";
import Logo from "../../images/xivtools-logo-m.png";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: '#252628',
    paddingRight: 24,
  },
  appbar: {
    backgroundColor: '#252628',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const selector = useSelector(state => state.auth);
  const openSelector = useSelector(state => state.form.open);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    console.log("drawer open clicked");
    dispatch(drawerOpen(true));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutSuccess());
    dispatch(getUsersRaids());
  };

  return (
    <AppBar position="absolute" className={clsx(classes.appbar, openSelector && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, openSelector && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <img src={Logo} className="main-logo"/>
        <Box className={classes.title} component="span" display={{xs: 'none', sm: 'none', md: 'block'}}>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            XIVTOOLS
          </Typography>
        </Box>
        {selector.is_authenticated ? (
          <>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {selector.name}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Sign Out
            </Button>
          </>
        ) : (
          <Link to="/login">
            <Button variant="contained" color="secondary">
              Sign in
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
