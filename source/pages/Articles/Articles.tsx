import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ArticleCard from './components/ArticleCard/ArticleCard.tsx';
import fetchData from '@/lib/fetchData.tsx';
import shared from '@/stylesheets/pages.css';

export default function ArticleList() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchData('articles').then(response => {
            setArticles(response.data);
        });
    }, []);

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
