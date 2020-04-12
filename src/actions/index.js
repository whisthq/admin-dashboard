export const FETCH_VMS = "FETCH_VMS"
export const UPDATE_DB = "UPDATE_DB"
export const LOAD_VMS = "LOAD_VMS"
export const FETCH_DISK_TABLE = "FETCH_DISK_TABLE"
export const DISK_TABLE_FETCHED = "DISK_TABLE_FETCHED"
export const LOGIN_USER = "LOGIN_USER"
export const AUTHENTICATE_USER = "AUTHENTICATE_USER"
export const RESET_USER = "RESET_USER"
export const FETCH_USER_ACTIVITY = "FETCH_USER_ACTIVITY"
export const USER_ACTIVITY_FETCHED = "USER_ACTIVITY_FETCHED"
export const FETCH_USER_TABLE = "FETCH_USER_TABLE"
export const USER_TABLE_FETCHED = "USER_TABLE_FETCHED"
export const FETCH_CUSTOMER_TABLE = "FETCH_CUSTOMER_TABLE"
export const CUSTOMER_TABLE_FETCHED = "CUSTOMER_TABLE_FETCHED"
export const DELETE_USER = "DELETE_USER"
export const DELETE_SUBSCRIPTION = "DELETE_SUBSCRIPTION"

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

export function fetchDiskTable(updated) {
	return {
		type: FETCH_DISK_TABLE,
		updated
	}
}

export function diskTableFetched(payload) {
	return {
		type: DISK_TABLE_FETCHED,
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

export function fetchCustomerTable(updated) {
	return {
		type: FETCH_CUSTOMER_TABLE,
		updated
	}
}

export function customerTableFetched(payload) {
	return {
		type: CUSTOMER_TABLE_FETCHED,
		payload
	}
}

export function deleteSubscription(user) {
	return {
		type: DELETE_SUBSCRIPTION,
		user
	}
}