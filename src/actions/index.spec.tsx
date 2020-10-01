import * as actions from './index'

/*
Helpful for writing tests:  https://redux.js.org/recipes/writing-tests/
also https://scotch.io/tutorials/testing-react-and-redux-apps-with-jest

This is a huge file and we want these to be automated though. Not sure of a great way to do this.
Note that for Async action creators we are going to want to test a little differently. That said, none of these
are actually async, so the most basic tests are provided.

The spec would be a bit lengthy, but check the actual file as of September 18th, 2020 to see the correct structure.
I think it should be implicit in these tests.
*/

// TODO (adriano) make a list of the action types, expected actions, and inputs
// and then just make a for loop (because this will be hard to maintain otherwise)
// look at account_reducer.spec.tsx in src/reducers/ to see a way to do this
// this should be ok as it is right now until we want to add/change things (if it is just do it in that pr)

describe('/actions/index.tsx', () => {
    test('FETCH_VMS', () => {
        let updated: boolean = false
        let expectedAction = {
            type: actions.FETCH_VMS,
            updated, // this syntax is shorhand for "updated": val of updated (or updated: val of updated)
        }

        expect(actions.fetchVMs(updated)).toEqual(expectedAction)
    })

    test('LOAD_VMS', () => {
        let payload: any = 'el gringo'
        let expectedAction = {
            type: actions.LOAD_VMS,
            payload,
        }

        expect(actions.loadVMs(payload)).toEqual(expectedAction)
    })

    test('FETCH_DISK_TABLE', () => {
        let updated: boolean | undefined = false
        let expectedAction = {
            type: actions.FETCH_DISK_TABLE,
            updated,
        }

        expect(actions.fetchDiskTable(updated)).toEqual(expectedAction)

        updated = undefined
        let undef_expectedAction = {
            type: actions.FETCH_DISK_TABLE,
            updated: updated, //first updated is "updated" and second is the value of updated (undefined)
        }

        expect(actions.fetchDiskTable(updated)).toEqual(undef_expectedAction)
    })

    test('DISK_TABLE_FETCHED', () => {
        let payload: any = [1, 1, 2, 3, 5, 8]
        let expectedAction = {
            type: actions.DISK_TABLE_FETCHED,
            payload,
        }

        expect(actions.diskTableFetched(payload)).toEqual(expectedAction)
    })

    test('LOGIN_USER', () => {
        let username: string = 'admin'
        let password: string = 'secure password'
        let expectedAction = {
            type: actions.LOGIN_USER,
            username,
            password,
        }

        expect(actions.loginUser(username, password)).toEqual(expectedAction)
    })

    test('AUTHENTICATE_USER', () => {
        let authenticated = true
        let expectedAction = {
            type: actions.AUTHENTICATE_USER,
            authenticated,
        }

        expect(actions.authenticateUser(authenticated)).toEqual(expectedAction)
    })

    test('RESET_USER', () => {
        let vm_name = 'ec2'
        let username = 'hackerdude'
        let expectedAction = {
            type: actions.RESET_USER,
            vm_name,
            username,
        }

        expect(actions.resetUser(vm_name, username)).toEqual(expectedAction)
    })

    test('FETCH_USER_ACTIVITY', () => {
        let expectedAction = {
            type: actions.FETCH_USER_ACTIVITY,
        }

        expect(actions.fetchUserActivity()).toEqual(expectedAction)
    })

    test('USER_ACTIVITY_FETCHED', () => {
        let payload = {
            hello: 'world',
        }
        let expectedAction = {
            type: actions.USER_ACTIVITY_FETCHED,
            payload,
        }

        expect(actions.userActivityFetched(payload)).toEqual(expectedAction)
    })

    test('FETCH_USER_TABLE', () => {
        let updated: boolean | undefined = true
        let expectedAction = {
            type: actions.FETCH_USER_TABLE,
            updated,
        }

        expect(actions.fetchUserTable(updated)).toEqual(expectedAction)

        updated = undefined
        let undef_expectedAction = {
            type: actions.FETCH_USER_TABLE,
            updated,
        }

        expect(actions.fetchUserTable(updated)).toEqual(undef_expectedAction)
    })

    test('USER_TABLE_FETCHED', () => {
        let payload: any = 'payload'
        let expectedAction = {
            type: actions.USER_TABLE_FETCHED,
            payload,
        }

        expect(actions.userTableFetched(payload)).toEqual(expectedAction)
    })

    test('DELETE_USER', () => {
        let user: string = 'user'
        let expectedAction = {
            type: actions.DELETE_USER,
            user,
        }

        expect(actions.deleteUser(user)).toEqual(expectedAction)
    })

    test('DELETE_SUBSCRIPTION', () => {
        let user: any = 'user'
        let expectedAction = {
            type: actions.DELETE_SUBSCRIPTION,
            user,
        }

        expect(actions.deleteSubscription(user)).toEqual(expectedAction)
    })

    test('STORE_JWT', () => {
        let access_token: any = '1234'
        let refresh_token: any = '5678'
        let expectedAction = {
            type: actions.STORE_JWT,
            access_token,
            refresh_token,
        }

        expect(actions.storeJWT(access_token, refresh_token)).toEqual(
            expectedAction
        )
    })

    test('LOGOUT', () => {
        let expectedAction = {
            type: actions.LOGOUT,
        }

        expect(actions.logout()).toEqual(expectedAction)
    })

    test('INCREMENT_LOGIN_ATTEMPTS', () => {
        let expectedAction = {
            type: actions.INCREMENT_LOGIN_ATTEMPTS,
        }

        expect(actions.incrementLoginAttempts()).toEqual(expectedAction)
    })

    test('FETCH_USERS', () => {
        let expectedAction = {
            type: actions.FETCH_USERS,
        }

        expect(actions.fetchUsers()).toEqual(expectedAction)
    })

    test('STORE_USERS', () => {
        let users: any = ['me', 'marley']
        let expectedAction = {
            type: actions.STORE_USERS,
            users,
        }

        expect(actions.storeUsers(users)).toEqual(expectedAction)
    })

    test('START_VM', () => {
        let vm_name: any = 'jeff'
        let expectedAction = {
            type: actions.START_VM,
            vm_name,
        }

        expect(actions.startVM(vm_name)).toEqual(expectedAction)
    })

    test('DEALLOCATE_VM', () => {
        let vm_name: any = 'azure'
        let expectedAction = {
            type: actions.DEALLOCATE_VM,
            vm_name,
        }

        expect(actions.deallocateVM(vm_name)).toEqual(expectedAction)
    })

    test('DONE_UPDATING', () => {
        let vm_name: any = 'droplet'
        let expectedAction = {
            type: actions.DONE_UPDATING,
            vm_name,
        }

        expect(actions.doneUpdating(vm_name)).toEqual(expectedAction)
    })

    test('FETCH_LOGS', () => {
        let username: string = 'pog champ'
        let logs_not_found: boolean = false
        let fetch_all: boolean = true
        let expectedAction = {
            type: actions.FETCH_LOGS,
            username,
            logs_not_found,
            fetch_all,
        }

        expect(actions.fetchLogs(username, logs_not_found, fetch_all)).toEqual(
            expectedAction
        )
    })

    // FETCH_ALL_LOGS not used

    test('STORE_LOGS', () => {
        let logs: never[] = []
        let logs_not_found: boolean = false
        let last_log: boolean = false
        let expectedAction = {
            type: actions.STORE_LOGS,
            logs,
            logs_not_found,
            last_log,
        }

        expect(actions.storeLogs(logs, logs_not_found, last_log)).toEqual(
            expectedAction
        )
    })

    test('LOGS_FOUND', () => {
        let found: boolean = true
        let expectedAction = {
            type: actions.LOGS_FOUND,
            found,
        }

        expect(actions.logsFound(found)).toEqual(expectedAction)
    })

    test('DELETE_LOGS', () => {
        let connection_id: any = 'gamer'
        let expectedAction = {
            type: actions.DELETE_LOGS,
            connection_id,
        }

        expect(actions.deleteLogs(connection_id)).toEqual(expectedAction)
    })

    test('DELETE_LOG_SUCCESS', () => {
        let connection_id: any = 'connection id'
        let expectedAction = {
            type: actions.DELETE_LOG_SUCCESS,
            connection_id,
        }

        expect(actions.deleteLogSuccess(connection_id)).toEqual(expectedAction)
    })

    test('SET_STUN', () => {
        let disk_name: any = 'my favorite disk'
        let useStun: boolean = false
        let expectedAction = {
            type: actions.SET_STUN,
            disk_name,
            useStun,
        }

        expect(actions.setStun(disk_name, useStun)).toEqual(expectedAction)
    })

    test('SET_AUTOUPDATE', () => {
        let disk_name: any = 'ssd'
        let autoUpdate: boolean = false
        let expectedAction = {
            type: actions.SET_AUTOUPDATE,
            disk_name,
            autoUpdate,
        }

        expect(actions.setAutoupdate(disk_name, autoUpdate)).toEqual(
            expectedAction
        )
    })

    test('CHANGE_BRANCH', () => {
        let disk_name: any = 'ssd'
        let branch: any = 'production'
        let expectedAction = {
            type: actions.CHANGE_BRANCH,
            disk_name,
            branch,
        }

        expect(actions.changeBranch(disk_name, branch)).toEqual(expectedAction)
    })

    test('FETCH_LATEST_REPORT', () => {
        let expectedAction = {
            type: actions.FETCH_LATEST_REPORT,
        }

        expect(actions.fetchLatestReport()).toEqual(expectedAction)
    })

    test('LATEST_REPORT_FETCHED', () => {
        let report: any = 'report'
        let expectedAction = {
            type: actions.LATEST_REPORT_FETCHED,
            report,
        }

        expect(actions.latestReportFetched(report)).toEqual(expectedAction)
    })

    test('FETCH_USER_REPORT', () => {
        let timescale: string = 'week'
        let username: null = null
        let expectedAction = {
            type: actions.FETCH_USER_REPORT,
            timescale,
            username,
        }

        expect(actions.fetchUserReport(timescale, username)).toEqual(
            expectedAction
        )
    })

    test('USER_REPORT_FETCHED', () => {
        let report: any = 'report'
        let expectedAction = {
            type: actions.USER_REPORT_FETCHED,
            report,
        }

        expect(actions.userReportFetched(report)).toEqual(expectedAction)
    })

    test('FETCH_REGION_REPORT', () => {
        let timescale: string = 'month'
        let expectedAction = {
            type: actions.FETCH_REGION_REPORT,
            timescale,
        }

        expect(actions.fetchRegionReport(timescale)).toEqual(expectedAction)
    })

    test('REGION_REPORT_FETCHED', () => {
        let report: any = {
            description: 'a useful report',
        }
        let expectedAction = {
            type: actions.REGION_REPORT_FETCHED,
            report,
        }

        expect(actions.regionReportFetched(report)).toEqual(expectedAction)
    })

    test('CHANGE_PAGE', () => {
        let page: string = 'analytics'
        let expectedAction = {
            type: actions.CHANGE_PAGE,
            page,
        }

        expect(actions.changePage(page)).toEqual(expectedAction)
    })

    test('FETCH_TOTAL_SIGNUPS', () => {
        // do something
        let expectedAction = {
            type: actions.FETCH_TOTAL_SIGNUPS,
        }

        expect(actions.fetchTotalSignups()).toEqual(expectedAction)
    })

    test('TOTAL_SIGNUPS_FETCHED', () => {
        let data: any = 'data'
        let expectedAction = {
            type: actions.TOTAL_SIGNUPS_FETCHED,
            data,
        }

        expect(actions.totalSignupsFetched(data)).toEqual(expectedAction)
    })

    test('FETCH_TOTAL_MINUTES', () => {
        let expectedAction = {
            type: actions.FETCH_TOTAL_MINUTES,
        }

        expect(actions.fetchTotalMinutes()).toEqual(expectedAction)
    })

    test('TOTAL_MINUTES_FETCHED', () => {
        let data: any = 'twenty minutes'
        let expectedAction = {
            type: actions.TOTAL_MINUTES_FETCHED,
            data,
        }

        expect(actions.totalMinutesFetched(data)).toEqual(expectedAction)
    })

    test('ANALYZE_LOGS', () => {
        let connection_id: any = 'id'
        let username: any = 'hello'
        let server_filename: any = 'server'
        let client_filename: any = 'client'
        let expectedAction = {
            type: actions.ANALYZE_LOGS,
            connection_id,
            username,
            server_filename,
            client_filename,
        }

        expect(
            actions.analyzeLogs(
                connection_id,
                username,
                server_filename,
                client_filename
            )
        ).toEqual(expectedAction)
    })

    test('STORE_LOG_ANALYSIS', () => {
        let payload_id: any = {}
        let payload: any = 'hi'
        let sender: string = 'fractal'
        let expectedAction = {
            type: actions.STORE_LOG_ANALYSIS,
            payload_id,
            payload,
            sender,
        }

        expect(actions.storeLogAnalysis(payload_id, payload, sender)).toEqual(
            expectedAction
        )
    })

    test('FETCH_LOGS_BY_CONNECTION', () => {
        let connection_id: any = 'id'
        let logs_not_found: boolean = false
        let fetch_all: boolean = false
        let last_log: boolean = true
        let expectedAction = {
            type: actions.FETCH_LOGS_BY_CONNECTION,
            connection_id,
            logs_not_found,
            fetch_all,
            last_log,
        }

        expect(
            actions.fetchLogsByConnection(
                connection_id,
                logs_not_found,
                fetch_all,
                last_log
            )
        ).toEqual(expectedAction)
    })

    test('FETCH_BOOKMARKED_LOGS', () => {
        let expectedAction = {
            type: actions.FETCH_BOOKMARKED_LOGS,
        }

        expect(actions.fetchBookmarkedLogs()).toEqual(expectedAction)
    })

    test('STORE_BOOKMARKED_LOGS', () => {
        let payload: any = 'payload'
        let expectedAction = {
            type: actions.STORE_BOOKMARKED_LOGS,
            payload,
        }

        expect(actions.storeBookmarkedLogs(payload)).toEqual(expectedAction)
    })

    test('BOOKMARK_LOGS', () => {
        let bookmark: boolean = true
        let connection_id: any = 'any'
        let expectedAction = {
            type: actions.BOOKMARK_LOGS,
            bookmark,
            connection_id,
        }

        expect(actions.bookmarkLogs(bookmark, connection_id)).toEqual(
            expectedAction
        )
    })

    test('CLEAR_LOGS', () => {
        let expectedAction = {
            type: actions.CLEAR_LOGS,
        }

        expect(actions.clearLogs()).toEqual(expectedAction)
    })
})
