import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import Home from './pages/Home/Home.tsx';
import style from './App.css';

export default function App(props) {
    return (
        <BrowserRouter>
            <div className={style.wrapper}>
                <Header />

                <main className={style.content}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                    </Switch>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
};
