import React from 'react';
import {Link} from 'react-router-dom';
import style from './PaginationLinks.css';

type PaginationLinksProps = {
    label: string,
    previousPage: string,
    nextPage: string
};

export default function PaginationLinks({label, previousPage, nextPage}: PaginationLinksProps) {
    return (
        <div className={style.links}>
            {previousPage && (
                <Link
                    className={[style.link, style.previousLink].join(' ')}
                    to={previousPage}
                >
                    See older {label}
                </Link>
            )}

            {nextPage && (
                <Link
                    className={[style.link, style.nextLink].join(' ')}
                    to={nextPage}
                >
                    See newer {label}
                </Link>
            )}
        </div>
    );
}
