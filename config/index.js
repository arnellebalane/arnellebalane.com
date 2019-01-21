/* eslint-disable no-shadow */
const {
    NODE_ENV = 'development',
    CONTEXT = 'production',
    URL = 'https://arnellebalane.com/',
    DEPLOY_URL = 'https://arnellebalane.com/',
    API_PAGE_FORMAT = '/pages/{page}.json'
} = process.env;

export default {
    NODE_ENV,
    API_PAGE_FORMAT,
    BASE_URL: (CONTEXT === 'production' ? URL : DEPLOY_URL).replace(/\/$/, '')
};
