import React from 'react';

import { Film, Genre } from '../../utils/types';

interface Props {
    film: Film,
    genres: {
        tv: Genre[];
        movie: Genre[]
    };
}

const Overview = ({film, genres}: Props) => {
    return(
        <>
            <div className='overview-container'>
                <h1>{film.title}</h1>
                <p>{film.genre_ids?.map((id => {
                    const foundGenre = genres.movie.find(genre => genre.id === id) || genres.tv.find(genre => genre.id === id)
                    if(foundGenre){
                        return foundGenre.name
                    }else{
                        return ''
                    }
                })).join(', ')}</p>
                <p>{film.genres?.map(genre => genre.name).join(', ')}</p>
                <p>Release: {film.release_date || 'Unknown'}</p>
                <p>{film.overview}</p>
            </div>
            <img alt='overview' src={`${'https://image.tmdb.org/t/p/w500/'+film.poster_path}`} />
        </>
    )
}

export default Overview;