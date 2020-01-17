import "regenerator-runtime/runtime";
import { takeEvery, call, put } from "redux-saga/effects";
import { DATA_LOADED, DATA_REQUESTED, API_ERRORED } from "../constants/action-type";


export default function* watcherSaga() {
  yield takeEvery("DATA_REQUESTED", workerSaga);
}

function* workerSaga() {
  try {
    const payload = yield call(getData);
    if(payload) {
      yield put({type: DATA_LOADED, payload});
    } else {
      throw payload;
    }
  } catch(e) {
    yield put({type: API_ERRORED, payload: e})
  }
}

function getData() {
  return fetch("http://127.0.0.1:5000/api/v1/monsters")
    .then(response => response.json());
}
