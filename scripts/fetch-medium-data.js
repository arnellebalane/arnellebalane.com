#!/usr/bin/env node
const request = require('request');
const { format } = require('date-fns');
const { database } = require('../lib/firebase');
const config = require('../config');

const username = process.env.MEDIUM_USERNAME || 'arnelle-balane';
const endpoint = `https://medium.com/${username}/latest/`;

const options = {
    url: endpoint,
    headers: {
        'Accept': 'application/json'
    }
};
request(options, (err, response, body) => {
    const index = body.indexOf('{');
    const data = JSON.parse(body.substring(index));
    const dataCleaned = data.payload.posts.slice(0, 1).map((post) => ({
        title: post.title,
        url: `${config.get('BLOG_BASE_URL')}${post.uniqueSlug}`,
        date: format(new Date(post.firstPublishedAt), 'MMMM D, YYYY')
    }));
    database.ref('data/medium').set(dataCleaned)
        .then(() => process.exit());
});
