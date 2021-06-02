import "regenerator-runtime/runtime";
import { takeEvery, call, put, fork, all } from "redux-saga/effects";
import * as actions from "../constants/action-type";
import { api } from "../utils/auth";


//export default function* watcherSaga() {
//  yield takeEvery(actions.DATA_REQUESTED, workerSaga);
//}

function* workerSaga() {
  try {
    const payload = yield call(getData);
    if(payload) {
      yield put({type: actions.DATA_LOADED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.API_ERRORED, payload: e})
  }
}

function getData() {
  return fetch(api + "/monsters")
    .then(response => response.json());
}

function getRaidData(raid) {
  if(!raid.user) raid.user = "?/code=";
  return fetch(api + "/raid/" + String(raid.user) + "&id=" + String(raid.raidid))
    .then(response => response.json());
}

function getRaidCalendar(raid) {
  if(!raid.user) raid.user = "?/code=";
  return fetch(api + "/raid/getSchedule" + String(raid.user) + "&raidid=" + String(raid.raidid))
    .then(response => response.json());
}

function deleteRaidRows(raid) {
  return fetch(api + "/raid/removeRows", {
    method: 'post',
    body: JSON.stringify(raid)
  }).then(response => response.json());
}

function deleteRaidCalendarRows(raid) {
  return fetch(api + "/raid/removeCalendarRows", {
    method: 'post',
    body: JSON.stringify(raid)
  }).then(response => response.json());
}

function updateRaidData(raid) {
  console.log("RAID", raid);
  console.log("RAID string", JSON.stringify(raid));
  return fetch(api + "/raid/tracker", {
    method: 'post',
    body: JSON.stringify(raid)
  }).then(response => response.json());
}

function updateRaidSchedule(raid) {
  console.log("RAID", raid);
  console.log("RAID string", JSON.stringify(raid));
  return fetch(api + "/raid/addToSchedule", {
    method: 'post',
    body: JSON.stringify(raid)
  }).then(response => response.json());
}

function getUsersRaids(raid) {
  if(raid) {
    return fetch(api + "/whoami/" + String(raid))
      .then(response => response.json());
  } else {
    return null;
  }

}

function addRaidTeam(raid) {
  return fetch(api + "/raid/add/" + String(raid.user) + "&name=" + String(raid.raidname) + "&type=" + String(raid.raidtype))
    .then(response => response.json());
}

function addExistingRaidTeam(raid) {
  return fetch(api + "/raid/addexisting/" + String(raid.user) + "&raidid=" + String(raid.raidid))
    .then(response => response.json());
}

function removeRaidTeam(raid) {
  return fetch(api + "/raid/remove/" + String(raid.user) + "&raidid=" + String(raid.raidid) + "&name=" + String(raid.raidname))
    .then(response => response.json());
}

function searchItems(searchValues) {
  console.log("searchValues", searchValues);
  return fetch(api + "/items/search" + "?text=" + String(searchValues.search) + "&page=" + String(searchValues.page))
    .then(response => response.json());
}

function* LoadRaid(params) {
  try {
    const payload = yield call(getRaidData, params.raid);
    if(payload) {
      yield put({type: actions.RAID_DATA_LOADED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.API_ERRORED, payload: e})
  }
}

function* LoadCalendar(params) {
  try {
    const payload = yield call(getRaidCalendar, params.raid);
    if(payload) {
      yield put({type: actions.RAID_CALENDAR_LOADED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.API_ERRORED, payload: e})
  }
}

function* UpdateRaids(params) {
  try {
    const payload = yield call(updateRaidData, params);
    if(payload) {
      yield put({type: actions.RAID_DATA_UPDATED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.RAID_UPDATE_ERRORED, payload: e})
  }
}

function* UpdateSchedule(params) {
  try {
    const payload = yield call(updateRaidSchedule, params);
    if(payload) {
      yield put({type: actions.RAID_DATA_UPDATED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.RAID_UPDATE_ERRORED, payload: e})
  }
}

function* DeleteRows(params) {
  try {
    const payload = yield call(deleteRaidRows, params);
    if(payload) {
      yield put({type: actions.RAID_ROWS_DELETED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.RAID_ROWS_DELETED_ERROR, payload: e})
  }
}

function* DeleteCalendarRows(params) {
  try {
    const payload = yield call(deleteRaidCalendarRows, params);
    if(payload) {
      yield put({type: actions.RAID_DATA_UPDATED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.CALENDAR_ROWS_DELETED_ERROR, payload: e})
  }
}

function* UserRaidSaga(params) {
  try {
    const payload = yield call(getUsersRaids, params.raid);
    if(payload) {
      yield put({type: actions.USER_RAID_DATA_LOADED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.USER_RAID_DATA_FAILED, payload: e})
  }
}

function* AddTeamSaga(params) {
  try {
    const payload = yield call(addRaidTeam, params.team.newRaidValues);
    if(payload) {
      yield put({type: actions.USER_RAID_ADDED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.USER_RAID_ADD_FAILED, payload: e})
  }
}

function* AddExistingTeamSaga(params) {
  try {
    const payload = yield call(addExistingRaidTeam, params.team.raidValues);
    if(payload) {
      yield put({type: actions.USER_RAID_ADDED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.USER_RAID_ADD_FAILED, payload: e})
  }
}

function* RemoveTeamSaga(params) {
  try {
    const payload = yield call(removeRaidTeam, params.team);
    if(payload) {
      yield put({type: actions.USER_RAID_REMOVED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.USER_RAID_REMOVE_FAILED, payload: e})
  }
}

function* ItemSearch(params) {
  try {
    const payload = yield call(searchItems, params);
    if(payload) {
      yield put({type: actions.ITEM_SEARCH_SUCCESS, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.ITEM_SEARCH_FAILED, payload: e})
  }
}

function* loginSuccess() {
  yield put({type: actions.LOGIN_AUTH, payload: true})
}

function* logoutSuccess() {
  yield put({type: actions.LOGOUT_AUTH, payload: true})
}

function* loginComplete(val) {
  yield put({type: actions.LOGIN_UNLOCKED, payload: val})
}

function* drawerOpen(val) {
  yield put({type: actions.DRAWER_MOVED, payload: val})
}

export default function* root() {
  yield all([
    takeEvery(actions.RAID_DATA_REQUESTED, LoadRaid),
    takeEvery(actions.DATA_REQUESTED, workerSaga),
    takeEvery(actions.USER_RAID_REQUESTED, UserRaidSaga),
    takeEvery(actions.ADD_RAID_TEAM, AddTeamSaga),
    takeEvery(actions.ADD_EXISTING_RAID_TEAM, AddExistingTeamSaga),
    takeEvery(actions.REMOVE_RAID_TEAM, RemoveTeamSaga),
    takeEvery(actions.LOGIN_SUCCESS, loginSuccess),
    takeEvery(actions.LOGOUT_SUCCESS, logoutSuccess),
    takeEvery(actions.LOGIN_LOCKED, loginComplete),
    takeEvery(actions.DRAWER, drawerOpen),
    takeEvery(actions.ITEM_SEARCH, ItemSearch),
    takeEvery(actions.DELETE_RAID_ROWS, DeleteRows),
    takeEvery(actions.DELETE_CALENDAR_ROWS, DeleteCalendarRows),
    takeEvery(actions.UPDATE_RAID_DATA, UpdateRaids),
    takeEvery(actions.UPDATE_RAID_SCHEDULE, UpdateSchedule),
    takeEvery(actions.RAID_CALENDAR_REQUESTED, LoadCalendar)
  ])
}
