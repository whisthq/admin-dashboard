/* eslint-disable no-unused-vars */
import { put, takeEvery, all, call, select, delay } from 'redux-saga/effects'
import * as FormAction from '../actions/index.js'
import { apiPost, apiGet } from '../utils/Api.js'
import history from '../history'
import { config } from '../constants.js'
import { Form } from 'react-bootstrap'

function* updateDB(action) {
    if (!action.updated) {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + '/vm/fetchall',
            {}
        )
        console.log(json)
        if (json && json.payload) {
            yield put(FormAction.loadVMs(json.payload))
        }
    }
}

function* loginUser(action) {
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/admin/login',
        {
            username: action.username,
            password: action.password,
        }
    )

    if (json && json.status === 200) {
        history.push('/admin')
        yield put(FormAction.authenticateUser(true))
        yield put(FormAction.storeJWT(json.access_token, json.refresh_token))
    } else {
        yield put(FormAction.authenticateUser(false))
        yield put(FormAction.incrementLoginAttempts())
    }
}

function* fetchUserActivity(action) {
    const state = yield select()
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/tracker/fetch',
        {},
        state.AccountReducer.access_token
    )
    if (json) {
        yield put(FormAction.userActivityFetched(json.payload))
    }
}

function* fetchUserTable(action) {
    const state = yield select()

    if (!action.updated) {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + '/account/fetchUsers',
            {},
            state.AccountReducer.access_token
        )

        if (json && json.status === 200) {
            yield put(FormAction.userTableFetched(json.users))
            yield put(FormAction.fetchUserTable(true))
        }
    }
}

function* fetchCustomers(action) {
    const state = yield select()

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/account/fetchCustomers',
        {},
        state.AccountReducer.access_token
    )

    if (json && json.status === 200) {
        yield put(FormAction.storeCustomers(json.customers))
    }
}

function* deleteUser(action) {
    const state = yield select()
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/account/delete',
        {
            username: action.user,
        },
        state.AccountReducer.access_token
    )
    if (json && json.status === 200) {
        yield put(FormAction.fetchUserTable(false))
        yield put(FormAction.deleteSubscription(action.user))
    }
}

function* fetchCustomerTable(action) {
    if (!action.updated) {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + '/account/fetchCustomers',
            {}
        )
        if (json && json.status === 200) {
            yield put(FormAction.customerTableFetched(json.customers))
            yield put(FormAction.fetchCustomerTable(true))
        }
    }
}

function* deleteSubscription(action) {
    const state = yield select()
    yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/stripe/cancel',
        {
            email: action.user,
        },
        state.AccountReducer.access_token
    )
}

function* startVM(action) {
    const state = yield select()
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/vm/start',
        {
            vm_name: action.vm_name,
        },
        state.AccountReducer.access_token
    )

    yield put(FormAction.updateDB(false))

    if (json) {
        if (json.ID) {
            yield call(getVMStatus, json.ID, action.vm_name)
        }
    }
}

function* deallocateVM(action) {
    const state = yield select()
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/vm/deallocate',
        {
            vm_name: action.vm_name,
        },
        state.AccountReducer.access_token
    )

    yield put(FormAction.updateDB(false))

    if (json) {
        if (json.ID) {
            yield call(getVMStatus, json.ID, action.vm_name)
        }
    }
}

function* getVMStatus(id, vm_name) {
    var { json } = yield call(
        apiGet,
        (config.url.PRIMARY_SERVER + '/status/').concat(id),
        ''
    )

    while (json.state === 'PENDING' || json.state === 'STARTED') {
        console.log(json)
        json = yield call(
            apiGet,
            (config.url.PRIMARY_SERVER + '/status/').concat(id),
            ''
        )
        yield delay(5000)
    }

    if (json && json.output) {
        yield put(FormAction.updateDB(false))
        yield put(FormAction.doneUpdating(vm_name))
    }
}

function* fetchLogs(action) {
    console.log('FETCH LOG SAGA')
    const state = yield select()

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/logs/fetch',
        {
            username: action.username,
            fetch_all: action.fetch_all,
        },
        state.AccountReducer.access_token
    )

    console.log(json)

    if (json && json.ID) {
        yield call(getLogStatus, json.ID)
    }
}

function* deleteLogs(action) {
    const state = yield select()

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/logs/delete',
        {
            connection_id: action.connection_id,
        },
        state.AccountReducer.access_token
    )

    console.log(json)

    if (json && json.ID) {
        yield put(FormAction.deleteLogSuccess(action.connection_id))
    }
}

function* getLogStatus(id) {
    var { json } = yield call(
        apiGet,
        (config.url.PRIMARY_SERVER + '/status/').concat(id),
        ''
    )

    while (json.state === 'PENDING' || json.state === 'STARTED') {
        json = yield call(
            apiGet,
            (config.url.PRIMARY_SERVER + '/status/').concat(id),
            ''
        )
        yield delay(2000)
        console.log(json)
    }

    if (json && json.output) {
        yield put(FormAction.storeLogs(json.output, false))
    } else {
        yield put(FormAction.storeLogs([], true))
    }
}

function* setDev(action) {
    const state = yield select()

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/vm/setDev',
        {
            vm_name: action.vm_name,
            dev: action.dev,
        },
        state.AccountReducer.access_token
    )

    if (json) {
        yield put(FormAction.updateDB(false))
    }
}

function* changeBranch(action) {
    const state = yield select()

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/disk/setVersion',
        {
            disk_name: action.disk_name,
            branch: action.branch,
        },
        state.AccountReducer.access_token
    )

    if (json) {
        yield put(FormAction.fetchDiskTable(false))
    }
}

function* fetchDiskTable(action) {
    const state = yield select()

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/disk/fetchAll',
        {},
        state.AccountReducer.access_token
    )

    if (json) {
        yield put(FormAction.diskTableFetched(json.disks))
    }
}

function* fetchLatestReport() {
    const state = yield select()

    const { json } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER + '/report/latest',
        ''
    )

    if (json) {
        yield put(FormAction.latestReportFetched(json))
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(FormAction.UPDATE_DB, updateDB),
        takeEvery(FormAction.LOGIN_USER, loginUser),
        takeEvery(FormAction.FETCH_USER_ACTIVITY, fetchUserActivity),
        takeEvery(FormAction.FETCH_USER_TABLE, fetchUserTable),
        takeEvery(FormAction.DELETE_USER, deleteUser),
        takeEvery(FormAction.DELETE_SUBSCRIPTION, deleteSubscription),
        takeEvery(FormAction.FETCH_CUSTOMERS, fetchCustomers),
        takeEvery(FormAction.START_VM, startVM),
        takeEvery(FormAction.DEALLOCATE_VM, deallocateVM),
        takeEvery(FormAction.FETCH_LOGS, fetchLogs),
        takeEvery(FormAction.DELETE_LOGS, deleteLogs),
        takeEvery(FormAction.SET_DEV, setDev),
        takeEvery(FormAction.FETCH_DISK_TABLE, fetchDiskTable),
        takeEvery(FormAction.CHANGE_BRANCH, changeBranch),
        takeEvery(FormAction.FETCH_LATEST_REPORT, fetchLatestReport),
    ])
}
