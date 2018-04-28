const dataChanger = require('./utils/data-changer');

const dataPath = 'data/articles.json';
const endpoint = `/repos/arnellebalane/arnellebalane.com/contents/${dataPath}`;

exports.handler = (event, context, callback) => {
    if (event.httpMethod !== 'POST') {
        return callback(null, { statusCode: 404 });
    }

    dataChanger.getData(endpoint).then(({ content, sha }) => {
        const body = JSON.parse(event.body);
        const updated = [ body ];
        const options = {
            path: dataPath,
            message: 'Updated articles.json data file',
            content: JSON.stringify(updated, false, ' '.repeat(4)),
            sha
        };

        return dataChanger.setData(endpoint, options);
    }).then(() => callback(null, { statusCode: 200 }));
};
