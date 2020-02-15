import * as ACTION_TYPES from "../constants/action-type";

export function addProfile(profile) {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile
  }
};

export function addRaidTeam(team) {
  return {
    type: ACTION_TYPES.ADD_RAID_TEAM,
    team
  }
};

export function addExistingRaidTeam(team) {
  return {
    type: ACTION_TYPES.ADD_EXISTING_RAID_TEAM,
    team
  }
}

export function removeRaidTeam(team) {
  return {
    type: ACTION_TYPES.REMOVE_RAID_TEAM,
    team
  }
};

export function getData() {
  return {
    type: ACTION_TYPES.DATA_REQUESTED
  }
};

export function getRaidData(userid) {
  return {
    type: ACTION_TYPES.RAID_DATA_REQUESTED,
    userid
  }
}

export function getUser(user) {
  return {
    type: ACTION_TYPES.LOGIN_REQUESTED,
    user
  }
}

export function getUsersRaids(raid) {
  return {
    type: ACTION_TYPES.USER_RAID_REQUESTED,
    raid
  }
}

export function userInputSubmit(text) {
  return {
    type: ACTION_TYPES.USER_INPUT_SUBMIT,
    text
  }
};

export function userInputChange(text) {
  return {
    type: ACTION_TYPES.USER_INPUT_CHANGE,
    text
  }
};

export function loginSuccess() {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS
  }
};

export function logoutSuccess() {
  return {
    type: ACTION_TYPES.LOGOUT_SUCCESS
  }
};

export function loginFailure() {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  }
};
