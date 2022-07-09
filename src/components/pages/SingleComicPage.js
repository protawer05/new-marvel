import './singleComicPage.scss';
import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import {useParams, Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import setContent from '../../utils/setContent';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {process, setProcess, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    // eslint-disable-next-line
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComics(comicId)
        .then(onComicLoaded)
        .then(() => setProcess('confirmed'));

    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }
    

    return (
        <>
        {setContent(process, View, comic)}
        </>
    )
}

const View = ({data}) => {
    const {title, description, pageCount, thumbnail, language, price} = data;

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