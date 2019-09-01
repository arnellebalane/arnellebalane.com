const format = require('date-fns/format');

module.exports = dateString => {
    const date = new Date(dateString);
    return format(date, 'MM/dd');
};
