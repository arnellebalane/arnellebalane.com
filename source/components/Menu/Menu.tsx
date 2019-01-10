import React from 'react';
import {Link} from 'react-router-dom';
import style from './Menu.css';

export default function Menu({isOpen}) {
    const menuClasses = [
        style.menu,
        !isOpen && style.hidden
    ].filter(Boolean).join(' ');

    return (
        <nav className={menuClasses}>
            <Link className={style.link} to="/articles">
                Articles
            </Link>
            <Link className={style.link} to="/projects">
                Projects
            </Link>
            <Link className={style.link} to="/repositories">
                Repositories
            </Link>
            <Link className={style.link} to="/events">
                Events
            </Link>
        </nav>
    );
};
