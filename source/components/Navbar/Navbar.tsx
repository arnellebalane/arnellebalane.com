import React from 'react';
import Avatar from '@/images/avatar.jpg';
import style from './Navbar.css';

export default function Navbar(props) {
    return (
        <header className={style.header}>
            <img
                className={style.avatar}
                src={Avatar}
            />

            <h1 className={style.title}>
                @arnellebalane
            </h1>

            <button className={style.menu}>
                Toggle Menu
            </button>
        </header>
    );
};
