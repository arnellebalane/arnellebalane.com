const requestValidator = require('./utils/request-validator');
const dataChanger = require('./utils/data-changer');

const dataPath = 'data/projects.json';
const endpoint = `/repos/arnellebalane/arnellebalane.com/contents/${dataPath}`;

exports.handler = (e, context, callback) => {
    if (!requestValidator(e)) {
        return callback(null, {statusCode: 400});
    }

    return dataChanger.getData(endpoint).then(({content, sha}) => {
        const body = JSON.parse(e.body);
        const updated = [body, ...content.slice(0, 2)];
        const options = {
            path: dataPath,
            message: 'Updated projects.json data file',
            content: JSON.stringify(updated, false, ' '.repeat(4)),
            sha
        };

        return dataChanger.setData(endpoint, options);
    }).then(() => callback(null, {statusCode: 200}));
};