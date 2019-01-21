import React from 'react';
import {Link} from 'react-router-dom';
import ArticleCard from './components/ArticleCard/ArticleCard.tsx';
import shared from '@/stylesheets/pages.css';

export default function ArticleList() {
    const articles = [];

    return (
        <div>
            <h1 className={shared.heading}>
                Articles
            </h1>

            {articles.map(article => (
                <ArticleCard key={article.url} article={article} />
            ))}

            <Link className={shared.link} to="#">
                See older articles
            </Link>
        </div>
    );
}
