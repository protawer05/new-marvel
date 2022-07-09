import './singleComicPage.scss';
import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {useParams, Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    // eslint-disable-next-line
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComics(comicId)
        .then(onComicLoaded)

    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }
    
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null
    return (
        <>
        {errorMessage}
        {spinner}
        {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <Helmet>
                <meta name="description" content={`${title} comics book`}/>
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'..'} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;