import * as AccountAction from '../actions/index'

const DEFAULT = {vm_info: [], authenticated: false, vmsUpdated: false, activityFetched: false, userActivity: [], 
  userTable: [], usersUpdated: false, access_token: '', refresh_token: ''}

export default function(state = DEFAULT, action) {
  switch (action.type) {
    case AccountAction.AUTHENTICATE_USER:
      return {
        ...state,
        authenticated: true
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
    case AccountAction.LOGOUT:
      return DEFAULT
    default:
      return state
  }
}
