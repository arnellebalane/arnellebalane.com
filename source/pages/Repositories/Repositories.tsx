import React from 'react';
import {withRouter} from 'react-router-dom';
import RepositoryCard from './components/RepositoryCard/RepositoryCard.tsx';
import useApiData from '@/lib/useApiData.tsx';
import shared from '@/stylesheets/pages.css';

function Repositories(props) {
    const {data: repositories} = useApiData('repositories', props.location);

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

export default withRouter(Repositories);
