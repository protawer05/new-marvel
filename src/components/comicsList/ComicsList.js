import './comicsList.scss';

import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch (process){
        case 'waiting': 
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default: 
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(210);
    const [newComicsLoading, setNewComicsLoading] = useState(false);

    const {getAllComics, process, setProcess} = useMarvelService();
    
    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])
    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
        .then(onComicsListLoaded)
        .then(() => setProcess('confirmed'));
    }

    const onComicsListLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8)
        setNewComicsLoading(false)
    }


    function renderComics(arr){
        const items = arr.map((item, i) => {
            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return <ul className="comics__grid">
                    {items}
               </ul>
        ;
    }

    return (
        <>
        <div className="comics__list">
                {setContent(process, () => renderComics(comicsList), newComicsLoading)}
            <button onClick={() => onRequest(offset)} disabled={newComicsLoading} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
        </>
        
    )
}

export default ComicsList;