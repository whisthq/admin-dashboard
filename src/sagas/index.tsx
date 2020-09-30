/* eslint-disable no-unused-vars */
import { put, takeEvery, all, call, select, delay } from 'redux-saga/effects'
import * as FormAction from '../actions/index'
import { apiPost, apiGet } from '../utils/Api'
import history from '../history'
import { config } from '../constants'

// TODO (adriano) these sagas are untested since we are considering changing what we use here
// so until we reach a stable version they won't be tested; however, after that, it may make sense to do so

function* fetchVMs(action: any) {
    const state = yield select()
    if (!action.updated) {
        const { json, response } = yield call(
            apiGet,
            config.url.PRIMARY_SERVER + '/report/fetchVMs',
            state.AccountReducer.access_token
        )
        if (json && response.status === 200) {
            yield put(FormAction.loadVMs(json))
        }
    }
}

function* loginUser(action: any) {
    const { json, response } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/admin/login',
        {
            username: action.username,
            password: action.password,
        },
        {}
    )

    if (json && response.status === 200) {
        history.push('/admin')
        yield put(FormAction.authenticateUser(true))
        yield put(FormAction.storeJWT(json.access_token, json.refresh_token))
    } else {
        yield put(FormAction.authenticateUser(false))
        yield put(FormAction.incrementLoginAttempts())
    }
}

function* fetchUserActivity() {
    const state = yield select()

    const { json, response } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER + '/report/fetchLoginActivity',
        state.AccountReducer.access_token
    )
    if (json && response.status === 200) {
        yield put(FormAction.userActivityFetched(json))
    }
}

function* fetchUserTable(action: any) {
    const state = yield select()
    if (!action.updated) {
        const { json, response } = yield call(
            apiGet,
            config.url.PRIMARY_SERVER + '/report/fetchUsers',
            state.AccountReducer.access_token
        )
        if (json && response.status === 200) {
            yield put(FormAction.userTableFetched(json))
            yield put(FormAction.fetchUserTable(true))
        }
    }
}

function* fetchUsers() {
    const state = yield select()

    const { json, response } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER + '/report/fetchUsers',
        state.AccountReducer.access_token
    )
    if (json && response.status === 200) {
        yield put(FormAction.storeUsers(json))
    }
}

function* deleteUser(action: any) {
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

function* deleteSubscription(action: any) {
    const state = yield select()
    yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/stripe/cancel',
        {
            username: action.user,
        },
        state.AccountReducer.access_token
    )
}

function* startVM(action: any) {
    const state = yield select()

    let body = {
        vm_name: action.vm_name,
        //resource_group: config.url.VM_GROUP,
    }

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/vm/start',
        body,
        state.AccountReducer.access_token
    )

    yield put(FormAction.fetchVMs(false))

    if (json) {
        if (json.ID) {
            yield call(getVMStatus, json.ID, action.vm_name)
        }
    }
}

function* deallocateVM(action: any) {
    const state = yield select()
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/vm/deallocate',
        {
            vm_name: action.vm_name,
        },
        state.AccountReducer.access_token
    )

    yield put(FormAction.fetchVMs(false))

    if (json) {
        if (json.ID) {
            yield call(getVMStatus, json.ID, action.vm_name)
        }
    }
}

function* getVMStatus(id: string, vm_name: string) {
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
        yield delay(5000)
    }

    if (json && json.output) {
        yield put(FormAction.fetchVMs(false))
        yield put(FormAction.doneUpdating(vm_name))
    }
}

// by username
function* fetchLogs(action: any) {
    const state = yield select()

    const { json } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER +
            '/logs' +
            (action.username ? '?username=' + action.username : ''),
        state.AccountReducer.access_token
    )
    if (json && json.logs) {
        yield put(FormAction.storeLogs(json.logs, false, true))
    } else {
        yield put(FormAction.storeLogs([], true, true))
    }
}

function* fetchLogsByConnection(action: any) {
    const state = yield select()

    const { json } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER +
            '/logs' +
            (action.username ? '?connection_id=' + action.connection_id : ''),
        state.AccountReducer.access_token
    )
    if (json && json.logs) {
        yield put(FormAction.storeLogs(json.logs, false, true))
    } else {
        yield put(FormAction.storeLogs([], true, true))
    }
}

function* deleteLogs(action: any) {
    const state = yield select()

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/logs/delete',
        {
            connection_id: action.connection_id,
        },
        state.AccountReducer.access_token
    )

    if (json && json.ID) {
        yield put(FormAction.deleteLogSuccess(action.connection_id))
    }
}

function* setDev(action: any) {
    const state = yield select()

    const { json, response } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/vm/dev',
        {
            vm_name: action.vm_name,
            dev: action.dev,
        },
        state.AccountReducer.access_token
    )
    if (json && response.status === 200) {
        yield put(FormAction.fetchVMs(false))
    }
}

function* setStun(action: any) {
    const state = yield select()

    const { json, response } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/azure_disk/stun',
        {
            disk_name: action.disk_name,
            using_stun: action.useStun,
        },
        state.AccountReducer.access_token
    )

    if (json.status === 200 && response.status === 200) {
        yield put(FormAction.fetchDiskTable(false))
    }
}

function* changeBranch(action: any) {
    const state = yield select()

    const { json, response } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/azure_disk/branch',
        {
            disk_name: action.disk_name,
            branch: action.branch,
        },
        state.AccountReducer.access_token
    )

    if (json.status === 200 && response.status === 200) {
        yield put(FormAction.fetchDiskTable(false))
    }
}

function* fetchDiskTable() {
    const state = yield select()

    const { json, response } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER + '/report/fetchDisks',
        state.AccountReducer.access_token
    )
    if (json && response.status === 200) {
        yield put(FormAction.diskTableFetched(json))
    }
}

function* fetchLatestReport() {
    const state = yield select()

    const { json } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER + '/report/latest',
        state.AccountReducer.access_token
    )

    if (json) {
        yield put(FormAction.latestReportFetched(json))
    }
}

function* fetchRegionReport(action: any) {
    const state = yield select()

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/report/regionReport',
        {
            timescale: action.timescale,
        },
        state.AccountReducer.access_token
    )

    if (json) {
        yield put(FormAction.regionReportFetched(json))
    }
}

function* fetchUserReport(action: any) {
    const state = yield select()
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/report/userReport',
        {
            timescale: action.timescale,
            username: action.username,
        },
        state.AccountReducer.access_token
    )

    if (json) {
        yield put(FormAction.userReportFetched(json))
    }
}

function* fetchTotalMinutes() {
    const state = yield select()
    const { json } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER + '/report/totalUsage',
        state.AccountReducer.access_token
    )

    if (json) {
        yield put(FormAction.totalMinutesFetched(json))
    }
}

function* fetchTotalSignups() {
    const state = yield select()
    const { json } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER + '/report/signups',
        state.AccountReducer.access_token
    )

    if (json) {
        yield put(FormAction.totalSignupsFetched(json))
    }
}

function* analyzeLogs(action: any) {
    const state = yield select()
    // Analyze client logs
    if (action.client_filename) {
        let json = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + '/analytics/logs',
            {
                sender: 'client',
                filename: action.client_filename,
            },
            state.AccountReducer.access_token
        )
        json = json.json

        if (json) {
            //previously: action.username.concat('_', action.connection_id)
            const payload_id = action.connection_id
            yield put(FormAction.storeLogAnalysis(payload_id, json, 'client'))
        }
    }

    // Analyze server logs

    if (action.server_filename) {
        let json = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + '/analytics/logs',
            {
                sender: 'server',
                filename: action.server_filename,
            },
            state.AccountReducer.access_token
        )
        json = json.json

        if (json) {
            if (!action.username) {
                action.username = 'null'
            }
            //action.username.concat('_', action.connection_id)
            const payload_id = action.connection_id
            yield put(FormAction.storeLogAnalysis(payload_id, json, 'server'))
        }
    }
}

function* fetchBookmarkedLogs() {
    const state = yield select()

    const { json } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER + '/logs?bookmarked=true',
        state.AccountReducer.access_token
    )

    if (json && json.connection_ids) {
        yield put(FormAction.storeBookmarkedLogs(json.connection_ids))
    }
}

function* bookmarkLogs(action: any) {
    const state = yield select()
    if (action.bookmark) {
        yield call(
            apiPost,
            config.url.PRIMARY_SERVER + '/logs/bookmark',
            {
                connection_id: action.connection_id,
            },
            state.AccountReducer.access_token
        )
    } else {
        yield call(
            apiPost,
            config.url.PRIMARY_SERVER + '/logs/unbookmark',
            {
                connection_id: action.connection_id,
            },
            state.AccountReducer.access_token
        )
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(FormAction.FETCH_VMS, fetchVMs),
        takeEvery(FormAction.LOGIN_USER, loginUser),
        takeEvery(FormAction.FETCH_USER_ACTIVITY, fetchUserActivity),
        takeEvery(FormAction.FETCH_USER_TABLE, fetchUserTable),
        takeEvery(FormAction.DELETE_USER, deleteUser),
        takeEvery(FormAction.DELETE_SUBSCRIPTION, deleteSubscription),
        takeEvery(FormAction.FETCH_USERS, fetchUsers),
        takeEvery(FormAction.START_VM, startVM),
        takeEvery(FormAction.DEALLOCATE_VM, deallocateVM),
        takeEvery(FormAction.FETCH_LOGS, fetchLogs),
        takeEvery(FormAction.DELETE_LOGS, deleteLogs),
        takeEvery(FormAction.SET_DEV, setDev),
        takeEvery(FormAction.SET_STUN, setStun),
        takeEvery(FormAction.FETCH_DISK_TABLE, fetchDiskTable),
        takeEvery(FormAction.CHANGE_BRANCH, changeBranch),
        takeEvery(FormAction.FETCH_LATEST_REPORT, fetchLatestReport),
        takeEvery(FormAction.FETCH_REGION_REPORT, fetchRegionReport),
        takeEvery(FormAction.FETCH_USER_REPORT, fetchUserReport),
        takeEvery(FormAction.FETCH_TOTAL_MINUTES, fetchTotalMinutes),
        takeEvery(FormAction.FETCH_TOTAL_SIGNUPS, fetchTotalSignups),
        takeEvery(FormAction.ANALYZE_LOGS, analyzeLogs),
        takeEvery(FormAction.FETCH_LOGS_BY_CONNECTION, fetchLogsByConnection),
        takeEvery(FormAction.FETCH_BOOKMARKED_LOGS, fetchBookmarkedLogs),
        takeEvery(FormAction.BOOKMARK_LOGS, bookmarkLogs),
    ])
}
