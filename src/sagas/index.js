/* eslint-disable no-unused-vars */
import { put, takeEvery, all, call, select, delay } from 'redux-saga/effects'
import * as FormAction from '../actions/index.js'
import { apiPost, apiGet, fetchGraphQL } from '../utils/Api.js'
import history from '../history'
import { config } from '../constants.js'

function* updateDB(action) {
    const state = yield select()
    if (!action.updated) {
        if (config.new_server) {
            const { json, response } = yield call(
                apiGet,
                config.url.PRIMARY_SERVER + '/report/fetchVMs',
                state.AccountReducer.access_token
            )
            if (json && response.status === 200) {
                yield put(FormAction.loadVMs(json))
            }
        } else {
            const { json, response } = yield call(
                apiPost,
                config.url.PRIMARY_SERVER + '/vm/fetchall',
                {}
            )
            if (json && json.payload) {
                yield put(FormAction.loadVMs(json.payload))
            }
        }
    }
}

function* loginUser(action) {
    const { json, response } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/admin/login',
        {
            username: action.username,
            password: action.password,
        }
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
    if (config.new_server) {
        const { json, response } = yield call(
            apiGet,
            config.url.PRIMARY_SERVER + '/report/fetchLoginActivity',
            state.AccountReducer.access_token
        )
        if (json && response.status === 200) {
            yield put(FormAction.userActivityFetched(json))
        }
    } else {
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
}

function* fetchUserTable(action) {
    const state = yield select()

    if (!action.updated) {
        const json = yield call(
            fetchGraphQL,
            ` query FetchUsers {
                users {
                    created_timestamp
                    credits_outstanding
                    email
                    name
                    release_stage
                    stripe_customer_id
                    user_id
                    using_google_login
                    password
                    reason_for_signup
                    referral_code
                  }
            }
              `,
            'FetchUsers',
            {}
        )

        if (json.data) {
            yield put(FormAction.userTableFetched(json.data.users))
            yield put(FormAction.fetchUserTable(true))
        }
    }
}

function* fetchCustomers(action) {
    const state = yield select()
    const { json, response } = yield call(
        apiGet,
        config.url.PRIMARY_SERVER + '/report/fetchCustomers',
        state.AccountReducer.access_token
    )

    if (json && response.status === 200) {
        yield put(FormAction.storeCustomers(json))
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

function* deleteSubscription(action) {
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

function* startVM(action) {
    const state = yield select()

    let body
    if (config.new_server) {
        body = {
            vm_name: action.vm_name,
            resource_group: config.url.VM_GROUP,
        }
    } else {
        body = {
            vm_name: action.vm_name,
        }
    }

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + '/vm/start',
        body,
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
    const state = yield select()
    let condition = action.username
        ? `(where: {user_id: {_eq: "${action.username}"}})`
        : ''

    const json = yield call(
        fetchGraphQL,
        ` query FetchLogs {
                logs_protocol_logs${condition} {
                    bookmarked
                    client_logs
                    connection_id
                    server_logs
                    timestamp
                    user_id
                    version
                  }
            }
          `,
        'FetchLogs',
        {}
    )

    if (json && json.data && json.data.logs_protocol_logs) {
        yield put(
            FormAction.storeLogs(json.data.logs_protocol_logs, false, true)
        )
    } else {
        yield put(FormAction.storeLogs([], true, true))
    }
}

function* fetchLogsByConnection(action) {
    const state = yield select()

    const json = yield call(
        fetchGraphQL,
        ` query FetchLogsByConnection {
            logs_protocol_logs(where: {connection_id: {_eq: "${action.connection_id}"}}) {
                bookmarked
                client_logs
                connection_id
                server_logs
                timestamp
                user_id
                version
              }
        }
      `,
        'FetchLogsByConnection',
        {}
    )

    if (json && json.logs && json.data.logs_protocol_logs) {
        yield put(
            FormAction.storeLogs(
                json.data.logs_protocol_logs,
                false,
                action.last_log
            )
        )
    } else {
        yield put(FormAction.storeLogs([], true, true))
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

function* setDev(action) {
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
        yield put(FormAction.updateDB(false))
    }
}

function* setStun(action) {
    console.log('Setting stun to ')
    console.log(action.useStun)
    const state = yield select()
    const json = yield call(
        fetchGraphQL,
        `mutation SetStun {
            update_hardware_os_disks(where: {disk_id: {_eq: "${action.disk_name}"}}, _set: {using_stun: ${action.useStun}}) {
                affected_rows
              }
        }
      `,
        'SetStun',
        {}
    )

    if (json.data && json.data.update_hardware_os_disks.affected_rows > 0) {
        yield put(FormAction.fetchDiskTable(false))
    }
}

function* changeBranch(action) {
    const state = yield select()
    if (config.new_server) {
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
    } else {
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
}

function* fetchDiskTable(action) {
    const state = yield select()
    if (config.new_server) {
        const { json, response } = yield call(
            apiGet,
            config.url.PRIMARY_SERVER + '/report/fetchDisks',
            state.AccountReducer.access_token
        )
        if (json && response.status === 200) {
            yield put(FormAction.diskTableFetched(json))
        }
    } else {
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

function* fetchRegionReport(action) {
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

function* fetchUserReport(action) {
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

function* analyzeLogs(action) {
    const state = yield select()
    var { json } = {}
    // Analyze client logs

    if (action.client_filename) {
        json = yield call(
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
            const payload_id = action.username.concat('_', action.connection_id)
            yield put(FormAction.storeLogAnalysis(payload_id, json, 'client'))
        }
    }

    // Analyze server logs

    if (action.server_filename) {
        json = yield call(
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
            const payload_id = action.username.concat('_', action.connection_id)
            yield put(FormAction.storeLogAnalysis(payload_id, json, 'server'))
        }
    }
}

function* fetchBookmarkedLogs(action) {
    const state = yield select()
    if (config.new_server) {
        const { json } = yield call(
            apiGet,
            config.url.PRIMARY_SERVER + '/logs?bookmarked=true',
            state.AccountReducer.access_token
        )

        if (json && json.connection_ids) {
            yield put(FormAction.storeBookmarkedLogs(json.connection_ids))
        }
    } else {
        const { json } = yield call(
            apiGet,
            config.url.PRIMARY_SERVER + '/logs/bookmarked',
            ''
        )

        if (json && json.connection_ids) {
            yield put(FormAction.storeBookmarkedLogs(json.connection_ids))
        }
    }
}

function* bookmarkLogs(action) {
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
