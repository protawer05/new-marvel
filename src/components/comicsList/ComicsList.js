import './comicsList.scss';

import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(210);
    const [newComicsLoading, setNewComicsLoading] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();
    
    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])
    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
        .then(onComicsListLoaded)
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
        return items;
    }
    const items = renderComics(comicsList);
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null
    return (
        <>
        <div className="comics__list">
            <ul className="comics__grid">
                {items}
            </ul>
            {spinner}
            {errorMessage}
            <button onClick={() => onRequest(offset)} disabled={newComicsLoading} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
        </>
        
    )
}

export default ComicsList;