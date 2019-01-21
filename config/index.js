/* eslint-disable no-shadow, prefer-template */
const {
    NODE_ENV = 'development',
    CONTEXT = 'development',
    URL = 'http://localhost:8081',
    DEPLOY_URL = 'http://localhost:8081',
    API_PAGE_FORMAT = '/pages/{page}.json',
    API_PATH_EXTENSION
} = process.env;

export default {
    NODE_ENV,
    API_PAGE_FORMAT,

    /*
     * Manually checking the env variable here, since I can't rely on empty
     * strings for there values because they seem to be ignored. Therefore I'm
     * just manually setting the default value when the provided value matches
     * some known constant.
     */
    API_PATH_EXTENSION: API_PATH_EXTENSION === '[none]' ? '' : '.json',

    API_ENDPOINT: (CONTEXT === 'production' ? URL : DEPLOY_URL) + '/api/',
    BASE_URL: (CONTEXT === 'production' ? URL : DEPLOY_URL).replace(/\/$/, '')
};
