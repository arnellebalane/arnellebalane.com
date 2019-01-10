import React from 'react';
import ProjectCard from '@/components/ProjectCard/ProjectCard.tsx';

const projects = [{
    title: 'Streaks',
    description: 'Keep track of anything using Github-style daily streaks.',
    url: 'https://streaks.patootie.app/',
    details: [{
        label: 'Roles',
        value: ['Design', 'Frontend Development', 'Implementation']
    }]
}, {
    title: 'mdi-cli',
    description: 'Generate Material Design icons from the command line.',
    url: 'https://www.npmjs.com/package/mdi-cli',
    details: [{
        label: 'Roles',
        value: ['CLI Design', 'Implementation']
    }]
}, {
    title: 'Endpoints',
    description: 'View and respond to requests on an HTTP endpoint, built in collaboration with @name3anad and @aldnav.',
    url: 'https://endpoints.uncaughtexception.wtf/',
    details: [{
        label: 'Roles',
        value: ['Design','Frontend Development']
    }, {
        label: 'Articles',
        value: [{
            text: 'Building the frontend for the Endpoints project',
            url: 'https://medium.com/uncaught-exception/building-the-frontend-for-the-endpoints-project-55e8d7cc97c6'
        }, {
            text: 'Building the backend for the Endpoints project',
            url: 'https://medium.com/uncaught-exception/building-the-backend-for-endpoints-project-837c906b8797'
        }]
    }]
}];

export default function Projects(props) {
    return (
        <div>
            <h1>Projects</h1>

            {projects.map(project => (
                <ProjectCard key={project.title} project={project} />
            ))}
        </div>
    );
};
