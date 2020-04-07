const production = {
    url: {
        PRIMARY_SERVER: "https://cube-celery-vm.herokuapp.com"
    }
};

const staging = {
    url: {
        PRIMARY_SERVER: "https://cube-celery-staging.herokuapp.com"
    }
};

export const config = process.env.NODE_ENV === 'development' ? staging : production;