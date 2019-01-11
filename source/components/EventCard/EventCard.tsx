import React from 'react';
import shared from '@/stylesheets/cards.css';

interface EventDetailType {
    type: string,
    url: string
}

interface EventType {
    title: string,
    date: string,
    description: string,
    url: string,
    details: Array<EventDetailType>
}

interface EventCardDetailProps {
    detail: EventDetailType
}

interface EventCardProps {
    event: EventType
}

function EventCardDetail({detail}: EventCardDetailProps) {
    if (detail.type === 'slides') {
        return (
            <a
                className={shared.detailValue}
                href={detail.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                View slides
            </a>
        );
    }
    return null;
}

export default function EventCard(props: EventCardProps) {
    const eventItem = props.event;
    const details = eventItem.details;

    return (
        <article className={shared.card}>
            <a
                className={shared.link}
                href={eventItem.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <h1 className={shared.title}>
                    {eventItem.title}
                </h1>
            </a>

            <time className={shared.subtitle} dateTime={eventItem.date}>
                {eventItem.date}
            </time>

            <p className={shared.content}>
                {eventItem.description}
            </p>

            {details && details.length > 0 && (
                <p className={shared.detail}>
                    {details.map((detail, i) => (
                        <EventCardDetail key={i} detail={detail} />
                    ))}
                </p>
            )}
        </article>
    );
}
