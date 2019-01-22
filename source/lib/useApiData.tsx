import {useState, useEffect} from 'react';
import fetchData from './fetchData.tsx';
import {extractPage, constructPage} from './pageUtils.tsx';

export default function useApiData(path, _location) {
    const [data, setData] = useState({
        data: [],
        nextPage: null,
        previousPage: null
    });

    useEffect(() => {
        const queries = new URLSearchParams(_location.search);
        const page = queries.has('page') ? parseInt(queries.get('page'), 10) : null;
        const endpoint = page ? `${path}${constructPage(page)}` : path;

        fetchData(endpoint).then(({data: response}) => {
            setData({
                data: response.data,
                nextPage: response.next_page
                    ? `${_location.pathname}?page=${extractPage(response.next_page)}`
                    : null,
                previousPage: response.previous_page
                    ? `${_location.pathname}?page=${extractPage(response.previous_page)}`
                    : null
            });
        });
    }, [_location.search]);

    return data;
}
