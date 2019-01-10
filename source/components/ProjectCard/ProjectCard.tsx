import React from 'react';

function ProjectCardDetail(props) {
    const {label, value} = props.detail;
    const detailValue = value.map((detail, i) => {
        if (typeof detail === 'string') {
            return <span key={i}>{detail}</span>;
        }

        return (
            <a
                key={i}
                href={detail.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {detail.text}
            </a>
        );
    });

    return <p>{label}: {detailValue}</p>;
}

export default function ProjectCard(props) {
    const project = props.project;

    return (
        <article>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
                <h1>{project.title}</h1>
            </a>

            <p>{project.description}</p>

            {project.details.map((detail, i) => (
                <ProjectCardDetail key={i} detail={detail} />
            ))}
        </article>
    );
};
