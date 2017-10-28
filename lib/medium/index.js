const { database } = require('../firebase');

let mediumData;
const mediumDataRef = database.ref('data/medium');

mediumDataRef.on('value', (snapshot) => {
    mediumData = snapshot.val();
});

function getLatestBlogPosts() {
    return new Promise((resolve, reject) => {
        if (mediumData) {
            return resolve(mediumData);
        }
        mediumDataRef.once('value', (snapshot) => {
            mediumData = snapshot.val();
            resolve(mediumData);
        });
    });
}

exports.getLatestBlogPosts = getLatestBlogPosts;
