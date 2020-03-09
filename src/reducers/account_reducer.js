import * as AccountAction from '../actions/index'

const DEFAULT = {vm_info: [], authenticated: false}

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
    default:
      return state
  }
}
