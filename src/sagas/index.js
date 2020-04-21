import { put, takeLatest, takeEvery, all, call, select, delay } from 'redux-saga/effects';
import * as FormAction from "../actions/index.js"
import { apiPost, apiGet } from '../utils/Api.js'
import history from "../history";
import { push } from 'connected-react-router'
import {config} from '../constants.js'

function* updateDB(action) {
  const state = yield select()
  if(!action.updated) {
     const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/vm/fetchall', {
     })
     console.log(json)
     if(json && json.payload) {
      yield put(FormAction.loadVMs(json.payload))
     }
  }
}

function* loginUser(action) {
  const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/admin/login', {
    username: action.username,
    password: action.password
  })

  if(json && json.status === 200) {
    yield put(FormAction.authenticateUser(true))
    yield put(FormAction.storeJWT(json.access_token, json.refresh_token))
  } else {
    yield put(FormAction.authenticateUser(false))
    yield put(FormAction.incrementLoginAttempts())
  }
}


function* fetchUserActivity(action) {
  const state = yield select()
   const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/tracker/fetch', {
   }, state.AccountReducer.access_token)
   if(json) {
    yield put(FormAction.userActivityFetched(json.payload))
   }
}

function* fetchUserTable(action) {
  const state = yield select()

  yield delay(5000)

  console.log(state)

  if(!action.updated) {
     const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/account/fetchUsers', {
     }, state.AccountReducer.access_token)

     console.log("user table")
     console.log(json)

     if(json && json.status === 200) {
      yield put(FormAction.userTableFetched(json.users))
      yield put(FormAction.fetchUserTable(true))
     }
  }
}

function* deleteUser(action) {
  const state = yield select()
  const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/account/delete', {
    username: action.user 
  }, state.AccountReducer.access_token)
  if(json && json.status === 200) {
    yield put(FormAction.fetchUserTable(false))
    yield put(FormAction.deleteSubscription(action.user))
  }
}

function* deleteSubscription(action) {
  const state = yield select()
   const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/stripe/cancel', {
      email: action.user
   }, state.AccountReducer.access_token);
}

export default function* rootSaga() {
 	yield all([
    takeEvery(FormAction.UPDATE_DB, updateDB),
    takeEvery(FormAction.LOGIN_USER, loginUser),
    takeEvery(FormAction.FETCH_USER_ACTIVITY, fetchUserActivity),
    takeEvery(FormAction.FETCH_USER_TABLE, fetchUserTable),
    takeEvery(FormAction.DELETE_USER, deleteUser),
    takeEvery(FormAction.DELETE_SUBSCRIPTION, deleteSubscription)
	]);
}
