import GoTrue from 'gotrue-js';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVideos } from '../../utils/tmdb';
import { Film as FilmType, Genre, Video } from '../../utils/types';
import AddComment from '../AddComment/AddComment';

type Props = {
    films: FilmType[];
    trending: {day: FilmType[], week: FilmType[]};
    genres: {
        tv: Genre[];
        movie: Genre[]
    };
}

const Film = ({films, trending, genres}: Props) => {
    const [isCommenting, setCommenting] = useState(false);
    const [videos, setVideos] = useState<Video[] | undefined>(undefined);

    const params = useParams();
    const navigate = useNavigate();

    const auth = new GoTrue({
        APIUrl: 'https://filmxteka.ml/.netlify/identity',
        audience: '',
        setCookie: true,
    });

    const film = useMemo(() => {
        return films.find(film => film.id===Number(params.filmId)) || trending.day.find(film => film.id===Number(params.filmId))|| trending.week.find(film => film.id===Number(params.filmId))
    },[films, trending, params.filmId])

    useEffect(() => {
        getVideos(params.filmId||'')
        .then((videos: {results: Video[]}) => setVideos(videos.results))
    },[params.filmId])

    useEffect(() => {
        if(!auth.currentUser()){
            navigate('/')
        }
    })

    return (
            <main className='overview'>
                <div className='overview-container'>
                    <h1>{film?.title}</h1>
                    <p>{film?.genre_ids.map((id => {
                        const foundGenre = genres.movie.find(genre => genre.id === id) || genres.tv.find(genre => genre.id === id)
                        if(foundGenre){
                            return foundGenre.name
                        }else{
                            return ''
                        }
                    })).join(', ')}</p>
                    <p>Release: {film?.release_date || 'Unknown'}</p>
                    <h4>{film?.title}</h4>
                    <p>{film?.overview}</p>
                    {}
                    {isCommenting ? <AddComment close={() => setCommenting(false)}/> : <button onClick={() => setCommenting(true)} className='primary'>Comment</button>}
                </div>
                <img alt='overview' src={`${film? 'https://image.tmdb.org/t/p/w500/'+film.poster_path: ''}`} />
                <div className='video-container'>
                    {videos?.slice(0,2).map(video => {
                        return <iframe 
                            src={`https://www.youtube.com/embed/${video.key}`}
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    })}
                </div>
            </main>
    )
}

export default Film;