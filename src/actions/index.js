export const FETCH_VMS = "FETCH_VMS"
export const UPDATE_DB = "UPDATE_DB"
export const LOAD_VMS = "LOAD_VMS"
export const LOGIN_USER = "LOGIN_USER"
export const AUTHENTICATE_USER = "AUTHENTICATE_USER"
export const RESET_USER = "RESET_USER"
export const FETCH_USER_ACTIVITY = "FETCH_USER_ACTIVITY"
export const USER_ACTIVITY_FETCHED = "USER_ACTIVITY_FETCHED"
export const FETCH_USER_TABLE = "FETCH_USER_TABLE"
export const USER_TABLE_FETCHED = "USER_TABLE_FETCHED"
export const DELETE_USER = "DELETE_USER"
export const DELETE_SUBSCRIPTION = "DELETE_SUBSCRIPTION"
export const STORE_JWT = "STORE_JWT"
export const LOGOUT = "LOGOUT"
export const INCREMENT_LOGIN_ATTEMPTS = "INCREMENT_LOGIN_ATTEMPTS"
export const FETCH_CUSTOMERS = "FETCH_CUSTOMERS"
export const STORE_CUSTOMERS = "STORE_CUSTOMERS"
export const START_VM = "START_VM"
export const DEALLOCATE_VM = "DEALLOCATE_VM"
export const DONE_UPDATING = "DONE_UPDATING"
export const FETCH_LOGS = "FETCH_LOGS"
export const FETCH_ALL_LOGS = "FETCH_ALL_LOGS"
export const STORE_LOGS = "STORE_LOGS"
export const LOGS_FOUND = "LOGS_FOUND"


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

export function authenticateUser(authenticated) {
	return {
		type: AUTHENTICATE_USER,
		authenticated
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

export function fetchUserTable(updated) {
	return {
		type: FETCH_USER_TABLE,
		updated
	}
}

export function userTableFetched(payload) {
	return {
		type: USER_TABLE_FETCHED,
		payload
	}
}

export function deleteUser(user) {
	return {
		type: DELETE_USER,
		user
	}
}

export function deleteSubscription(user) {
	return {
		type: DELETE_SUBSCRIPTION,
		user
	}
}

export function storeJWT(access_token, refresh_token) {
	return {
		type: STORE_JWT,
		access_token,
		refresh_token
	}
}

export function logout() {
	return {
		type: LOGOUT
	}
}

export function incrementLoginAttempts() {
	return {
		type: INCREMENT_LOGIN_ATTEMPTS
	}
}

export function fetchCustomers() {
	return {
		type: FETCH_CUSTOMERS
	}
}

export function storeCustomers(customers) {
	return {
		type: STORE_CUSTOMERS,
		customers
	}
}

export function startVM(vm_name) {
	return {
		type: START_VM,
		vm_name
	}
}

export function deallocateVM(vm_name) {
	return {
		type: DEALLOCATE_VM,
		vm_name
	}
}

export function doneUpdating(vm_name) {
	return {
		type: DONE_UPDATING,
		vm_name
	}
}

export function fetchLogs(username, logs_not_found, fetch_all) {
	return {
		type: FETCH_LOGS,
		username,
		logs_not_found,
		fetch_all
	}
}

export function storeLogs(logs, logs_not_found) {
	return {
		type: STORE_LOGS,
		logs,
		logs_not_found
	}
}

export function logsFound(found) {
	return {
		type: LOGS_FOUND,
		found
	}
}
