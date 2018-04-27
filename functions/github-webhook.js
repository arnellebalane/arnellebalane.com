const axios = require('axios');

const DATA_PATH = 'data/projects.json';
const API_ENDPOINT = `/repos/arnellebalane/arnellebalane.com/contents/${DATA_PATH}`;

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;

async function getData() {
    const { data } = await axios.get(API_ENDPOINT);
    const content = Buffer.from(data.content, 'base64').toString('utf8');
    return {
        sha: data.sha,
        content: JSON.parse(content)
    };
}

async function setData(sha, data) {
    await axios.put(API_ENDPOINT, {
        path: DATA_PATH,
        message: 'Update projects.json data file',
        content: Buffer.from(data).toString('base64'),
        committer: {
            name: 'data[bot]',
            email: 'data[bot]@arnelle.me'
        },
        sha
    });
}

exports.handler = async (event, context, callback) => {
    if (event.httpMethod !== 'POST') {
        return callback(null, { statusCode: 404 });
    }

    const body = JSON.parse(event.body);
    const { content, sha } = await getData();

    const updated = [ body, ...content.slice(0, 2) ];
    await setData(sha, JSON.stringify(updated));

    callback(null, { statusCode: 200 });
};
