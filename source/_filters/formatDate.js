const format = require('date-fns/format');

module.exports = (date, dateFormat) => {
    return format(new Date(date), dateFormat);
};
