import GoTrue from 'gotrue-js';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommentsByFilm } from '../../utils/api';
import { getVideos } from '../../utils/tmdb';
import { Comment, Film as FilmType, Genre, Video } from '../../utils/types';
import AddComment from '../AddComment/AddComment';
import Popup from '../Popup/Popup';

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
    const [comments, setComments] = useState<Comment[] | undefined>(undefined)
    const [popUpOpener, setOpener] = useState(false);

    const params = useParams();

    const auth = new GoTrue({
        APIUrl: 'https://filmxteka.netlify.app/.netlify/identity',
        audience: '',
        setCookie: true,
    });

    const film = useMemo(() => {
        return films.find(film => film.id===Number(params.filmId)) || 
        trending.day.find(film => film.id===Number(params.filmId)) || 
        trending.week.find(film => film.id===Number(params.filmId))
    },[films, trending, params.filmId])

    const addCommentToState = (comment: Comment) => {
        setComments(prev => {
            if(prev){
                return [...prev, comment]
            }else{
                return [comment]
            }
        })
    }

    const updateCommentInState = (comment: Comment) => {
        setComments(prev => {
            if(prev){
                return prev.map(prevComment => prevComment.ref?.['@ref'].id === comment.ref?.['@ref'].id ? comment : prevComment)
            }else{
                return []
            }
        })
    }

    const closePopup = () => setOpener(false);

    useEffect(() => {
        getVideos(params.filmId||'')
        .then((videos: {results: Video[]}) => setVideos(videos.results));
        getCommentsByFilm(parseInt(params.filmId||'0'))
        .then((comments: Comment[]) => setComments(comments))
    },[params.filmId])


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
                {popUpOpener && <Popup close={closePopup}/>}
                {isCommenting ? 
                <AddComment 
                comments={comments} 
                filmId={film?.id||0} 
                close={() => setCommenting(false)} 
                addComment={addCommentToState}
                updateCommentInState={updateCommentInState}/> : 
                <button onClick={() => {
                    if(auth.currentUser()){
                        setCommenting(true);
                    }else{
                        setOpener(true);
                    }
                }} className='primary'>Review</button>}
                <div>
                    {comments?.map((comment, key) => {
                        return (
                            <div key={key}>
                                <h4>{comment.data.author.name||comment.data.author.email}</h4>
                                <p>{comment.data.text}</p>
                            </div>
                        )
                    })}
                </div>
            </main>
    )
}

export default Film;