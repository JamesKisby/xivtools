import * as ACTION_TYPES from "../constants/action-type";


const initialState = {
  user_textChange: '',
  user_textSubmit: '',
  raidChange: [],
  open: true
};

function formReducer(state = initialState, action) {
  if(action.type == ACTION_TYPES.USER_INPUT_CHANGE) {
    return Object.assign({}, state, {
      user_textChange: action.payload
    });
  }
  if(action.type == ACTION_TYPES.USER_INPUT_SUBMIT) {
    return Object.assign({}, state, {
      user_textSubmit: action.payload
    });
  }
  if(action.type == ACTION_TYPES.USER_RAID_ADDED) {
    return Object.assign({}, state, {
      raidChange: state.raidChange.concat(1)
    });
  }
  if(action.type == ACTION_TYPES.USER_RAID_REMOVED) {
    return Object.assign({}, state, {
      raidChange: state.raidChange.concat(0)
    });
  }
  if(action.type == ACTION_TYPES.DRAWER_MOVED) {
    console.log("Drawer opened set", action.payload.val);
    return Object.assign({}, state, {
      open: action.payload.val
    });
  }
  return state;
};

export default formReducer;
