import React from 'react';
import ProjectCard from './components/ProjectCard/ProjectCard.tsx';
import shared from '@/stylesheets/pages.css';

export default function Projects() {
    const projects = [];

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
