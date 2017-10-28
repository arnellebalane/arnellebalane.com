const { database } = require('../firebase');

let githubData;
const githubDataRef = database.ref('data/github');

githubDataRef.on('value', (snapshot) => {
    githubData = snapshot.val();
});

function getLatestRepositories() {
    return new Promise((resolve, reject) => {
        if (githubData) {
            return resolve(githubData);
        }
        githubDataRef.once('value', (snapshot) => {
            githubData = snapshot.val();
            resolve(githubData);
        });
    });
}

exports.getLatestRepositories = getLatestRepositories;
