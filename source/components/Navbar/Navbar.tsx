import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@/images/avatar.jpg';

export default function Navbar(props) {
    return (
        <header>
            <img src={Avatar} />
            <h1>@arnellebalane</h1>
        </header>
    );
};
