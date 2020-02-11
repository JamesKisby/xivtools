import "regenerator-runtime/runtime";
import { takeEvery, call, put, fork, all } from "redux-saga/effects";
import * as actions from "../constants/action-type";


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
  return fetch("http://127.0.0.1:5000/api/v1/monsters")
    .then(response => response.json());
}

function getRaidData(userid) {
  return fetch("http://127.0.0.1:5000/api/v1/raid/" + String(userid))
    .then(response => response.json());
}




function* LoadRaid(params) {
  try {
    const payload = yield call(getRaidData, params.userid);
    if(payload) {
      yield put({type: actions.RAID_DATA_LOADED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: actions.API_ERRORED, payload: e})
  }
}


export default function* root() {
  yield all([
    takeEvery(actions.RAID_DATA_REQUESTED, LoadRaid),
    takeEvery(actions.DATA_REQUESTED, workerSaga)
  ])
}
