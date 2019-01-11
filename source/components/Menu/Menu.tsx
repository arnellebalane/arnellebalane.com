import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Menu.css';

type MenuProps = {
    isOpen: boolean
}

function createLink(text: string, url: string) {
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

export default function Menu({isOpen}: MenuProps) {
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
