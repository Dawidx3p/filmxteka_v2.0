import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Film as FilmType } from '../../utils/types';
import AddComment from '../AddComment/AddComment';

type Props = {
    films: FilmType[];
    trending: FilmType[];
}

const Film = ({films, trending}: Props) => {
    const [film, setFilm] = useState<FilmType | undefined>(undefined);
    const [isCommenting, setCommenting] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(films.length){
            setFilm(films.find(film => film.id===Number(params.filmId)) || trending.find(film => film.id===Number(params.filmId))) 
        }else{
            navigate('/')
        }
        
    },[films, trending, navigate, params.filmId])

    return (
            <main className='overview'>
                <div className='overview-container'>
                    <h1>{film?.title}</h1>
                    <p>{film?.genre_ids.join(', ')}</p>
                    <p>Release: {film?.release_date}</p>
                    <h4>{film?.title}</h4>
                    <p>{film?.overview}</p>
                    {isCommenting ? <AddComment close={() => setCommenting(false)}/> : <button onClick={() => setCommenting(true)} className='primary'>Comment</button>}
                </div>
                <img alt='overview' src={`${film? 'https://image.tmdb.org/t/p/w500/'+film.poster_path: ''}`} />
            </main>
    )
}

export default Film;