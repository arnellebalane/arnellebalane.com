import React from 'react';
import {Link} from 'react-router-dom';
import EventCard from '@/components/EventCard/EventCard.tsx';
import shared from '@/stylesheets/pages.css';

const events = [{
    title: 'Devfest GDayX Cebu 2017',
    date: 'November 2017',
    description: 'Gave a talk entitled “New Web Platform APIs”, showcasing the latest stable and experimental Web APIs.',
    url: 'https://www.meetup.com/GDGCebu/events/244106000/',
    details: [{
        type: 'slides',
        url: 'https://speakerdeck.com/arnellebalane/new-web-platform-apis'
    }]
}, {
    title: 'DevMeets: Firebase Workshop',
    date: 'August 2017',
    description: 'DevMeets is a workshop series by GDG Cebu, focusing on a specific technology every month.',
    url: 'https://www.meetup.com/GDGCebu/events/242373962/',
    details: []
}, {
    title: 'Google I/O 2017 Extended Tacloban',
    date: 'August 2017',
    description: 'Gave a talk about Firebase, giving an overview about the different services that it offers.',
    url: 'https://ioextended.gdgcebu.org/#leyte',
    details: [{
        type: 'slides',
        url: 'https://speakerdeck.com/arnellebalane/introduction-to-firebase'
    }]
}];

export default function Events() {
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
