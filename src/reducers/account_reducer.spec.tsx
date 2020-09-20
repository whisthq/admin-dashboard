import accountReducer from "./account_reducer"
import * as AccountAction from '../actions/index'

/*
Helpful materials on testing: https://redux.js.org/recipes/writing-tests/
Go down to reducers in the source above.

This is an implicit expression of the spec. Since the redux code for reducers and actions is very simple
there is little functionality to really "test." The goal, instead, is to evince a specification. 

Since there are
just such a large number of constants etc... whatever (reducers, but even more actions in the actions index) it's
not really reasonable to write them down additionally to tests (noting that they are super simply too, 
the tests basically show us the spec outright).

This framework relies on src/actions/index.tsx working

We use empty starting states to easily check for diffs specifically.
More complex tests can be added that use other starting states.
*/

describe("Account reducer", () => {
    // carbon copy of DFEAULT in account_reducer...
    // to avoid exporting this in account_reducer we replicate it here
    const DEFAULT_STATE: any = {
        vm_info: [],
        authenticated: false,
        vmsUpdated: false,
        activityFetched: false,
        userActivity: [],
        userTable: [],
        usersUpdated: false,
        access_token: '',
        refresh_token: '',
        login_attempts: 0,
        customers: [],
        vms_updating: [],
        logs: [],
        logs_fetched: false,
        logs_not_found: false,
        disk_info: [],
        disks_fetched: false,
        latestReport: null,
        userReport: null,
        regionReport: null,
        page: 'dashboard',
        totalSignups: null,
        totalMinutes: null,
        log_analysis: {},
        bookmarked_log_ids: [],
    }

    // testData that is looped through in various tests
    // the format should be clear (action is the type of action, actionMessage is the action object, 
    // startState -> endState are the states)
    // for each test the description says that it is of type action and perhaps a small parenthetical for various cases
    // and then passes in the action message and sees of the output from the reducer (with startState as the state)
    // is the endState (expected state)
    const testData = [
        {
            action: AccountAction.AUTHENTICATE_USER,
            actionMessage: AccountAction.authenticateUser(
                true // TODO (adriano) if you are a little ingenous you can avoid copying code here
            ),
            startState: {},
            endState: { 
                authenticated : true
            },

        },
        {
            action: AccountAction.LOAD_VMS,
            actionMessage: AccountAction.loadVMs(
                "payload"
            ),
            startState: {},
            endState: {
                vm_info: "payload",
                vmsUpdated: true, 
            },
        },
        {
            action: AccountAction.FETCH_DISK_TABLE,
            actionMessage: AccountAction.fetchDiskTable(
                false
            ),
            startState: {},
            endState: {
                disks_fetched: false,
            },
        },
        {
            action: AccountAction.DISK_TABLE_FETCHED,
            actionMessage: AccountAction.diskTableFetched(
                "payload"
            ),
            startState: {},
            endState: {
                disk_info: "payload",
                disks_fetched: true,
            },
        },
        {
            action: AccountAction.FETCH_VMS,
            actionMessage: AccountAction.fetchVMs(
                true
            ),
            startState: {},
            endState: {
                vmsUpdated: true
            },
        },
        {
            action: AccountAction.USER_ACTIVITY_FETCHED,
            actionMessage: AccountAction.userActivityFetched(
                "payload"
            ),
            startState: {},
            endState: {
                activityFetched: true,
                userActivity: "payload"
            },
        },
        {
            action: AccountAction.FETCH_USER_TABLE,
            actionMessage: AccountAction.fetchUserTable(
                true
            ),
            startState: {},
            endState: {
                usersUpdated: true
            },
        },
        {
            action: AccountAction.USER_TABLE_FETCHED,
            actionMessage: AccountAction.userTableFetched(
                "payload"
            ),
            startState: {},
            endState: {
                userTable: "payload"
            },
        },
        {
            action: AccountAction.STORE_JWT,
            actionMessage: AccountAction.storeJWT(
                "access",
                "refresh"
            ),
            startState: {},
            endState: {
                access_token: "access",
                refresh_token: "refresh",
            },
        },
        {
            action: AccountAction.INCREMENT_LOGIN_ATTEMPTS,
            actionMessage: AccountAction.incrementLoginAttempts(),
            startState: {login_attempts: 0},
            endState: {
                login_attempts: 1
            },
        },
        {
            action: AccountAction.STORE_CUSTOMERS,
            actionMessage: AccountAction.storeCustomers(
                "customers"
            ),
            startState: {},
            endState: {
                customers: "customers"
            },
        },
        {
            action: `${AccountAction.START_VM} (updating)`,
            actionMessage: AccountAction.startVM(
                "vm_name"
            ),
            startState: {"vms_updating" : []},
            endState: {
                vms_updating: ["vm_name"]
            },
        },
        {
            action: `${AccountAction.START_VM} (not updating)`,
            actionMessage: AccountAction.startVM(
                "vm_name"
            ),
            startState: {},
            endState: {
                vms_updating: []
            },
        },
        {
            action: `${AccountAction.DEALLOCATE_VM} (updating)`,
            actionMessage: AccountAction.deallocateVM(
                "vm_name"
            ),
            startState: { "vms_updating": []},
            endState: {
                vms_updating: ["vm_name"]
            },
        },
        {
            action: `${AccountAction.DEALLOCATE_VM} (not updating)`,
            actionMessage: AccountAction.deallocateVM(
                "vm_name"
            ),
            startState: { },
            endState: {
                vms_updating: []
            },
        },
        {
            action: `${AccountAction.DONE_UPDATING} (updating)`,
            actionMessage: AccountAction.doneUpdating(
                "vm_name"
            ),
            startState: { "vms_updating": ["vm_name"] },
            endState: {
                "vms_updating" : []
            },
        },
        {
            action: `${AccountAction.DONE_UPDATING} (not updating)`,
            actionMessage: AccountAction.doneUpdating(
                "vm_name"
            ),
            startState: {},
            endState: {
                "vms_updating": []
            },
        },
        {
            action: AccountAction.STORE_LOGS,
            actionMessage: AccountAction.storeLogs(
                [], // TODO (adriano) make this have an actual never type that doesn't error or loop forever
                false,
                false
            ),
            startState: {logs: ["log"]},
            endState: {
                logs: ["log"],
                logs_fetched: false,
                logs_not_found: false,
            },
        },
        {
            action: AccountAction.FETCH_USER_ACTIVITY,
            actionMessage: AccountAction.fetchUserActivity(),
            startState: {},
            endState: {
                logs: []
            },
        },
        {
            action: AccountAction.FETCH_LOGS,
            actionMessage: AccountAction.fetchLogs(
                "username",
                true,
                true
            ),
            startState: {},
            endState: {
                logs_fetched: false, // these are constants
                logs_not_found: false, // ...
                logs: [],
            },
        },
        {
            action: AccountAction.LOGS_FOUND,
            actionMessage: AccountAction.logsFound(
                false
            ),
            startState: {},
            endState: {
                logs_not_found: false
            },
        },
        {
            action: `${AccountAction.DELETE_LOG_SUCCESS} (logs arethere)`,
            actionMessage: AccountAction.deleteLogSuccess(
                "connection_id"
            ),
            startState: {
                logs: [
                    {
                        connection_id: "connection_id"
                    },
                    {
                        connection_id: "other connection_id"
                    }
                ]
            },
            endState: {
                logs: [
                    {
                        connection_id: "other connection_id"
                    }
                ]
            },
        },
        {
            action: `${AccountAction.DELETE_LOG_SUCCESS} (logs are not there)`,
            actionMessage: AccountAction.deleteLogSuccess(
                "connection_id"
            ),
            startState: {},
            endState: {
                logs: []
            },
        },
        {
            action: AccountAction.LATEST_REPORT_FETCHED,
            actionMessage: AccountAction.latestReportFetched(
                "report"
            ),
            startState: {},
            endState: {
                latestReport: "report"
            },
        },
        {
            action: AccountAction.USER_REPORT_FETCHED,
            actionMessage: AccountAction.userReportFetched(
                "report"
            ),
            startState: {},
            endState: {
                userReport: "report"
            },
        },
        {
            action: AccountAction.REGION_REPORT_FETCHED,
            actionMessage: AccountAction.regionReportFetched(
                "report"
            ),
            startState: {},
            endState: {
                regionReport: "report"
            },
        },
        {
            action: AccountAction.TOTAL_SIGNUPS_FETCHED,
            actionMessage: AccountAction.totalSignupsFetched(
                3
            ),
            startState: {},
            endState: {
                totalSignups: 3
            },
        },
        {
            action: AccountAction.TOTAL_MINUTES_FETCHED,
            actionMessage: AccountAction.totalMinutesFetched(
                10
            ),
            startState: {},
            endState: {
                totalMinutes: 10
            },
        },
        {
            action: AccountAction.CHANGE_PAGE,
            actionMessage: AccountAction.changePage(
                "page"
            ),
            startState: {},
            endState: {
                page: "page"
            },
        },
        {
            action: `${AccountAction.STORE_LOG_ANALYSIS} (previous analysis with key)`,
            actionMessage: AccountAction.storeLogAnalysis(
                "payload id",
                "payload",
                "sender"
            ),
            startState: {
                log_analysis: {
                    "payload id": {
                        "do not": "delete me"
                    }
                }
            },
            endState: {
                log_analysis: {
                    "payload id": {
                        "do not": "delete me",
                        "sender": "payload"
                    }
                }
            },
        },
        {
            action: `${AccountAction.STORE_LOG_ANALYSIS} (previous analysis no key)`,
            actionMessage: AccountAction.storeLogAnalysis(
                "payload id",
                "payload",
                "sender"
            ),
            startState: {
                log_analysis: {
                    "other payload id": {}
                }
            },
            endState: {
                log_analysis: {
                    "other payload id": {},
                    "payload id": {
                        "sender" : "payload"
                    }
                }
            },
        },
        {
            action: `${AccountAction.STORE_LOG_ANALYSIS} (no previous analysis)`,
            actionMessage: AccountAction.storeLogAnalysis(
                "payload id",
                "payload",
                "sender"
            ),
            startState: {},
            endState: {
                log_analysis: {}
            },
        },
        {
            action: AccountAction.STORE_BOOKMARKED_LOGS,
            actionMessage: AccountAction.storeBookmarkedLogs(
                []
            ),
            startState: {},
            endState: {
                bookmarked_log_ids: []
            },
        },
        {
            action: AccountAction.CLEAR_LOGS,
            actionMessage: AccountAction.clearLogs(),
            startState: {},
            endState: {
                logs: []
            },
        },
        {
            action: AccountAction.FETCH_LOGS_BY_CONNECTION,
            actionMessage: AccountAction.fetchLogsByConnection(
                "connection_id",
                false,
                false,
                false
            ),
            startState: {},
            endState: {
                logs_fetched: false
            },
        },
        {
            action: AccountAction.LOGOUT,
            actionMessage: AccountAction.logout(),
            startState: {},
            endState: DEFAULT_STATE,
        },
        {
            action: null, // check that the state doesn't change on default switch
            actionMessage: {
                type: null
            }, // do nothing
            startState: {},
            endState: {}
        },
    ]


    
    for(let i = 0; i < testData.length; ++i) {
        let testParams = testData[i]
        test(`testing whether ${
                testParams.action == null ? "default action" : testParams.action
            } reducer follows the spec`, () => {
            // test starts here

            expect(
                accountReducer(
                    testParams.startState, testParams.actionMessage
                )
            ).toEqual(testParams.endState)
        })
    }
})
