import GoTrue from "gotrue-js";
import Login from "../Login/Login";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { getCommentsByFilm } from "../../utils/api";
import {Comment} from "../../utils/types";
import Films from "../Films/Films";

import { Film } from "../../utils/types";
import Backdrop from "../Films/Backdrop";

type Props = {
    films: Film[];
    trending: Film[]
}

const Homepage = ({films, trending}:Props) => {

    const navigate = useNavigate();
    const location = useLocation();

    const auth = new GoTrue({
        APIUrl: 'https://filmxteka.ml/.netlify/identity',
        audience: '',
        setCookie: true,
    });

    useEffect(() => {
        if(location.hash.includes('confirmation_token')){
            auth
            .confirm(location.hash.slice(20), true)
            .then((response) => {
                console.log('Confirmation email sent', JSON.stringify({ response }));
            })
            .catch((error) => {
                console.log(error);
            });
        }else if(location.hash.includes('recovery_token')){
            auth
            .recover(location.hash.slice(16), true)
            .then((response) => {
                console.log('Logged in as %s', JSON.stringify({ response }))
                navigate('/remind');
            })
            .catch((error) => console.log('Failed to verify recover token: %o', error));
        }
    })

    return(
        <>
        {auth.currentUser() ? <main>
            <div className='films-container grid2'>
                <Films films={films}/>
            </div>
            <div className='films-container'>
                <Backdrop films={trending}/>
            </div>
            </main> : <Login />}
        <button onClick={() => {
            getCommentsByFilm('poziomka')
            .then((comments:Comment[]|void) => {
                if(comments) {
                    console.log(comments[0].data.text)
                }
            })
            .catch(error => console.log(error))
        }}>Get Comments for the film</button>
        </>
    )
}

export default Homepage