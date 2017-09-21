const request = require('request');
const { format } = require('date-fns');
const keyval = require('../keyval');

const username = 'arnelle-balane';
const endpoint = `https://medium.com/${username}/latest/`;

function fetchLatestBlogPosts() {
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
}

function insertLatestBlogPost(post) {
    return keyval.get('medium')
        .then((posts) => {
            posts = [post, ...posts];
            return keyval.set('medium', posts);
        })
        .catch(fetchLatestBlogPosts);
}

function getLatestBlogPosts() {
    return keyval.get('medium').catch(fetchLatestBlogPosts);
}

function getFormattedLatestBlogPosts() {
    return getLatestBlogPosts().then((posts) => {
        return posts.map((post) => ({
            title: post.title,
            url: `https://blog.arnellebalane.com/${post.uniqueSlug}`,
            date: format(new Date(post.firstPublishedAt), 'MMMM D, YYYY')
        }));
    });
}

exports.fetchLatestBlogPosts = fetchLatestBlogPosts;
exports.insertLatestBlogPost = insertLatestBlogPost;
exports.getLatestBlogPosts = getLatestBlogPosts;
exports.getFormattedLatestBlogPosts = getFormattedLatestBlogPosts;
