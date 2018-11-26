const axios = require('axios');

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;

exports.getData = function getData(endpoint) {
    return axios.get(endpoint)
        .then(response => response.data)
        .then(data => {
            const content = Buffer.from(data.content, 'base64').toString('utf8');
            return {
                content: JSON.parse(content),
                sha: data.sha
            };
        });
};

exports.setData = function setData(endpoint, options) {
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
};
