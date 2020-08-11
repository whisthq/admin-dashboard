import { config } from '../constants.js'

export function apiPost(endpoint, body, token) {
    // var base_url = 'https://cube-vm-server.herokuapp.com/form/store'
    // var full_url = `${base_url}${endpoint}`
    return fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'x-hasura-admin-secret': config.graphQL.SECRET,
        },
        body: JSON.stringify(body),
    }).then((response) => {
        return response.json().then((json) => ({ json, response }))
    })
}

export function apiGet(endpoint, token) {
    // var base_url = 'https://cube-vm-server.herokuapp.com/form/store'
    // var full_url = `${base_url}${endpoint}`
    return fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        return response.json().then((json) => ({ json, response }))
    })
}

export function fetchGraphQL(operationsDoc, operationName, variables) {
    return fetch(config.url.GRAPHQL, {
        method: 'POST',
        headers: {
            'x-hasura-admin-secret': config.graphQL.SECRET,
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
        }),
    }).then((response) => {
        return response.json()
    })
}
