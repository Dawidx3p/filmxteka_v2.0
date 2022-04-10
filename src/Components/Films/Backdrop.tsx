import React from 'react';
import { useNavigate } from 'react-router-dom';

import {Film} from '../../utils/types';

type Props = {
    films: Film[]
}

const Backdrop = (props:Props) => {
    const {films} = props;
    const navigate = useNavigate();

    return(
        <>
        {films.map((film, key) => {
            return <img onClick={() => navigate(`/film/${film.id}`)}  key={key} src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`} alt={film.title} /> 
        })}
        </>
    )
}

export default Backdrop;