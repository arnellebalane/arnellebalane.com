var nconf = require('nconf');


nconf
    .argv()
    .env()
    .file({ file: 'config.json' })
    .defaults({
        PORT: 3000
    });


module.exports = nconf;
