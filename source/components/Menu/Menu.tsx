import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Menu.css';

function createLink(text, url) {
    return (
        <NavLink
            className={style.link}
            activeClassName={style.activeLink}
            to={url}
        >
            {text}
        </NavLink>
    );
}

export default function Menu({isOpen}) {
    const menuClasses = [
        style.menu,
        !isOpen && style.hidden
    ].filter(Boolean).join(' ');

    return (
        <nav className={menuClasses}>
            {createLink('Articles', '/articles')}
            {createLink('Projects', '/projects')}
            {createLink('Repositories', '/repositories')}
            {createLink('Events', '/events')}
        </nav>
    );
}
