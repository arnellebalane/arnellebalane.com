import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';
import Home from './pages/Home/Home.tsx';

export default function App(props) {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Navbar />

                <Route path="/" exact component={Home} />

                <Footer />
            </React.Fragment>
        </BrowserRouter>
    );
};
