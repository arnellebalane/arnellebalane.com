#!/usr/bin/env node
const request = require('request');
const { database } = require('../lib/firebase');

const username = 'arnellebalane';
const endpoint = `https://api.github.com/users/${username}/repos?type=owner&sort=created`;

const options = {
    url: endpoint,
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': username
    }
};
request(options, (err, response, body) => {
    const data = JSON.parse(body);
    const dataCleaned = data.slice(0, 3).map((repository) => ({
        name: repository.name,
        description: repository.description || '',
        url: repository.html_url
    }));
    database.ref('data/github').set(dataCleaned)
        .then(() => process.exit(0));
});
