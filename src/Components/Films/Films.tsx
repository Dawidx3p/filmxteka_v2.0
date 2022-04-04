import React from 'react';
import { useNavigate } from 'react-router-dom';

import {Film} from '../../utils/imdb';

type Props = {
    films: Film[]
}

const Films = (props:Props) => {
    const {films} = props;
    const navigate = useNavigate();

    return(
        <div className='films-container'>
        {films.map((film, key) => {
            return key<12 ? <img onClick={() => navigate(film.title.id)}  key={key} src={film.title.image.url} alt={film.title.title} /> : <div onClick={() => navigate(film.title.id)} key={key}>
                <h4>{film.title.title}</h4>
                <p>{film.title.titleType}</p>
                <p>{film.title.year}</p>
                <p>{film.genres.join(', ')}</p>
            </div>
        })}
        </div>
    )
}

export default Films;