import React from 'react';
import {withRouter} from 'react-router-dom';
import EventCard from './components/EventCard/EventCard.tsx';
import PaginationLinks from '@/components/PaginationLinks/PaginationLinks.tsx';
import useApiData from '@/lib/useApiData.tsx';
import shared from '@/stylesheets/pages.css';

function Events(props) {
    const {
        data: events,
        nextPage,
        previousPage
    } = useApiData('events', props.location);

    return (
        <div>
            <h1 className={shared.heading}>
                Events
            </h1>

            {events.map(eventItem => (
                <EventCard key={eventItem.title} event={eventItem} />
            ))}

            <PaginationLinks
                label="events"
                nextPage={nextPage}
                previousPage={previousPage}
            />
        </div>
    );
}

export default withRouter(Events);
