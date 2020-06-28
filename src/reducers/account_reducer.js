import * as AccountAction from '../actions/index'

const DEFAULT = {
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

export default function (state = DEFAULT, action) {
    switch (action.type) {
        case AccountAction.AUTHENTICATE_USER:
            return {
                ...state,
                authenticated: action.authenticated,
            }
        case AccountAction.LOAD_VMS:
            return {
                ...state,
                vm_info: action.payload,
                vmsUpdated: true,
            }
        case AccountAction.FETCH_DISK_TABLE:
            return {
                ...state,
                disks_fetched: action.updated,
            }
        case AccountAction.DISK_TABLE_FETCHED:
            return {
                ...state,
                disk_info: action.payload,
                disks_fetched: true,
            }
        case AccountAction.UPDATE_DB:
            return {
                ...state,
                vmsUpdated: action.updated,
            }
        case AccountAction.USER_ACTIVITY_FETCHED:
            return {
                ...state,
                activityFetched: true,
                userActivity: action.payload,
            }
        case AccountAction.FETCH_USER_TABLE:
            return {
                ...state,
                usersUpdated: action.updated,
            }
        case AccountAction.USER_TABLE_FETCHED:
            return {
                ...state,
                userTable: action.payload,
            }
        case AccountAction.STORE_JWT:
            return {
                ...state,
                access_token: action.access_token,
                refresh_token: action.refresh_token,
            }
        case AccountAction.INCREMENT_LOGIN_ATTEMPTS:
            return {
                ...state,
                login_attempts: state.login_attempts + 1,
            }
        case AccountAction.STORE_CUSTOMERS:
            return {
                ...state,
                customers: action.customers,
            }
        case AccountAction.START_VM:
            return {
                ...state,
                vms_updating: state.vms_updating
                    ? [...state.vms_updating, action.vm_name]
                    : [],
            }
        case AccountAction.DEALLOCATE_VM:
            return {
                ...state,
                vms_updating: state.vms_updating
                    ? [...state.vms_updating, action.vm_name]
                    : [],
            }
        case AccountAction.DONE_UPDATING:
            return {
                ...state,
                vms_updating: state.vms_updating
                    ? state.vms_updating.filter((vm) => vm !== action.vm_name)
                    : [],
            }
        case AccountAction.STORE_LOGS:
            console.log(action)
            return {
                ...state,
                logs: [...state.logs, ...action.logs],
                logs_fetched: action.last_log,
                logs_not_found: action.logs_not_found,
            }
        case AccountAction.FETCH_USER_ACTIVITY:
            return {
                ...state,
                logs: [],
            }
        case AccountAction.FETCH_LOGS:
            return {
                ...state,
                logs_fetched: false,
                logs_not_found: false,
            }
        case AccountAction.LOGS_FOUND:
            return {
                ...state,
                logs_not_found: action.found,
            }
        case AccountAction.DELETE_LOG_SUCCESS:
            return {
                ...state,
                logs: state.logs
                    ? state.logs.filter(
                          (log) => log.connection_id !== action.connection_id
                      )
                    : [],
            }
        case AccountAction.LATEST_REPORT_FETCHED:
            return {
                ...state,
                latestReport: action.report,
            }
        case AccountAction.USER_REPORT_FETCHED:
            return {
                ...state,
                userReport: action.report,
            }
        case AccountAction.REGION_REPORT_FETCHED:
            return {
                ...state,
                regionReport: action.report,
            }
        case AccountAction.TOTAL_SIGNUPS_FETCHED:
            return {
                ...state,
                totalSignups: action.data,
            }
        case AccountAction.TOTAL_MINUTES_FETCHED:
            return {
                ...state,
                totalMinutes: action.data,
            }
        case AccountAction.CHANGE_PAGE:
            return {
                ...state,
                page: action.page,
            }
        case AccountAction.STORE_LOG_ANALYSIS:
            const payload_id = action.payload_id
            const sender = action.sender
            return {
                ...state,
                log_analysis: state.log_analysis
                    ? {
                          ...state.log_analysis,
                          [payload_id]: {
                              ...state.log_analysis[payload_id],
                              [sender]: action.payload,
                          },
                      }
                    : {},
            }
        case AccountAction.STORE_BOOKMARKED_LOGS:
            return {
                ...state,
                bookmarked_log_ids: action.payload,
            }
        case AccountAction.CLEAR_LOGS:
            return {
                ...state,
                logs: [],
            }
        case AccountAction.FETCH_LOGS_BY_CONNECTION:
            return {
                ...state,
                logs_fetched: false,
            }
        case AccountAction.LOGOUT:
            return DEFAULT
        default:
            return state
    }
}
