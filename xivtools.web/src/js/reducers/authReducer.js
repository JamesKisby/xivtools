import * as ACTION_TYPES from "../constants/action-type";


const initialState = {
  is_authenticated: false,
  profile: null,
  name: null
};

function authReducer(state = initialState, action) {
  if(action.type == ACTION_TYPES.LOGIN_AUTH) {
    return Object.assign({}, state, {
      is_authenticated: true
    });
  }
  if(action.type == ACTION_TYPES.USER_RAID_DATA_LOADED) {
    return Object.assign({}, state, {
      is_authenticated: true,
      name: action.payload.user
    });
  }
  if(action.type == ACTION_TYPES.LOGOUT_AUTH) {
    return Object.assign({}, state, {
      is_authenticated: false
    });
  }
  if(action.type == ACTION_TYPES.ADD_PROFILE) {
    return Object.assign({}, state, {
      profile: action.payload
    });
  }
  if(action.type == ACTION_TYPES.REMOVE_PROFILE) {
    return Object.assign({}, state, {
      profile: null
    });
  }
  return state;
};

export default authReducer;
