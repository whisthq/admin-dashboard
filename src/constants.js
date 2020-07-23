/* eslint-disable no-unused-vars */
const production = {
    url: {
        PRIMARY_SERVER: 'https://cube-celery-staging.herokuapp.com',
        WEBSITE_URL: 'https://fractal-dashboard.netlify.app',
    },
    new_server: false,
}

const staging = {
    url: {
        PRIMARY_SERVER: 'https://cube-celery-staging.herokuapp.com',
        WEBSITE_URL: 'http://localhost:3000',
    },
    new_server: true,
}

const staging2 = {
    url: {
        PRIMARY_SERVER: 'https://cube-celery-staging2.herokuapp.com',
        WEBSITE_URL: 'http://localhost:3000',
    },
    new_server: false,
}

const local = {
    url: {
        PRIMARY_SERVER: 'http://127.0.0.1:7730',
        WEBSITE_URL: 'http://localhost:3000',
    },
    new_server: true,
}

const development = {
    url: {
        PRIMARY_SERVER: 'http://127.0.0.1:5000',
        WEBSITE_URL: 'http://localhost:3000',
    },
    new_server: true,
}

export const config = process.env.NODE_ENV === 'development' ? local : staging
