const { database } = require('../firebase');

let talkData;
const talkDataRef = database.ref('data/talk');

talkDataRef.on('value', (snapshot) => {
    talkData = snapshot.val();
});

function getUpcomingTalk() {
    return new Promise((resolve, reject) => {
        if (talkData) {
            return resolve(talkData);
        }
        talkDataRef.once('value', (snapshot) => {
            talkData = snapshot.val();
            resolve(talkData);
        });
    });
}

exports.getUpcomingTalk = getUpcomingTalk;
