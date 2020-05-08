import * as AccountAction from '../actions/index'

const DEFAULT = {vm_info: [], authenticated: false, vmsUpdated: false, activityFetched: false, userActivity: [], 
  userTable: [], usersUpdated: false, access_token: '', refresh_token: '', login_attempts: 0, customers: [],
  vms_updating: [], logs: [], logs_fetched: false}

export default function(state = DEFAULT, action) {
  switch (action.type) {
    case AccountAction.AUTHENTICATE_USER:
      return {
        ...state,
        authenticated: action.authenticated
      }
    case AccountAction.LOAD_VMS:
      return {
        ...state,
        vm_info: action.payload,
        vmsUpdated: true
      }
    case AccountAction.UPDATE_DB:
      return {
        ...state,
        vmsUpdated: action.updated
      }
    case AccountAction.USER_ACTIVITY_FETCHED:
      return {
        ...state,
        activityFetched: true,
        userActivity: action.payload
      }
    case AccountAction.FETCH_USER_TABLE:
      return {
        ...state,
        usersUpdated: action.updated
      }
    case AccountAction.USER_TABLE_FETCHED:
      return {
        ...state,
        userTable: action.payload
      }
    case AccountAction.STORE_JWT:
      return {
        ...state,
        access_token: action.access_token,
        refresh_token: action.refresh_token
      }
    case AccountAction.INCREMENT_LOGIN_ATTEMPTS:
      return {
        ...state,
        login_attempts: state.login_attempts + 1
      }
    case AccountAction.STORE_CUSTOMERS:
      return {
        ...state,
        customers: action.customers
      }
    case AccountAction.START_VM:
      return {
        ...state,
        vms_updating: [...state.vms_updating, action.vm_name]
      }
    case AccountAction.DEALLOCATE_VM:
      return {
        ...state,
        vms_updating: [...state.vms_updating, action.vm_name]
      }
    case AccountAction.DONE_UPDATING:
      return {
        ...state,
        vms_updating: state.vms_updating.filter(vm => vm !== action.vm_name)
      }
    case AccountAction.STORE_LOGS:
      return {
        ...state,
        logs: action.logs,
        logs_fetched: true
      }
    case AccountAction.FETCH_USER_ACTIVITY:
      return {
        ...state,
        logs: [],
        logs_fetched: false
      }
    case AccountAction.LOGOUT:
      return DEFAULT
    default:
      return state
  }
}
