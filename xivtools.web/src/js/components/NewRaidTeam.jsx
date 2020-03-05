import React, { useState } from "react";
import { Route } from "react-router-dom";
import { addRaidTeam } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    paddingTop: '5px',
  },
  form: {
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function RaidTracker(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.auth);
  const user = localStorage.getItem('user');
  const [value, setValue] = useState('52');
  const [newRaidValues, setNewRaidValues] = useState({raidname: "", raidtype: "52", user: user});
  const [searchRaidValues, setSearchRaidValues] = useState({raidid: ""});

  const handleChange = (event) => {
    setValue(event.target.value);
    setNewRaidValues({raidname: newRaidValues.raidname, raidtype: event.target.value, user: user});
  }

  const handleSubmitNewRaid = (event) => {
    event.preventDefault();
    console.log("dispatching", newRaidValues);
    dispatch(addRaidTeam({newRaidValues}));
    setNewRaidValues({raidname: "",raidtype: value, user: user});
  }

  const handleChangeNewRaid = (event) => {
    setNewRaidValues({ [event.target.id]: event.target.value, raidtype: value, user: user})
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
    <Grid container direction="column" spacing={2}>
      {selector.is_authenticated ? (
        <>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmitNewRaid}>
              <Typography component="h1" variant="h4" color="inherit">
                Create a new Raid Tracker
              </Typography>
              <TextField
                id="raidname"
                label="Search field"
                type="search"
                variant="outlined"
                onChange={handleChangeNewRaid}
                value={newRaidValues.raidname}/>
              <Button className={classes.button}type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <RadioGroup aria-label="raid" name="raid" value={value} onChange={handleChange}>
                <FormControlLabel value="52" control={<Radio />} label="5.2 Savage" />
                <FormControlLabel value="0" control={<Radio />} label="Other" />
              </RadioGroup>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmitSearchRaid}>
              <Typography component="h1" variant="h4" color="inherit">
                Search for an existing team
              </Typography>
              <TextField
                id="raidid"
                label="Search field"
                type="search"
                variant="outlined"
                onChange={handleChangeSearchRaid}
                value={searchRaidValues.raidid}/>
              <Button className={classes.button} type="submit" variant="contained" color="primary">
                Search
              </Button>
            </form>
          </Paper>
        </Grid>
        </>
      ) : (
        <>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <form className={classes.form}>
              <Typography component="h1" variant="h6" color="inherit">
                Sign in to Create a new Raid Tracker
              </Typography>
              <TextField
              disabled
                id="raidname"
                label="Search field"
                type="search"
                variant="outlined"/>
              <Button className={classes.button} disabled="true" type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmitSearchRaid}>
              <Typography component="h1" variant="h6" color="inherit">
                Search for an existing team
              </Typography>
              <TextField
                id="raidid"
                label="Search field"
                type="search"
                variant="outlined"
                onChange={handleChangeSearchRaid}
                value={searchRaidValues.raidid}/>
              <Button className={classes.button} type="submit" variant="contained" color="primary">
                Search
              </Button>
            </form>
          </Paper>
        </Grid>
        </>
      )}
    </Grid>
  );
}
