import React from 'react';
import shared from '@/stylesheets/cards.css';

function EventCardDetail({detail}) {
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

export default function EventCard({event}) {
    const details = event.details;

    return (
        <article className={shared.card}>
            <a
                className={shared.link}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <h1 className={shared.title}>
                    {event.title}
                </h1>
            </a>

            <time className={shared.subtitle} dateTime={event.date}>
                {event.date}
            </time>

            <p className={shared.content}>
                {event.description}
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
};
