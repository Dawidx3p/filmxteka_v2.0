import GoTrue from 'gotrue-js';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navigation = () => {

    const navigate = useNavigate();
    
    const auth = new GoTrue({
        APIUrl: 'https://filmxteka.ml/.netlify/identity',
        audience: '',
        setCookie: true,
    });
    
    const logout = () => {
        const user = auth.currentUser();
        if(user){
            user
        .logout()
        .then(response => {
            console.log("User logged out");
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
                <li>
                    <NavLink 
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }} 
                    to='/'>Logout</NavLink>
                </li>
            </ul>

        </nav>
    )
}

export default Navigation;