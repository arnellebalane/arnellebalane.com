module.exports = events => {
    const now = new Date();

    return events.filter(event => {
        const eventDate = new Date(event.start_date);
        return eventDate < now;
    });
};
