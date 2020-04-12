import { put, takeLatest, takeEvery, all, call, select, delay } from 'redux-saga/effects';
import * as FormAction from "../actions/index.js"
import { apiPost, apiGet } from '../utils/Api.js'
import history from "../history";
import { push } from 'connected-react-router'
import { config } from '../constants.js'

function* updateDB(action) {
  if (!action.updated) {
    const { json, response } = yield call(apiPost, config.url.PRIMARY_SERVER + '/info/update_db', {
    })
    if (json.ID) {
      yield put(FormAction.fetchVMs(json.ID))
    }
  }
}

function* fetchVMs(action) {
  var { json, response } = yield call(apiGet, config.url.PRIMARY_SERVER + '/status/'.concat(action.id))
  while (json.state === 'PENDING') {
    yield delay(2000)
    var { json, response } = yield call(apiGet, config.url.PRIMARY_SERVER + '/status/'.concat(action.id))
  }
  yield put(FormAction.loadVMs(json.output.value))
  yield put(FormAction.updateDB(true))
}

function* fetchDiskTable(action) {
  if (!action.updated) {
    const { json, response } = yield call(apiGet, config.url.PRIMARY_SERVER + '/info/list_all_disks', {})
    if (json && json.disks) {
      yield put(FormAction.diskTableFetched(json.disks))
      yield put(FormAction.fetchDiskTable(true))
    }
  }
}

function* loginUser(action) {
  const { json, response } = yield call(apiPost, config.url.PRIMARY_SERVER + '/admin/login', {
    username: action.username,
    password: action.password
  })
  if (json && json.status === 200) {
    yield put(FormAction.authenticateUser())
  }
}

function* resetUser(action) {
  const { json, response } = yield call(apiPost, config.url.PRIMARY_SERVER + '/user/reset', {
    username: action.username,
    vm_name: action.vm_name
  })
  if (json.status === 200) {
    yield put(FormAction.updateDB(false))
  }
}

function* fetchUserActivity(action) {
  const { json, response } = yield call(apiPost, config.url.PRIMARY_SERVER + '/tracker/fetch', {
  })
  if (json) {
    yield put(FormAction.userActivityFetched(json.payload))
  }
}

function* fetchUserTable(action) {
  if (!action.updated) {
    const { json, response } = yield call(apiPost, config.url.PRIMARY_SERVER + '/account/fetchUsers', {
    })
    if (json && json.status === 200) {
      yield put(FormAction.userTableFetched(json.users))
      yield put(FormAction.fetchUserTable(true))
    }
  }
}

function* deleteUser(action) {
  const { json, response } = yield call(apiPost, config.url.PRIMARY_SERVER + '/account/delete', {
    username: action.user
  })
  if (json && json.status === 200) {
    yield put(FormAction.fetchUserTable(false))
    yield put(FormAction.deleteSubscription(action.user))
  }
}

function* fetchCustomerTable(action) {
  if (!action.updated) {
    const { json, response } = yield call(apiPost, config.url.PRIMARY_SERVER + '/account/fetchCustomers', {
    })
    if (json && json.status === 200) {
      yield put(FormAction.customerTableFetched(json.customers))
      yield put(FormAction.fetchCustomerTable(true))
    }
  }
}

function* deleteSubscription(action) {
  const { json, response } = yield call(apiPost, config.url.PRIMARY_SERVER + '/stripe/cancel', {
    email: action.user
  });
}

export default function* rootSaga() {
  yield all([
    takeEvery(FormAction.UPDATE_DB, updateDB),
    takeEvery(FormAction.FETCH_VMS, fetchVMs),
    takeEvery(FormAction.FETCH_DISK_TABLE, fetchDiskTable),
    takeEvery(FormAction.LOGIN_USER, loginUser),
    takeEvery(FormAction.RESET_USER, resetUser),
    takeEvery(FormAction.FETCH_USER_ACTIVITY, fetchUserActivity),
    takeEvery(FormAction.FETCH_USER_TABLE, fetchUserTable),
    takeEvery(FormAction.DELETE_USER, deleteUser),
    takeEvery(FormAction.FETCH_CUSTOMER_TABLE, fetchCustomerTable),
    takeEvery(FormAction.DELETE_SUBSCRIPTION, deleteSubscription)
  ]);
}
