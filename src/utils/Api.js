import { config } from '../constants'

export function apiPost(endpoint, body, token) {
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

export function apiGet(endpoint, token) {
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
