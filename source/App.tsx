import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import Home from './pages/Home/Home.tsx';
import style from './App.css';

export default function App(props) {
    return (
        <BrowserRouter>
            <div className={style.wrapper}>
                <Navbar />

                <Route path="/" exact component={Home} />

                <Footer />
            </div>
        </BrowserRouter>
    );
};
