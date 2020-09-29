// @ts-ignore
// eslint-disable-next-line
const production = {
    url: {
        PRIMARY_SERVER: 'main-webserver.tryfractal.com',
        WEBSITE_URL: 'https://fractal-dashboard.netlify.app',
    }
}

// @ts-ignore
const staging = {
    url: {
        PRIMARY_SERVER: 'https://staging-webserver.tryfractal.com',
        WEBSITE_URL: 'http://localhost:3000',
    }
}

// @ts-ignore
// eslint-disable-next-line
const local = {
    url: {
        PRIMARY_SERVER: 'http://127.0.0.1:7730',
        WEBSITE_URL: 'http://localhost:3000',
    }
}

// TODO undo me
export const config = process.env.NODE_ENV === 'development' ? local : local
