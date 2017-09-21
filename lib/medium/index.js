const request = require('request');
const keyval = require('../keyval');

const username = 'arnelle-balane';
const endpoint = `https://medium.com/${username}/latest/`;

function getLatestBlogPosts() {
    return keyval.get('medium').catch(() => {
        const options = {
            url: endpoint,
            headers: {
                'Accept': 'application/json'
            }
        };
        return new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
                const index = body.indexOf('{');
                const data = JSON.parse(body.substring(index));
                return keyval.set('medium', data.payload.posts).then(resolve);
            });
        });
    });
}

exports.getLatestBlogPosts = getLatestBlogPosts;
