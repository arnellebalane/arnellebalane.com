import React from 'react';
import {Link} from 'react-router-dom';
import shared from '@/stylesheets/cards.css';

type ArticleType = {
    title: string,
    slug: string,
    url: string,
    date_published: string,
    description: string
}

type ArticleCardProps = {
    article: ArticleType
}

export default function ArticleCard({article}: ArticleCardProps) {
    return (
        <article className={shared.card}>
            <Link className={shared.link} to={`/articles/${article.slug}`}>
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
                {article.description}
            </p>
        </article>
    );
}
