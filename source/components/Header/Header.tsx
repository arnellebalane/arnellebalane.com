import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@/images/avatar.jpg';
import style from './Header.css';

export default function Header(props) {
    return (
        <header className={style.header}>
            <Link to="/">
                <img
                    className={style.avatar}
                    src={Avatar}
                />
            </Link>

            <Link to="/" className={style.title}>
                @arnellebalane
            </Link>

            <button className={style.menu}>
                Toggle Menu
            </button>
        </header>
    );
};
