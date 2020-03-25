import { put, takeLatest, takeEvery, all, call, select, delay } from 'redux-saga/effects';
import * as FormAction from "../actions/index.js"
import { apiPost, apiGet } from '../utils/Api.js'
import history from "../history";
import { push } from 'connected-react-router'

function* updateDB(action) {
  if(!action.updated) {
     const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/info/update_db', {
     })
     if(json.ID) {
      yield put(FormAction.fetchVMs(json.ID))
     }
  }
}

function* fetchVMs(action) {
  var {json, response} = yield call(apiGet, 'https://cube-celery-vm.herokuapp.com/status/'.concat(action.id))
  while(json.state === 'PENDING') {
    yield delay(2000)
    var {json, response} = yield call(apiGet, 'https://cube-celery-vm.herokuapp.com/status/'.concat(action.id))
  }
  yield put(FormAction.loadVMs(json.output.value))
  console.log("VMS FETCHED")
  console.log(json)
  yield put(FormAction.updateDB(true))
}

function* loginUser(action) {
  if(action.username === "fractal-admin" && action.password === "password1234567.") {
    yield put(FormAction.authenticateUser())
  }
}

function* resetUser(action) {
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/user/reset', {
    username: action.username,
    vm_name: action.vm_name
   })
   if(json.status === 200) {
    yield put(FormAction.updateDB(false))
   }
}

function* fetchUserActivity(action) {
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/tracker/fetch', {
   })
   if(json) {
    yield put(FormAction.userActivityFetched(json.payload))
   }
}

export default function* rootSaga() {
 	yield all([
    takeEvery(FormAction.UPDATE_DB, updateDB),
    takeEvery(FormAction.FETCH_VMS, fetchVMs),
    takeEvery(FormAction.LOGIN_USER, loginUser),
    takeEvery(FormAction.RESET_USER, resetUser),
    takeEvery(FormAction.FETCH_USER_ACTIVITY, fetchUserActivity)
	]);
}
