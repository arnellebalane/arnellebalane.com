import React from 'react';
import {Link} from 'react-router-dom';
import style from './ArticleCard.css';

export default function ArticleCard(props) {
    const article = props.article;

    return (
        <article className={style.article}>
            <Link className={style.link} to={article.url}>
                <h1 className={style.title}>
                    {article.title}
                </h1>
            </Link>

            <time
                className={style.datePublished}
                dateTime={article.date_published}
            >
                {article.date_published}
            </time>

            <p className={style.summary}>
                {article.summary}
            </p>
        </article>
    );
};
