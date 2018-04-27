const dataChanger = require('./utils/data-changer');

const dataPath = 'data/projects.json';
const endpoint = `/repos/arnellebalane/arnellebalane.com/contents/${dataPath}`;

exports.handler = async (event, context, callback) => {
    if (event.httpMethod !== 'POST') {
        return callback(null, { statusCode: 404 });
    }

    const body = JSON.parse(event.body);
    const { content, sha } = await dataChanger.getData(endpoint);

    const updated = [ body, ...content.slice(0, 2) ];
    const options = {
        path: dataPath,
        message: 'Updated projects.json data file',
        content: JSON.stringify(updated),
        sha
    };
    await dataChanger.setData(endpoint, options);

    callback(null, { statusCode: 200 });
};
