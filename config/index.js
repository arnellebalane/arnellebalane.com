/* eslint-disable no-shadow */
const {
    NODE_ENV = 'development',
    CONTEXT = 'production',
    URL = 'https://arnellebalane.com/',
    DEPLOY_URL = 'https://arnellebalane.com/'
} = process.env;

export default {
    NODE_ENV,
    BASE_URL: (CONTEXT === 'production' ? URL : DEPLOY_URL).replace(/\/$/, '')
};
