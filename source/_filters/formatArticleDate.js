const format = require('date-fns/format');

module.exports = date => {
    return format(date, 'MMMM d, yyyy');
};
