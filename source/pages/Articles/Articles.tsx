import React from 'react';
import {withRouter} from 'react-router-dom';
import ArticleCard from './components/ArticleCard/ArticleCard.tsx';
import PaginationLinks from '@/components/PaginationLinks/PaginationLinks.tsx';
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

            <PaginationLinks
                label="articles"
                nextPage={nextPage}
                previousPage={previousPage}
            />
        </div>
    );
}

export default withRouter(ArticleList);
