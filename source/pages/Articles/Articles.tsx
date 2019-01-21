import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import ArticleCard from './components/ArticleCard/ArticleCard.tsx';
import fetchData from '@/lib/fetchData.tsx';
import {extractPage, constructPage} from '@/lib/pageUtils.tsx';
import shared from '@/stylesheets/pages.css';

function ArticleList({location: _location}) {
    const [articles, setArticles] = useState([]);
    const [pages, setPages] = useState({
        nextPage: null,
        previousPage: null
    });

    useEffect(() => {
        const queries = new URLSearchParams(_location.search);
        const page = queries.has('page') ? parseInt(queries.get('page'), 10) : null;
        const endpoint = page ? `articles${constructPage(page)}` : 'articles';

        fetchData(endpoint).then(({data: response}) => {
            setArticles(response.data);
            setPages({
                nextPage: response.next_page
                    ? `${_location.pathname}?page=${extractPage(response.next_page)}`
                    : null,
                previousPage: response.previous_page
                    ? `${_location.pathname}?page=${extractPage(response.previous_page)}`
                    : null
            });
        });
    }, [_location.search]);

    return (
        <div>
            <h1 className={shared.heading}>
                Articles
            </h1>

            {articles.map(article => (
                <ArticleCard key={article.url} article={article} />
            ))}

            <div className={shared.links}>
                {pages.nextPage && (
                    <Link className={shared.link} to={pages.nextPage}>
                        See older articles
                    </Link>
                )}

                {pages.previousPage && (
                    <Link className={shared.link} to={pages.previousPage}>
                        See newer articles
                    </Link>
                )}
            </div>
        </div>
    );
}

export default withRouter(ArticleList);
