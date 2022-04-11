import { useState } from "react";

import Films from "../Films/Films";

import { Film } from "../../utils/types";
import Backdrop from "../Films/Backdrop";

type Props = {
    films: Film[];
    trending: { [trending: string]: Film[], day: Film[], week: Film[]}
}

const Homepage = ({films, trending}:Props) => {
    const [trendingState, setTrending] = useState('day')

    return(
        <>
        <main>
            <div className='films-container grid2'>
            <h1>The Most Popular</h1>
                <Films films={films}/>
            </div>
            <div className='films-container'>
                <h2>Trending</h2>
                <div><button className={`${trendingState==='day'?'active':''}`} onClick={() => setTrending('day')}>day</button><button  className={`${trendingState==='week'?'active':''}`} onClick={() => setTrending('week')}>week</button></div>
                <Backdrop films={trending[trendingState]}/>
            </div>
        </main>
        </>
    )
}

export default Homepage