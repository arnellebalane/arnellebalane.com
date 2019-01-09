import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.tsx';
import Home from './pages/Home.tsx';

export default function App(props) {
    return (
        <React.Fragment>
            <Navbar />

            <BrowserRouter>
                <Route path="/" exact component={Home} />
            </BrowserRouter>
        </React.Fragment>
    );
};
