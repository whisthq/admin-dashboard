// @ts-ignore
// eslint-disable-next-line
const production = {
    url: {
        PRIMARY_SERVER: 'https://cube-celery-staging.herokuapp.com',
        WEBSITE_URL: 'https://fractal-dashboard.netlify.app',
        GRAPHQL: 'https://newdb-wrapper.herokuapp.com/v1/graphql',
    },
    graphQL: {
        SECRET: 'Fractalcomputers!',
    },
    new_server: false,
}

// @ts-ignore
const staging = {
    url: {
        PRIMARY_SERVER: 'https://cube-celery-staging.herokuapp.com',
        WEBSITE_URL: 'http://localhost:3000',
        GRAPHQL: 'https://newdb-wrapper.herokuapp.com/v1/graphql',
    },
    graphQL: {
        SECRET: 'Fractalcomputers!',
    },
    new_server: true,
}

// @ts-ignore
// eslint-disable-next-line
const local = {
    url: {
        PRIMARY_SERVER: 'http://127.0.0.1:7730',
        WEBSITE_URL: 'http://localhost:3000',
        GRAPHQL: 'https://newdb-wrapper.herokuapp.com/v1/graphql',
    },
    graphQL: {
        SECRET: 'Fractalcomputers!',
    },
    new_server: true,
}

// @ts-ignore
// eslint-disable-next-line
const development = {
    url: {
        PRIMARY_SERVER: 'http://127.0.0.1:5000',
        WEBSITE_URL: 'http://localhost:3000',
        GRAPHQL: 'https://newdb-wrapper.herokuapp.com/v1/graphql',
    },
    graphQL: {
        SECRET: 'Fractalcomputers!',
    },
    new_server: true,
}

export const config = process.env.NODE_ENV === 'development' ? staging : staging
