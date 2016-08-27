var nconf = require('nconf');


nconf
    .argv()
    .env()
    .file({ file: 'config.json' })
    .defaults({
        PORT: 3000,
        NODE_ENV: 'development'
    });


module.exports = nconf;
