import React from 'react';
import {Link} from 'react-router-dom';
import EventCard from './components/EventCard/EventCard.tsx';
import shared from '@/stylesheets/pages.css';

export default function Events() {
    const events = [];

    return (
        <div>
            <h1 className={shared.heading}>
                Events
            </h1>

            {events.map(eventItem => (
                <EventCard key={eventItem.title} event={eventItem} />
            ))}

            <Link className={shared.link} to="#">
                See older events
            </Link>
        </div>
    );
}
