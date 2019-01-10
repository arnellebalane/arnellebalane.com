import React from 'react';
import {Link} from 'react-router-dom';

export default function ArticleCard(props) {
    const article = props.article;

    return (
        <article>
            <Link to={article.url}>
                <h1>{article.title}</h1>
            </Link>

            <time dateTime={article.date_published}>
                {article.date_published}
            </time>

            <p>{article.summary}</p>
        </article>
    );
};
