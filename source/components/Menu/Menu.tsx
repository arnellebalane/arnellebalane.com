import React from 'react';
import {Link} from 'react-router-dom';
import style from './Menu.css';

export default function Menu(props) {
    return (
        <nav className={style.menu}>
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
