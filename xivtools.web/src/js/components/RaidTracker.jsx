import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRaidData } from "../actions/index";
import "../../css/App.css";
import RaidTrackerInd from "./RaidTrackerInd";


const RaidTracker = (props) => {
  const selector = useSelector(state => state.raidData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRaidData(props.match.params.userid));
  }, [props.match.params.userid]);

  return (
    <div>
          {selector.map((el,indd) => (
            <RaidTrackerInd key={indd} name={el[0].playername} el={el}/>
          ))}

    </div>
  );
}

export default RaidTracker;
