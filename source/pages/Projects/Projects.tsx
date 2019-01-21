import React from 'react';
import {withRouter} from 'react-router-dom';
import ProjectCard from './components/ProjectCard/ProjectCard.tsx';
import useApiData from '@/lib/useApiData.tsx';
import shared from '@/stylesheets/pages.css';

function Projects(props) {
    const {data: projects} = useApiData('projects', props.location);

    return (
        <div>
            <h1 className={shared.heading}>
                Projects
            </h1>

            {projects.map(project => (
                <ProjectCard key={project.title} project={project} />
            ))}
        </div>
    );
}

export default withRouter(Projects);
