module.exports = dateString => {
    const date = new Date(dateString);
    const month = String((date.getMonth() + 1)).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}`;
};
