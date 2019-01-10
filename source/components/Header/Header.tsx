import React from 'react';
import {Link} from 'react-router-dom';
import Menu from '@/components/Menu/Menu.tsx';
import Avatar from '@/images/avatar.jpg';
import style from './Header.css';

export default function Header({isMenuOpen, onToggleMenu}) {
    const toggleMenuClasses = [
        style.menu,
        isMenuOpen ? style.menuOpen : style.menuClose
    ].join(' ');

    return (
        <header className={style.header}>
            <Link className={style.avatarLink} to="/">
                <img
                    className={style.avatar}
                    src={Avatar}
                />
            </Link>

            <Link className={style.title} to="/">
                @arnellebalane
            </Link>

            <button className={toggleMenuClasses} onClick={onToggleMenu}>
                Toggle Menu
            </button>

            <Menu isOpen={isMenuOpen} />
        </header>
    );
}
