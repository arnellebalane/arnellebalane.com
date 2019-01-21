import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ArticleCard from './components/ArticleCard/ArticleCard.tsx';
import fetchData from '@/lib/fetchData.tsx';
import shared from '@/stylesheets/pages.css';

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [hasOlderArticles, setHasOlderArticles] = useState(false);
    const [hasNewerArticles, setHasNewerArticles] = useState(false);

    useEffect(() => {
        fetchData('articles').then(({data: response}) => {
            setArticles(response.data);
            setHasOlderArticles(Boolean(response.next_page));
            setHasNewerArticles(Boolean(response.previous_page));
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

            {hasOlderArticles && (
                <Link className={shared.link} to="#">
                    See older articles
                </Link>
            )}

            {hasNewerArticles && (
                <Link className={shared.link} to="#">
                    See newer articles
                </Link>
            )}
        </div>
    );
}
