/* eslint-disable no-shadow */
const {
    NODE_ENV = 'development',
    CONTEXT = 'production',
    URL = 'https://arnellebalane.com/',
    DEPLOY_URL = 'https://arnellebalane.com/',
    API_ENDPOINT = 'https://arnellebalane.com/api/',
    API_PAGE_FORMAT = '/pages/{page}.json',
    API_PATH_EXTENSION = '.json'
} = process.env;

export default {
    NODE_ENV,
    API_ENDPOINT,
    API_PAGE_FORMAT,
    API_PATH_EXTENSION,
    BASE_URL: (CONTEXT === 'production' ? URL : DEPLOY_URL).replace(/\/$/, '')
};
