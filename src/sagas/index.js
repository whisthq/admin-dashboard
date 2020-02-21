import { put, takeLatest, takeEvery, all, call, select, delay } from 'redux-saga/effects';
import * as FormAction from "../actions/index.js"
import { apiPost, apiGet } from '../utils/Api.js'
import history from "../history";
import { push } from 'connected-react-router'

function* updateDB(action) {
  console.log("Saga sending")
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/info/update_db', {
   })
   console.log("Sent initial POST request")
   if(json.ID) {
    console.log(json.ID)
    yield put(FormAction.fetchVMs(json.ID))
   }
}

function* fetchVMs(action) {
  var {json, response} = yield call(apiGet, 'https://cube-celery-vm.herokuapp.com/status/'.concat(action.id))
  while(json.state === 'PENDING') {
    yield delay(2000)
    var {json, response} = yield call(apiGet, 'https://cube-celery-vm.herokuapp.com/status/'.concat(action.id))
  }
  yield put(FormAction.loadVMs(json.output.value))
  console.log(json.output)
}

function* loginUser(action) {
  if(action.username === "fractal-admin" && action.password === "password1234567.") {
    yield put(FormAction.authenticateUser())
  }
}

export default function* rootSaga() {
 	yield all([
    takeEvery(FormAction.UPDATE_DB, updateDB),
    takeEvery(FormAction.FETCH_VMS, fetchVMs),
    takeEvery(FormAction.LOGIN_USER, loginUser)
	]);
}
