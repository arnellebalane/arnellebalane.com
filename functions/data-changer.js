const axios = require('axios');

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;

exports.getData = async function getData(endpoint) {
    const { data } = await axios.get(endpoint);
    const content = Buffer.from(data.content, 'base64').toString('utf8');

    return {
        sha: data.sha,
        content: JSON.parse(content)
    };
};

exports.setData = async function setData(endpoint, options) {
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
};
