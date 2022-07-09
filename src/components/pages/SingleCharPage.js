import './singleCharPage.scss';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SingleCharPage = () => {
    const {getCharacter, loading} = useMarvelService();
    const [char, setChar] = useState(null)
    const {charId} = useParams();

    const onCharLoaded = (char) => {
        setChar(char);
    }
    useEffect(() => {
        getCharacter(charId)
            .then(onCharLoaded)
    }, [])

    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || !char) ? <View char={char}/> : null
    return (
        <>
            {spinner}
            {content}
        </>
    )
}
const View = ({char}) => {
    const {thumbnail, name, description} = char;
    return (
        <>
            <Helmet>
                <meta name="description" content={`${name} page`}/>
                <title>{name}</title>
            </Helmet>
            <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            </div>
            <Link to={'..'} className="single-comic__back">Back to all</Link>
        </>
        
    )
}

export default SingleCharPage;