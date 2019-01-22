import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import EventCard from './components/EventCard/EventCard.tsx';
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

            <div className={shared.links}>
                {previousPage && (
                    <Link
                        className={[shared.link, shared.previousLink].join(' ')}
                        to={previousPage}
                    >
                        See older events
                    </Link>
                )}

                {nextPage && (
                    <Link
                        className={[shared.link, shared.nextLink].join(' ')}
                        to={nextPage}
                    >
                        See newer events
                    </Link>
                )}
            </div>
        </div>
    );
}

export default withRouter(Events);
