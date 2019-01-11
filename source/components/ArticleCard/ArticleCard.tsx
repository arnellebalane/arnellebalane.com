import React from 'react';
import {Link} from 'react-router-dom';
import shared from '@/stylesheets/cards.css';

type ArticleType = {
    title: string,
    url: string,
    date_published: string,
    summary: string
}

type ArticleCardProps = {
    article: ArticleType
}

export default function ArticleCard({article}: ArticleCardProps) {
    return (
        <article className={shared.card}>
            <Link className={shared.link} to={article.url}>
                <h1 className={shared.title}>
                    {article.title}
                </h1>
            </Link>

            <time
                className={shared.subtitle}
                dateTime={article.date_published}
            >
                {article.date_published}
            </time>

            <p className={shared.content}>
                {article.summary}
            </p>
        </article>
    );
}