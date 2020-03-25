export const FETCH_VMS = "FETCH_VMS"
export const UPDATE_DB = "UPDATE_DB"
export const LOAD_VMS = "LOAD_VMS"
export const LOGIN_USER = "LOGIN_USER"
export const AUTHENTICATE_USER = "AUTHENTICATE_USER"
export const RESET_USER = "RESET_USER"
export const FETCH_USER_ACTIVITY = "FETCH_USER_ACTIVITY"
export const USER_ACTIVITY_FETCHED = "USER_ACTIVITY_FETCHED"

export function fetchVMs(id) {
	return {
		type: FETCH_VMS,
		id
	};
}

export function updateDB(updated) {
	return {
		type: UPDATE_DB,
		updated
	};
}

export function loadVMs(payload) {
	return {
		type: LOAD_VMS,
		payload
	}
}

export function loginUser(username, password) {
	return {
		type: LOGIN_USER,
		username,
		password
	}
}

export function authenticateUser() {
	return {
		type: AUTHENTICATE_USER
	}
}

export function resetUser(vm_name, username) {
	return {
		type: RESET_USER,
		vm_name, username
	}
}

export function fetchUserActivity() {
	return {
		type: FETCH_USER_ACTIVITY
	}
}

export function userActivityFetched(payload) {
	return {
		type: USER_ACTIVITY_FETCHED,
		payload
	}
}