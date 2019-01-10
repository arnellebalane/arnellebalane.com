import React from 'react';
import shared from '@/stylesheets/cards.css';

function ProjectCardDetail(props) {
    const {label, value} = props.detail;
    const detailValue = value.map((detail, i) => {
        if (typeof detail === 'string') {
            return (
                <span key={i} className={shared.detailValue}>
                    {detail}
                </span>
            );
        }

        return (
            <a
                key={i}
                className={shared.detailValue}
                href={detail.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {detail.text}
            </a>
        );
    });

    return (
        <p className={shared.detail}>
            {label}: {detailValue}
        </p>
    );
}

export default function ProjectCard({project}) {
    return (
        <article className={shared.card}>
            <a
                className={shared.link}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <h1 className={shared.title}>
                    {project.title}
                </h1>
            </a>

            <p className={shared.content}>
                {project.description}
            </p>

            {project.details.map((detail, i) => (
                <ProjectCardDetail key={i} detail={detail} />
            ))}
        </article>
    );
};
