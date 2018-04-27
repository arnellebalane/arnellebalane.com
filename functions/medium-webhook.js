const dataChanger = require('./utils/data-changer');

const dataPath = 'data/articles.json';
const endpoint = `/repos/arnellebalane/arnellebalane.com/contents/${dataPath}`;

exports.handler = async (event, context, callback) => {
    if (event.httpMethod !== 'POST') {
        return callback(null, { statusCode: 404 });
    }

    const body = JSON.parse(event.body);
    const { sha } = await dataChanger.getData(endpoint);

    const updated = [ body ];
    const options = {
        path: dataPath,
        message: 'Updated articles.json data file',
        content: JSON.stringify(updated),
        sha
    };
    await dataChanger.setData(endpoint, options);

    callback(null, { statusCode: 200 });
};
