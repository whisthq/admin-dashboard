export const FETCH_VMS = "FETCH_VMS"
export const UPDATE_DB = "UPDATE_DB"
export const LOAD_VMS = "LOAD_VMS"
export const LOGIN_USER = "LOGIN_USER"
export const AUTHENTICATE_USER = "AUTHENTICATE_USER"

export function fetchVMs(id) {
	return {
		type: FETCH_VMS,
		id
	};
}

export function updateDB() {
	console.log("Update DB action caught")
	return {
		type: UPDATE_DB,
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