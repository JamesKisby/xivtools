import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRaidData, removeRaidTeam, addExistingRaidTeam } from "../actions/index";
import RaidTrackerInd from "./RaidTrackerInd";
import RaidInstructions from "./RaidInstructions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const RaidTracker = ({ match, location }) => {
  const classes = useStyles();
  const authSelector = useSelector(state => state.auth);
  const raidSelector = useSelector(state => state.raid);
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const loc = location.pathname.split("/")[3];
  const deleteRaid = () => {
    dispatch(removeRaidTeam({raidid: match.params.userid, user: user}));
  }

  const addRaid = () => {
    const raidValues = {raidid: loc,user: localStorage.getItem('user')};
    dispatch(addExistingRaidTeam({raidValues}));
  }
  useEffect(() => {
    dispatch(getRaidData({raidid: match.params.userid, user: user }));
  }, [match.params.userid]);
    console.log("RAID SELECTOR", raidSelector);
  return (
    <>
        {!raidSelector.raidData.raidfound ? (
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <Typography component="h1" variant="h3" color="inherit">
              ERROR - RAID DOES NOT EXIST
            </Typography>
            </Paper>
          </Grid>
          </Grid>
        ) : (
          <>
          {raidSelector.raidData.trackerpw ? (
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" color="inherit" noWrap>
                YOUR RAID ID: {raidSelector.raidData.trackerpw}
              </Typography>
            </Grid>
          ) : null}
          <Grid container spacing={2}>
          {!raidSelector.raidData.players ? (
            <>
            {raidSelector.raidData.trackerpw ? (
              <RaidInstructions userid={match.params.userid}/>
            ) : (
              <Grid item xs={12}>
                <Typography component="h1" variant="h5" color="inherit" noWrap>
                  No Data Yet...
                </Typography>
              </Grid>
            )}
            </>
          ) : (
            <>
              {raidSelector.raidData.players.map((el,ind) => (
                <RaidTrackerInd key={ind} name={el[0].playername} el={el}/>
              ))}
            </>
          )}
          </Grid>
          <Grid container spacing={2}>
          {authSelector.is_authenticated ? (
            <>
            {raidSelector.userRaids.raidid.includes(loc) ? (
              <Grid item xs={12} md={6} lg={3}>
                <Paper className={classes.paper}>
                  <Button variant="contained" color="primary" onClick={deleteRaid}>
                    Remove Raid from Tracking
                  </Button>
                </Paper>
              </Grid>
            ) : (
              <Grid item xs={12} md={6} lg={3}>
                <Paper className={classes.paper}>
                  <Button variant="contained" color="primary" onClick={addRaid}>
                    Add Raid to Tracking
                  </Button>
                </Paper>
              </Grid>
            )}
            </>
          ) : (
            <div></div>
          )}
          </Grid>
          </>
        )}
        </>
  );
}

export default RaidTracker;
