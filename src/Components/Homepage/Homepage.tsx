import GoTrue from "gotrue-js";
import Login from "../Login/Login";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCommentsByFilm } from "../../utils/api";
import { getMostPopular } from "../../utils/imdb";
import Films from "../Films/Films";

import { Film } from "../../utils/imdb";


const Homepage = () => {
    const initialFilms: Film[] | [] = [];
    const [loggingOut, setLogout] = useState(false);
    const [films, setFilms] = useState(initialFilms);

    const navigate = useNavigate();
    const location = useLocation();

    const auth = new GoTrue({
        APIUrl: 'https://filmxteka.ml/.netlify/identity',
        audience: '',
        setCookie: true,
    });

    const logout = () => {
        setLogout(true);
        const user = auth.currentUser();
        if(user){
            user
        .logout()
        .then(response => {
            console.log("User logged out");
            setLogout(false);
            navigate('/');
        })
        .catch(error => {
            console.log("Failed to logout user: %o", error);
            throw error;
        });
        }
    }

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

    useEffect(() => {
        getMostPopular()
        .then(response => {
            if (response) {
                setFilms(response)
            }
        })
        .catch((error) => console.log('Failed to retrieve'))
    },[])

    return(
        <>
        {auth.currentUser() ? <main>
            <Films films={films}/>
            <button disabled={loggingOut} className="warning" onClick={logout}>logout</button>
            </main> : <Login />}
        <button onClick={() => {
            getCommentsByFilm('poziomka')
            .then(comments => console.log(JSON.stringify(comments)))
            .catch(error => console.log(error))
        }}>Get Comments for the film</button>
        </>
    )
}

export default Homepage