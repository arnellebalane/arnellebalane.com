import React from 'react';
import RepositoryCard from '@/components/RepositoryCard/RepositoryCard.tsx';
import shared from '@/stylesheets/pages.css';

const repositories = [{
    name: 'parcel-plugin-data-src',
    description: 'ParcelJS plugin to bundle resources defined in data-* attributes.',
    url: 'https://github.com/arnellebalane/parcel-plugin-data-src',
    language: 'JavaScript'
}, {
    name: 'hermes',
    description: 'Client-side messaging channel for sending data from one browser tab to another.',
    url: 'https://github.com/arnellebalane/hermes',
    language: 'JavaScript'
}, {
    name: 'master-tab',
    description: 'Controls which tab should be the master tab when opening a page in multiple browser tabs.',
    url: 'https://github.com/arnellebalane/master-tab',
    language: 'JavaScript'
}, {
    name: 'sublime-open-in-git-repository',
    description: 'Sublime Text plugin for opening the remote git url for the current file.',
    url:  'https://github.com/arnellebalane/sublime-open-in-git-repository',
    language: 'Python'
}];

export default function Repositories(props) {
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
};
