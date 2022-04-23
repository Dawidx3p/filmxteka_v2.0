import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCommentsByFilm } from '../../utils/api';
import { findMovie, getRecommendations, getVideos } from '../../utils/tmdb';
import { Comment, Film as FilmType, Genre, Video as VideoType } from '../../utils/types';
import { auth } from '../../utils/auth';

import AddComment from './AddComment/AddComment';
import Popup from '../Popup/Popup';
import Video from './Video';
import Overview from './Overview';
import Films from './Films';

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
    const [videos, setVideos] = useState<VideoType[]>([]);
    const [comments, setComments] = useState<Comment[]>([])
    const [popUpOpener, setOpener] = useState(false);
    const [film, setFilm] = useState<FilmType>();
    const [recommendations, setRecommendations] = useState<FilmType[]>();
    const [loading, setLoading] = useState(false);
    
    const params = useParams();

    const fromStateFilm = useMemo(() => {
        return films.concat(trending.day, trending.week).find(film => film.id===Number(params.filmId))
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

    const updateCommentInState = (newComment: Comment) => {
        setComments(prev => {
            if(prev){
                return prev.map(comment => comment.ref?.['@ref'].id === newComment.ref?.['@ref'].id ? newComment : comment)
            }else{
                return []
            }
        })
    }

    useEffect(() => {
        setFilm(fromStateFilm)
        if(!fromStateFilm && params.filmId){
            findMovie(params.filmId)
            .then((data: FilmType) => setFilm(data))
        }
    },[fromStateFilm, params.filmId])
    
    useEffect(() => {
        if(params.filmId){
            setLoading(true)
            Promise.all([getVideos(params.filmId), getCommentsByFilm(parseInt(params.filmId)), getRecommendations(params.filmId)])
            .then((results: [{results: VideoType[]}, Comment[], {results: FilmType[]}]) => {
                setVideos(results[0].results);
                setComments(results[1]);
                setRecommendations(results[2].results.slice(0, 10));
                setLoading(false);
            })
        }
    },[params.filmId])


    return (
        <main className='overview'>
            {film && <Overview film={film} genres={genres}/>}
            {!loading && <>
                <div className='video-container'>
                    {videos?.slice(0,2).map((video, key) => <Video key={key} video={video} />)}
                </div>
                {popUpOpener && <Popup close={() => setOpener(false)}/>}
                {isCommenting && film ? 
                <AddComment 
                comments={comments} 
                filmId={film.id} 
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
                    {comments.map((comment, key) => {
                        return (
                            <div key={key}>
                                <h4>{comment.data.author.name||comment.data.author.email}</h4>
                                <p>{comment.data.text}</p>
                            </div>
                        )
                    })}
                </div>
                {recommendations && recommendations.length && <>
                    <h3>Recommendations</h3>
                    <div className='recommendations'>
                     {<Films films={recommendations}/>}
                    </div>
                </>}
                
                
            </>}
        </main>
    )
}

export default Film;