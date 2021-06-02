import * as ACTION_TYPES from "../constants/action-type";


const initialState = {
  raidData: [],
  raidCalendar: {
    schedule: [],
    raidname: null,
    user: null,
    guildid: null,
  },
  userRaids: {
    raidid: [],
    raidname: [],
    raidtype: [],
    user: null
  },
  update: []
};

function raidReducer(state = initialState, action) {
  if(action.type == ACTION_TYPES.RAID_DATA_LOADED) {
    return Object.assign({}, state, {
      raidData: action.payload
    });
  }
  if(action.type == ACTION_TYPES.RAID_CALENDAR_LOADED) {
    return Object.assign({}, state, {
      raidCalendar: action.payload
    });
  }
  if(action.type == ACTION_TYPES.USER_RAID_DATA_LOADED) {
    return Object.assign({}, state, {
      userRaids: action.payload
    });
  }
  if(action.type == ACTION_TYPES.USER_RAID_ADDED) {
    return Object.assign({}, state, {
      userRaids: {
        raidid: state.userRaids.raidid.concat("1"),
        raidname: state.userRaids.raidname.concat("newraidname"),
        raidtype: state.userRaids.raidtype.concat("52"),
        user: state.userRaids.user
      }
    });
  }
  if(action.type == ACTION_TYPES.RAID_DATA_UPDATED) {
    console.log("UPDATE");
    console.log(action.payload);  
    return Object.assign({}, state, {
      update: state.update.concat(0)
    });
  }
  if(action.type == ACTION_TYPES.USER_RAID_DATA_FAILED) {
    return Object.assign({}, state, {
      userRaids: {
        raidid: [],
        raidname: [],
        user: null
      }
    });
  }
  if(action.type == ACTION_TYPES.API_ERRORED) {
    return Object.assign({}, state, {
      raidData: {title: "FAIL",id: "0"}
    });
  }
  return state;
};

export default raidReducer;
