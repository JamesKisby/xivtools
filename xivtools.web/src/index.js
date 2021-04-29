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
import Canvas from "./js/components/Canvas";
import ItemSearch from "./js/components/ItemSearch";
import LoginCallback from "./js/components/LoginCallback";
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#62727b',
      main: '#37474f',
      dark: '#102027',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffff6b',
      main: '#fdd835',
      dark: '#c6a700',
      contrastText: '#000',
    },
    type: 'dark',
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#1C2022',
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
          <MuiThemeProvider theme={theme}>
          <Route path="/oauth_callback" component={LoginCallback} />
          <Navbar />
          <Sidebar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="xl" className={classes.container}>

              <Route exact path="/" component={App} />
              <Route path="/raid_tracker/team/:userid" component={RaidTracker} />
              <Route exact path="/raid_tracker/add_new_raid" component={NewRaidTeam} />
              <Route exact path="/training/:raidname/:mechanic" component={Canvas} />
              <Route exact path="/search" component={ItemSearch} />
              <Route path="/login" component={Login} />
            </Container>
          </main>
          </MuiThemeProvider>
        </div>
      </Router>
    </Provider>
  );
}


render(
  <Index />,
  document.getElementById("root")
);
