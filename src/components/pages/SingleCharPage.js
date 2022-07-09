import './singleCharPage.scss';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import setContent from '../../utils/setContent'

const SingleCharPage = () => {
    const {getCharacter, process, setProcess} = useMarvelService();
    const [char, setChar] = useState(null)
    const {charId} = useParams();

    const onCharLoaded = (char) => {
        setChar(char);
    }
    useEffect(() => {
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
        //eslint-disable-next-line
    }, [])

    return (
        <>
            {setContent(process, View, char)}
        </>
    )
}
const View = ({data}) => {
    const {thumbnail, name, description} = data;
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