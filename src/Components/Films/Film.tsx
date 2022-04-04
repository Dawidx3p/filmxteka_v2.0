import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOverview, Overview } from '../../utils/imdb';

const Film = () => {
    const initialState:Overview = {
        genres: [], popularity: { currentRank: 0 }, ratings:{ rating: 0, ratingCount: 0 }, releaseDate: '', plotOutline: { id: '', text: '' }, 
        plotSummary: { id: '', text: '' }, title:{ id: '', image:{ height: 0, width: 0, url: '' },
            runningTimeInMinutes: 0, title: '', titleType: '', year: 0
        }
    }
    const [overview, setOverview] = useState(initialState);
    
    const params = useParams();

    useEffect(() => {
        if(params.filmId){
            getOverview(params.filmId)
            .then(result => {
                if(result){
                    setOverview(result)
                }else{
                    console.error('No Overview')
                }
            })
            .catch((err) => console.error(err))
        }
    }, [params.filmId])

    return (
        <header>
            <div className='overview'>
                <div className='overview-container'>
                    <h1>{overview.title.title}</h1>
                    <h4>{overview.plotOutline?.text}</h4>
                    <p>{overview.plotSummary?.text}</p>
                </div>
                <img alt='overview' src={overview.title.image.url} />
            </div>
        </header>
    )
}

export default Film;