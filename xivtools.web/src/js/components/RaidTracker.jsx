import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRaidData, removeRaidTeam, addExistingRaidTeam } from "../actions/index";
import "../../css/App.css";
import RaidTrackerInd from "./RaidTrackerInd";
import RaidInstructions from "./RaidInstructions";


const RaidTracker = ({ match, location }) => {
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
    dispatch(getRaidData(match.params.userid));
  }, [match.params.userid]);

  return (
    <div>
      {'error' in raidSelector.raidData && raidSelector.raidData.error === 'raid not found' ? (
        <div>
          <p>ERROR - RAID DOES NOT EXIST</p>
        </div>
      ) : (
        <div>
        {'error' in raidSelector.raidData ? (
          <RaidInstructions />
        ) : (
          <div>
            {raidSelector.raidData.map((el,ind) => (
              <div className="row">
                <RaidTrackerInd key={ind} name={el[0].playername} el={el}/>
              </div>
            ))}
          </div>
        )}
        {authSelector.is_authenticated ? (
          <div>
          {raidSelector.userRaids.raidid.includes(loc) ? (
            <div className="row">
              <button onClick={deleteRaid}>
                Remove raid from tracking
              </button>
            </div>
          ) : (
            <div className="row">
              <button onClick={addRaid}>
                Add raid to tracking
              </button>
            </div>
          )}
          </div>
        ) : (
          <div></div>
        )}
        </div>
      )}
    </div>
  );
}

export default RaidTracker;
