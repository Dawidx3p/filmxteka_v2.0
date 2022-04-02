import React, { useEffect, useMemo } from "react"
import GoTrue from "gotrue-js";
import Login from "../Login/Login";
import { useLocation } from "react-router-dom";

const Homepage = () => {
    const auth = useMemo(() => {
        return new GoTrue({
            APIUrl: 'https://filmxteka.ml/.netlify/identity',
            audience: '',
            setCookie: true,
          });
    }, [])  
    const location = useLocation();
    console.log(location.pathname);
    useEffect(() => {
        if(location.pathname.includes('confirmation_token')){
            auth
            .confirm(location.pathname.slice(20), true)
            .then((response) => {
                console.log('Confirmation email sent', JSON.stringify({ response }));
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },[location.pathname, auth])
    return(
        <>
        {auth.currentUser() ? <div className="div">{JSON.stringify(auth.currentUser())}</div> : <Login />}
        </>
    )
}

export default Homepage