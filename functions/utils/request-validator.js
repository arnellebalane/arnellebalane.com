module.exports = function requestValidator(e) {
    return e.httpMethod === 'POST'
        && e.queryStringParameters['verify-token'] === process.env.WEBHOOK_VERIFY_TOKEN;
};
