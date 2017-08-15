const request = require('request');

const endpoint = 'https://api.github.com/users/arnellebalane/repos?sort=created&type=owner';

request.get(endpoint, (err, response, body) => {
    console.log(JSON.stringify(body, null, ' '.repeat(4)));
});
