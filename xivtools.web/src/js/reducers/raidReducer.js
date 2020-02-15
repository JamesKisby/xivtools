import * as ACTION_TYPES from "../constants/action-type";


const initialState = {
  raidData: [],
  userRaids: {
    raidid: [],
    raidname: [],
    user: null
  }
};

function raidReducer(state = initialState, action) {
  if(action.type == ACTION_TYPES.RAID_DATA_LOADED) {
    return Object.assign({}, state, {
      raidData: action.payload
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
        raidid: state.userRaids.raidid.concat("11111111111"),
        raidname: state.userRaids.raidname.concat("newraidname"),
        user: state.userRaids.user
      }
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
