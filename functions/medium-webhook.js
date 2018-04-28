const axios = require('axios');

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;

const dataPath = 'data/articles.json';
const endpoint = `/repos/arnellebalane/arnellebalane.com/contents/${dataPath}`;

function getData(endpoint) {
    return axios.get(endpoint)
        .then(response => response.data)
        .then(data => ({
            content: Buffer.from(data.content, 'base64').toString('utf8'),
            sha: data.sha
        }));
}

function setData(endpoint, options) {
    return axios.put(endpoint, {
        path: options.path,
        message: options.message,
        content: Buffer.from(options.content).toString('base64'),
        committer: {
            name: 'data[bot]',
            email: 'data[bot]@arnelle.me'
        },
        sha: options.sha
    });
}

exports.handler = async (event, context, callback) => {
    if (event.httpMethod !== 'POST') {
        return callback(null, { statusCode: 404 });
    }

    getData(endpoint).then(({ content, sha }) => {
        const body = JSON.parse(event.body);
        const updated = [ body ];
        const options = {
            path: dataPath,
            message: 'Updated articles.json data file',
            content: JSON.stringify(updated),
            sha
        };

        return setData(endpoint, options);
    }).then(() => callback(null, { statusCode: 200 }));
};
