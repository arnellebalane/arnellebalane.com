import React from 'react';
import RepositoryCard from './components/RepositoryCard/RepositoryCard.tsx';
import shared from '@/stylesheets/pages.css';

export default function Repositories() {
    const repositories = [];

    return (
        <div>
            <h1 className={shared.heading}>
                Repositories
            </h1>

            {repositories.map(repository => (
                <RepositoryCard key={repository.name} repository={repository} />
            ))}

            <a
                className={shared.link}
                href="https://github.com/arnellebalane?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
            >
                See more repositories
            </a>
        </div>
    );
}
