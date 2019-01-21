import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import ArticleCard from './components/ArticleCard/ArticleCard.tsx';
import useApiData from '@/lib/useApiData.tsx';
import shared from '@/stylesheets/pages.css';

function ArticleList(props) {
    const {
        data: articles,
        nextPage,
        previousPage
    } = useApiData('articles', props.location);

    return (
        <div>
            <h1 className={shared.heading}>
                Articles
            </h1>

            {articles.map(article => (
                <ArticleCard key={article.url} article={article} />
            ))}

            <div className={shared.links}>
                {nextPage && (
                    <Link className={shared.link} to={nextPage}>
                        See older articles
                    </Link>
                )}

                {previousPage && (
                    <Link className={shared.link} to={previousPage}>
                        See newer articles
                    </Link>
                )}
            </div>
        </div>
    );
}

export default withRouter(ArticleList);
