const request = require('request');
const keyval = require('../keyval');

const username = 'arnellebalane';
const endpoint = `https://api.github.com/users/${username}/repos?type=owner&sort=updated`;

function getLatestRepositories() {
    return keyval.get('github').catch(() => {
        const options = {
            url: endpoint,
            headers: {
                'Accept': 'applicaiton/vnd.github.v3+json',
                'User-Agent': username
            }
        };
        return new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
                const data = JSON.parse(body);
                return keyval.set('github', data).then(resolve);
            });
        });
    });
}

function getFormattedLatestRepositories() {
    return getLatestRepositories().then((repositories) => {
        return repositories.map((repository) => ({
            name: repository.name,
            description: repository.description,
            url: repository.html_url
        }));
    });
}

exports.getLatestRepositories = getLatestRepositories;
exports.getFormattedLatestRepositories = getFormattedLatestRepositories;
