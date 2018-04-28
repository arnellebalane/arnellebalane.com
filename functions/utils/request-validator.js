module.exports = function requestValidator(event) {
    return event.httpMethod === 'POST'
        && event.queryStringParameters['verify-token'] === process.env.WEBHOOK_VERIFY_TOKEN;
};
