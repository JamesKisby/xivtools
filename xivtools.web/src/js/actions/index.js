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

export function updateRaidData(data) {
  return {
    type: ACTION_TYPES.UPDATE_RAID_DATA,
    data
  }
};

export function updateRaidSchedule(data) {
  return {
    type: ACTION_TYPES.UPDATE_RAID_SCHEDULE,
    data
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

export function deleteRaidRows(rows) {
  return {
    type: ACTION_TYPES.DELETE_RAID_ROWS,
    rows
  }
};

export function deleteCalendarRows(rows) {
  return {
    type: ACTION_TYPES.DELETE_CALENDAR_ROWS,
    rows
  }
};

export function getData() {
  return {
    type: ACTION_TYPES.DATA_REQUESTED
  }
};

export function getRaidData(raid) {
  return {
    type: ACTION_TYPES.RAID_DATA_REQUESTED,
    raid
  }
}

export function getRaidCalendar(raid) {
  return {
    type: ACTION_TYPES.RAID_CALENDAR_REQUESTED,
    raid
  }
}

export function getUser(user) {
  return {
    type: ACTION_TYPES.LOGIN_REQUESTED,
    user
  }
}

export function searchItems(search) {
  return {
    type: ACTION_TYPES.ITEM_SEARCH,
    search
  }
}

export function loginComplete(val) {
  return {
    type: ACTION_TYPES.LOGIN_LOCKED,
    val
  }
}

export function drawerOpen(val) {
  return {
    type: ACTION_TYPES.DRAWER,
    val
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
