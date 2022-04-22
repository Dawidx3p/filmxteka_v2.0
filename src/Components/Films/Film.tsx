import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCommentsByFilm } from '../../utils/api';
import { getVideos } from '../../utils/tmdb';
import { Comment, Film as FilmType, Genre, Video as VideoType } from '../../utils/types';
import { auth } from '../../utils/auth';

import AddComment from './AddComment/AddComment';
import Popup from '../Popup/Popup';
import Video from './Video';
import Overview from './Overview';

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

    const params = useParams();

    const film = useMemo(() => {
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
        if(params.filmId){
            getVideos(params.filmId)
            .then((videos: {results: VideoType[]}) => setVideos(videos.results));
            getCommentsByFilm(parseInt(params.filmId))
            .then((comments: Comment[]) => setComments(comments))
        }
    },[params.filmId])


    return (
        <main className='overview'>
            {film && <Overview film={film} genres={genres}/>}
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
        </main>
    )
}

export default Film;