import { put, takeLatest, takeEvery, all, call, select, delay } from 'redux-saga/effects';
import * as FormAction from "../actions/index.js"
import { apiPost, apiGet } from '../utils/Api.js'
import history from "../history";
import { push } from 'connected-react-router'

function* updateDB(action) {
  if (!action.updated) {
    const { json, response } = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/info/update_db', {
    })
    if (json.ID) {
      yield put(FormAction.fetchVMs(json.ID))
    }
  }
}

function* fetchVMs(action) {
  var { json, response } = yield call(apiGet, 'https://cube-celery-vm.herokuapp.com/status/'.concat(action.id))
  while (json.state === 'PENDING') {
    yield delay(2000)
    var { json, response } = yield call(apiGet, 'https://cube-celery-vm.herokuapp.com/status/'.concat(action.id))
  }
  yield put(FormAction.loadVMs(json.output.value))
  yield put(FormAction.updateDB(true))
}

function* loginUser(action) {
  const { json, response } = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/admin/login', {
    username: action.username,
    password: action.password
  })
  if (json && json.status === 200) {
    yield put(FormAction.authenticateUser())
  }
}

function* resetUser(action) {
  const { json, response } = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/user/reset', {
    username: action.username,
    vm_name: action.vm_name
  })
  if (json.status === 200) {
    yield put(FormAction.updateDB(false))
  }
}

function* fetchUserActivity(action) {
  const { json, response } = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/tracker/fetch', {
  })
  if (json) {
    yield put(FormAction.userActivityFetched(json.payload))
  }
}

function* fetchUserTable(action) {
  if (!action.updated) {
    const { json, response } = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/account/fetchUsers', {
    })
    if (json && json.status === 200) {
      yield put(FormAction.userTableFetched(json.users))
      yield put(FormAction.fetchUserTable(true))
    }
  }
}

function* deleteUser(action) {
  const { json, response } = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/account/delete', {
    username: action.user
  })
  if (json && json.status === 200) {
    yield put(FormAction.fetchUserTable(false))
    yield put(FormAction.deleteSubscription(action.user))
  }
}

function* fetchCustomerTable(action) {
  if (!action.updated) {
    const { json, response } = yield call(apiPost, 'https://cube-celery-staging.herokuapp.com/account/fetchCustomers', {
    })
    if (json && json.status === 200) {
      yield put(FormAction.customerTableFetched(json.customers))
      yield put(FormAction.fetchCustomerTable(true))
    }
  }
}

function* deleteSubscription(action) {
  const { json, response } = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/stripe/cancel', {
    email: action.user
  });
}

export default function* rootSaga() {
  yield all([
    takeEvery(FormAction.UPDATE_DB, updateDB),
    takeEvery(FormAction.FETCH_VMS, fetchVMs),
    takeEvery(FormAction.LOGIN_USER, loginUser),
    takeEvery(FormAction.RESET_USER, resetUser),
    takeEvery(FormAction.FETCH_USER_ACTIVITY, fetchUserActivity),
    takeEvery(FormAction.FETCH_USER_TABLE, fetchUserTable),
    takeEvery(FormAction.DELETE_USER, deleteUser),
    takeEvery(FormAction.FETCH_CUSTOMER_TABLE, fetchCustomerTable),
    takeEvery(FormAction.DELETE_SUBSCRIPTION, deleteSubscription)
  ]);
}
