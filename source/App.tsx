import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import asyncComponent from './lib/asyncComponent.tsx'
import style from './App.css';

const Home = asyncComponent(React.lazy(() => import('./pages/Home/Home.tsx')));
const ArticleList = asyncComponent(React.lazy(() => import('./pages/ArticleList/ArticleList.tsx')));

export default function App(props) {
    return (
        <BrowserRouter>
            <div className={style.wrapper}>
                <Header />

                <main className={style.content}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/articles" exact component={ArticleList} />
                    </Switch>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
};
