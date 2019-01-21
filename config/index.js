/* eslint-disable no-shadow, prefer-template */
const {
    NODE_ENV = 'development',
    CONTEXT = 'development',
    URL = 'http://localhost:8081',
    DEPLOY_URL = 'http://localhost:8081',
    API_PAGE_FORMAT = '/pages/{page}.json',
    API_PATH_EXTENSION = '.json'
} = process.env;

export default {
    NODE_ENV,
    API_PAGE_FORMAT,
    API_PATH_EXTENSION,
    API_ENDPOINT: (CONTEXT === 'production' ? URL : DEPLOY_URL) + '/api/',
    BASE_URL: (CONTEXT === 'production' ? URL : DEPLOY_URL).replace(/\/$/, '')
};
