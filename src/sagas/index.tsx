/* eslint-disable no-unused-vars */
import { put, takeEvery, all, call, select, delay } from 'redux-saga/effects'
import * as FormAction from '../actions/index'
import { apiPost, apiGet, fetchGraphQL } from '../utils/Api'
import history from '../history'
import { config } from '../constants'

function* fetchVms(action: ReturnType<typeof FormAction.fetchVMs>) {
    yield select()
    if (!action.updated) {
        const json = yield call(
            fetchGraphQL,
            ` query FetchVMs {
                hardware_user_vms {
                    ip
                    location
                    lock
                    os
                    state
                    temporary_lock
                    user_id
                    vm_id
                  }
            }
              `,
            'FetchVMs',
            {}
        )
        if (json && json.data) {
            yield put(FormAction.loadVMs(json.data.hardware_user_vms))
        }
    }
}

function* loginUser(action: ReturnType<typeof FormAction.loginUser>) {
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

function* fetchUserTable(action: ReturnType<typeof FormAction.fetchUserTable>) {
    yield select()
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

function* fetchCustomers() {
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

function* deleteUser(action: ReturnType<typeof FormAction.deleteUser>) {
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

function* deleteSubscription(
    action: ReturnType<typeof FormAction.deleteSubscription>
) {
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

function* startVM(action: ReturnType<typeof FormAction.startVM>) {
    const state = yield select()

    let body
    if (config.new_server) {
        body = {
            vm_name: action.vm_name,
            // resource_group: config.url.VM_GROUP,
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

    yield put(FormAction.fetchVMs(false))

    if (json) {
        if (json.ID) {
            yield call(getVMStatus, json.ID, action.vm_name)
        }
    }
}

function* deallocateVM(action: ReturnType<typeof FormAction.deallocateVM>) {
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

function* getVMStatus(id: string, vm_name: any) {
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

function* fetchLogs(action: ReturnType<typeof FormAction.fetchLogs>) {
    yield select()
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

function* fetchLogsByConnection(
    action: ReturnType<typeof FormAction.fetchLogsByConnection>
) {
    yield select()
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

function* deleteLogs(action: ReturnType<typeof FormAction.deleteLogs>) {
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

function* setStun(action: ReturnType<typeof FormAction.setStun>) {
    yield select()
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

function* setAutoupdate(action: ReturnType<typeof FormAction.setAutoupdate>) {
    yield select()
    const json = yield call(
        fetchGraphQL,
        `mutation SetAutoupdate {
            update_hardware_os_disks(where: {disk_id: {_eq: "${action.disk_name}"}}, _set: {allow_autoupdate: ${action.autoUpdate}}) {
                affected_rows
              }
        }
      `,
        'SetAutoupdate',
        {}
    )

    if (json.data && json.data.update_hardware_os_disks.affected_rows > 0) {
        yield put(FormAction.fetchDiskTable(false))
    }
}

function* changeBranch(action: ReturnType<typeof FormAction.changeBranch>) {
    const json = yield call(
        fetchGraphQL,
        `mutation SetBranch {
            update_hardware_os_disks(where: {disk_id: {_eq: "${action.disk_name}"}}, _set: {branch: "${action.branch}"}) {
                affected_rows
              }
        }
      `,
        'SetBranch',
        {}
    )

    if (json && json.data.update_hardware_os_disks.affected_rows > 0) {
        yield put(FormAction.fetchDiskTable(false))
    }
}

function* fetchDiskTable() {
    const json = yield call(
        fetchGraphQL,
        ` query FetchDisks {
            hardware_os_disks {
                allow_autoupdate
                branch
                disk_id
                disk_size
                has_dedicated_vm
                last_pinged
                location
                os
                rsa_private_key
                ssh_password
                user_id
                using_stun
                version
              }
            }
      `,
        'FetchDisks',
        {}
    )
    if (json && json.data) {
        yield put(FormAction.diskTableFetched(json.data.hardware_os_disks))
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

function* fetchRegionReport(
    action: ReturnType<typeof FormAction.fetchRegionReport>
) {
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

function* fetchUserReport(
    action: ReturnType<typeof FormAction.fetchUserReport>
) {
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

function* analyzeLogs(action: ReturnType<typeof FormAction.analyzeLogs>) {
    const state = yield select()
    // Analyze client logs
    if (action.client_filename) {
        var { json } = yield call(
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

function* fetchBookmarkedLogs() {
    const json = yield call(
        fetchGraphQL,
        ` query FetchBookmarkedLogs {
            logs_protocol_logs(where: {bookmarked: {_eq: true}}) {
                connection_id
              }
            }
      `,
        'FetchBookmarkedLogs',
        {}
    )

    if (json && json.data) {
        let connection_ids = json.data.logs_protocol_logs.map(
            (log: { connection_id: any }) => log.connection_id
        )
        yield put(FormAction.storeBookmarkedLogs(connection_ids))
    }
}

function* bookmarkLogs(action: ReturnType<typeof FormAction.bookmarkLogs>) {
    yield select()
    yield call(
        fetchGraphQL,
        ` mutation BookmarkLogs {
            update_logs_protocol_logs(where: {connection_id: {_eq: "${
                action.connection_id
            }"}}, _set: {bookmarked: ${action.bookmark.toString()}}) {
              affected_rows
            }
          }
      `,
        'BookmarkLogs',
        {}
    )
}

export default function* rootSaga() {
    yield all([
        takeEvery(FormAction.FETCH_VMS, fetchVms),
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
        takeEvery(FormAction.SET_STUN, setStun),
        takeEvery(FormAction.SET_AUTOUPDATE, setAutoupdate),
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
