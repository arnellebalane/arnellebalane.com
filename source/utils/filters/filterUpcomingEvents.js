module.exports = events => {
    const now = new Date();

    const indexOfPastEvent = events.findIndex(event => {
        const eventDate = new Date(event.start_date);
        return eventDate < now;
    });

    return events.slice(0, indexOfPastEvent).reverse();
};
