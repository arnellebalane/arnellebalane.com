import React from 'react';
import shared from '@/stylesheets/cards.css';

export default function RepositoryCard({repository}) {
    return (
        <article className={shared.card}>
            <a
                className={shared.link}
                href={repository.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <h1 className={shared.title}>
                    {repository.name}
                </h1>
            </a>

            <small className={shared.subtitle}>
                {repository.language}
            </small>

            <p className={shared.content}>
                {repository.description}
            </p>
        </article>
    );
};
