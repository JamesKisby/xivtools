import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App";
import Sidebar from "./js/components/Sidebar";
import Navbar from "./js/components/Navbar";
import RaidTracker from "./js/components/RaidTracker";
import NewRaidTeam from "./js/components/NewRaidTeam";
import Login from "./js/components/Login";
import LoginCallback from "./js/components/LoginCallback";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100hv',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

function Index() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Route path="/oauth_callback" component={LoginCallback} />
          <Navbar />
          <Sidebar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="xl" className={classes.container}>

              <Route exact path="/" component={App} />
              <Route path="/raid_tracker/team/:userid" component={RaidTracker} />
              <Route exact path="/raid_tracker/add_new_raid" component={NewRaidTeam} />
              <Route path="/login" component={Login} />
            </Container>
          </main>
        </div>
      </Router>
    </Provider>
  );
}


render(
  <Index />,
  document.getElementById("root")
);
