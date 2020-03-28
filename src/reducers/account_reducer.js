import * as AccountAction from '../actions/index'

const DEFAULT = {vm_info: [], authenticated: false, updated: false, activityFetched: false, userActivity: [], 
  userTable: [], usersUpdated: false}

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
        vm_info: action.payload
      }
    case AccountAction.UPDATE_DB:
      return {
        ...state,
        updated: action.updated
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
    default:
      return state
  }
}
