import React from 'react';
import {Link} from 'react-router-dom';
import ArticleCard from '@/components/ArticleCard/ArticleCard.tsx';
import style from './Articles.css';

const articles = [{
    title: 'Using the Ambient Light Sensor API to add brightness-sensitive dark mode to my website',
    url: '/articles/1',
    date_published: 'June 9, 2018',
    summary: 'This article will quickly walk through how I implemented dark mode, and toggle it automatically based on the brightness of the environment.'
}, {
    title: 'The Picture-in-Picture API',
    url: '/articles/2',
    date_published: 'June 7, 2018',
    summary: 'This article will walk you through getting started with Picture-in-Picture to make your videos stay on top of other windows.'
}, {
    title: 'The Intersection Observer API',
    url: '/articles/3',
    date_published: 'February 25, 2018',
    summary: 'This article explains the concepts of the Intersection Observer API and shows how it can be used.'
}];

export default function ArticleList(props) {
    return (
        <div>
            <h1 className={style.heading}>Articles</h1>

            {articles.map(article => (
                <ArticleCard key={article.url} article={article} />
            ))}

            <Link className={style.link} to="#">
                See older articles
            </Link>
        </div>
    );
};
