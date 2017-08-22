const request = require('request');

let latestEtag;
let responseCache;

const username = 'arnellebalane';
const endpoint = `https://api.github.com/users/${username}/repos?type=owner&sort=updated`;

function fetchRepositoriesActivity() {
    return new Promise((resolve, reject) => {
        const options = {
            url: endpoint,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': username
            }
        };
        if (latestEtag) {
            options.headers['If-None-Match'] = latestEtag;
        }

        request(options, (err, response, body) => {
            if (response.statusCode === 200) {
                latestEtag = response.headers.etag;
                responseCache = JSON.parse(body);
            }
            resolve(responseCache);
        });
    });
}

exports.fetchRepositoriesActivity = fetchRepositoriesActivity;
