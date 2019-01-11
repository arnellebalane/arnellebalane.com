import React from 'react';
import {Link} from 'react-router-dom';
import Menu from '@/components/Menu/Menu.tsx';
import style from './Header.css';

interface HeaderProps {
    isMenuOpen: boolean,
    onToggleMenu(): void
}

export default function Header({isMenuOpen, onToggleMenu}: HeaderProps) {
    const toggleMenuClasses = [
        style.menu,
        isMenuOpen ? style.menuOpen : style.menuClose
    ].join(' ');

    return (
        <header className={style.header}>
            <Link className={style.avatarLink} to="/">
                <img
                    className={style.avatar}
                    src={require('@/images/avatar.jpg')}
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
