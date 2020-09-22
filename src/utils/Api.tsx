import { config } from '../constants'

export async function apiPost(endpoint: any, body: any, token: any) {
    const response = await fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(body),
    })
    const json = await response.json()
    return { json, response }
}

export async function apiGet(endpoint: any, token: any) {
    const response = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    })
    const json = await response.json()
    return { json, response }
}

export async function fetchGraphQL(
    operationsDoc: any,
    operationName: any,
    variables: any
) {
    const response = await fetch(config.url.GRAPHQL, {
        method: 'POST',
        headers: {
            'x-hasura-admin-secret': config.graphQL.SECRET,
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
        }),
    })
    return response.json()
}
