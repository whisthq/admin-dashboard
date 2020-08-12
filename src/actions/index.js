export const FETCH_VMS = 'FETCH_VMS'
export const LOAD_VMS = 'LOAD_VMS'
export const FETCH_DISK_TABLE = 'FETCH_DISK_TABLE'
export const DISK_TABLE_FETCHED = 'DISK_TABLE_FETCHED'
export const LOGIN_USER = 'LOGIN_USER'
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
export const RESET_USER = 'RESET_USER'
export const FETCH_USER_ACTIVITY = 'FETCH_USER_ACTIVITY'
export const USER_ACTIVITY_FETCHED = 'USER_ACTIVITY_FETCHED'
export const FETCH_USER_TABLE = 'FETCH_USER_TABLE'
export const USER_TABLE_FETCHED = 'USER_TABLE_FETCHED'
export const DELETE_USER = 'DELETE_USER'
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'
export const STORE_JWT = 'STORE_JWT'
export const LOGOUT = 'LOGOUT'
export const INCREMENT_LOGIN_ATTEMPTS = 'INCREMENT_LOGIN_ATTEMPTS'
export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS'
export const STORE_CUSTOMERS = 'STORE_CUSTOMERS'
export const START_VM = 'START_VM'
export const DEALLOCATE_VM = 'DEALLOCATE_VM'
export const DONE_UPDATING = 'DONE_UPDATING'
export const FETCH_LOGS = 'FETCH_LOGS'
export const FETCH_ALL_LOGS = 'FETCH_ALL_LOGS'
export const STORE_LOGS = 'STORE_LOGS'
export const LOGS_FOUND = 'LOGS_FOUND'
export const DELETE_LOGS = 'DELETE_LOGS'
export const DELETE_LOG_SUCCESS = 'DELETE_LOG_SUCCESS'
export const SET_DEV = 'SET_DEV'
export const SET_STUN = 'SET_STUN'
export const SET_AUTOUPDATE = 'SET_AUTOUPDATE'
export const CHANGE_BRANCH = 'CHANGE_BRANCH'
export const FETCH_LATEST_REPORT = 'FETCH_LATEST_REPORT'
export const LATEST_REPORT_FETCHED = 'LATEST_REPORT_FETCHED'
export const FETCH_USER_REPORT = 'FETCH_USER_REPORT'
export const USER_REPORT_FETCHED = 'USER_REPORT_FETCHED'
export const FETCH_REGION_REPORT = 'FETCH_REGION_REPORT'
export const REGION_REPORT_FETCHED = 'REGION_REPORT_FETCHED'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const FETCH_TOTAL_SIGNUPS = 'FETCH_TOTAL_SIGNUPS'
export const TOTAL_SIGNUPS_FETCHED = 'TOTAL_SIGNUPS_FETCHED'
export const FETCH_TOTAL_MINUTES = 'FETCH_TOTAL_MINUTES'
export const TOTAL_MINUTES_FETCHED = 'TOTAL_MINUTES_FETCHED'
export const ANALYZE_LOGS = 'ANALYZE_LOGS'
export const STORE_LOG_ANALYSIS = 'STORE_LOG_ANALYSIS'
export const FETCH_LOGS_BY_CONNECTION = 'FETCH_LOGS_BY_CONNECTION'
export const FETCH_BOOKMARKED_LOGS = 'FETCH_BOOKMARKED_LOGS'
export const STORE_BOOKMARKED_LOGS = 'STORE_BOOKMARKED_LOGS'
export const BOOKMARK_LOGS = 'BOOKMARK_LOGS'
export const CLEAR_LOGS = 'CLEAR_LOGS'

export function fetchVMs(updated) {
    return {
        type: FETCH_VMS,
        updated,
    }
}

export function loadVMs(payload) {
    return {
        type: LOAD_VMS,
        payload,
    }
}

export function fetchDiskTable(updated) {
    return {
        type: FETCH_DISK_TABLE,
        updated,
    }
}

export function diskTableFetched(payload) {
    return {
        type: DISK_TABLE_FETCHED,
        payload,
    }
}

export function loginUser(username, password) {
    return {
        type: LOGIN_USER,
        username,
        password,
    }
}

export function authenticateUser(authenticated) {
    return {
        type: AUTHENTICATE_USER,
        authenticated,
    }
}

export function resetUser(vm_name, username) {
    return {
        type: RESET_USER,
        vm_name,
        username,
    }
}

export function fetchUserActivity() {
    return {
        type: FETCH_USER_ACTIVITY,
    }
}

export function userActivityFetched(payload) {
    return {
        type: USER_ACTIVITY_FETCHED,
        payload,
    }
}

export function fetchUserTable(updated) {
    return {
        type: FETCH_USER_TABLE,
        updated,
    }
}

export function userTableFetched(payload) {
    return {
        type: USER_TABLE_FETCHED,
        payload,
    }
}

export function deleteUser(user) {
    return {
        type: DELETE_USER,
        user,
    }
}

export function deleteSubscription(user) {
    return {
        type: DELETE_SUBSCRIPTION,
        user,
    }
}

export function storeJWT(access_token, refresh_token) {
    return {
        type: STORE_JWT,
        access_token,
        refresh_token,
    }
}

export function logout() {
    return {
        type: LOGOUT,
    }
}

export function incrementLoginAttempts() {
    return {
        type: INCREMENT_LOGIN_ATTEMPTS,
    }
}

export function fetchCustomers() {
    return {
        type: FETCH_CUSTOMERS,
    }
}

export function storeCustomers(customers) {
    return {
        type: STORE_CUSTOMERS,
        customers,
    }
}

export function startVM(vm_name) {
    return {
        type: START_VM,
        vm_name,
    }
}

export function deallocateVM(vm_name) {
    return {
        type: DEALLOCATE_VM,
        vm_name,
    }
}

export function doneUpdating(vm_name) {
    return {
        type: DONE_UPDATING,
        vm_name,
    }
}

export function fetchLogs(username, logs_not_found, fetch_all) {
    return {
        type: FETCH_LOGS,
        username,
        logs_not_found,
        fetch_all,
    }
}

export function storeLogs(logs, logs_not_found, last_log) {
    return {
        type: STORE_LOGS,
        logs,
        logs_not_found,
        last_log,
    }
}

export function deleteLogs(connection_id) {
    return {
        type: DELETE_LOGS,
        connection_id,
    }
}

export function logsFound(found) {
    return {
        type: LOGS_FOUND,
        found,
    }
}

export function deleteLogSuccess(connection_id) {
    return {
        type: DELETE_LOG_SUCCESS,
        connection_id,
    }
}

export function setDev(vm_name, dev) {
    return {
        type: SET_DEV,
        vm_name,
        dev,
    }
}

export function setStun(disk_name, useStun) {
    return {
        type: SET_STUN,
        disk_name,
        useStun,
    }
}

export function setAutoupdate(disk_name, autoUpdate) {
    return {
        type: SET_AUTOUPDATE,
        disk_name,
        autoUpdate,
    }
}

export function changeBranch(disk_name, branch) {
    return {
        type: CHANGE_BRANCH,
        disk_name,
        branch,
    }
}

export function fetchLatestReport() {
    return {
        type: FETCH_LATEST_REPORT,
    }
}

export function latestReportFetched(report) {
    return {
        type: LATEST_REPORT_FETCHED,
        report,
    }
}

export function fetchUserReport(timescale, username) {
    return {
        type: FETCH_USER_REPORT,
        timescale,
        username,
    }
}

export function fetchRegionReport(timescale) {
    return {
        type: FETCH_REGION_REPORT,
        timescale,
    }
}

export function userReportFetched(report) {
    return {
        type: USER_REPORT_FETCHED,
        report,
    }
}

export function regionReportFetched(report) {
    return {
        type: REGION_REPORT_FETCHED,
        report,
    }
}
export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        page,
    }
}

export function fetchTotalSignups() {
    return {
        type: FETCH_TOTAL_SIGNUPS,
    }
}

export function totalSignupsFetched(data) {
    return {
        type: TOTAL_SIGNUPS_FETCHED,
        data,
    }
}

export function fetchTotalMinutes() {
    return {
        type: FETCH_TOTAL_MINUTES,
    }
}

export function totalMinutesFetched(data) {
    return {
        type: TOTAL_MINUTES_FETCHED,
        data,
    }
}

export function analyzeLogs(
    connection_id,
    username,
    server_filename,
    client_filename
) {
    return {
        type: ANALYZE_LOGS,
        connection_id,
        username,
        server_filename,
        client_filename,
    }
}

export function storeLogAnalysis(payload_id, payload, sender) {
    return {
        type: STORE_LOG_ANALYSIS,
        payload_id,
        payload,
        sender,
    }
}

export function fetchLogsByConnection(
    connection_id,
    logs_not_found,
    fetch_all,
    last_log
) {
    return {
        type: FETCH_LOGS_BY_CONNECTION,
        connection_id,
        logs_not_found,
        fetch_all,
        last_log,
    }
}

export function fetchBookmarkedLogs() {
    return {
        type: FETCH_BOOKMARKED_LOGS,
    }
}

export function storeBookmarkedLogs(payload) {
    return {
        type: STORE_BOOKMARKED_LOGS,
        payload,
    }
}

export function bookmarkLogs(bookmark, connection_id) {
    return {
        type: BOOKMARK_LOGS,
        bookmark,
        connection_id,
    }
}

export function clearLogs() {
    return {
        type: CLEAR_LOGS,
    }
}
