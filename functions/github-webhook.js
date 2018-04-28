const axios = require('axios');

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;

const dataPath = 'data/projects.json';
const endpoint = `/repos/arnellebalane/arnellebalane.com/contents/${dataPath}`;

async function getData(endpoint) {
    const { data } = await axios.get(endpoint);
    const content = Buffer.from(data.content, 'base64').toString('utf8');

    return {
        sha: data.sha,
        content: JSON.parse(content)
    };
}

async function setData(endpoint, options) {
    await axios.put(endpoint, {
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

    const body = JSON.parse(event.body);
    const { content, sha } = await getData(endpoint);

    const updated = [ body, ...content.slice(0, 2) ];
    const options = {
        path: dataPath,
        message: 'Updated projects.json data file',
        content: JSON.stringify(updated),
        sha
    };
    await setData(endpoint, options);

    callback(null, { statusCode: 200 });
};
