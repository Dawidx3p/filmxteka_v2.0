import GoTrue from 'gotrue-js';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [loggingOut, setLogout] = useState(false);

    const navigate = useNavigate();
    
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

    return(
        <nav className="main">
            <ul>
                <li><NavLink to='/'>Homepage</NavLink></li>
                <button disabled={loggingOut} className="warning" onClick={logout}>logout</button>
            </ul>

        </nav>
    )
}

export default Navigation;