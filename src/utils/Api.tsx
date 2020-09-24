// TODO (adriano) consider unit/integration testing this but will require many mocks

export function apiPost(endpoint: any, body: any, token: any) {
    return fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(body),
    }).then((response) => {
        return response.json().then((json) => ({ json, response }))
    })
}

export function apiGet(endpoint: any, token: any) {
    return fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    }).then((response) => {
        return response.json().then((json) => ({ json, response }))
    })
}
