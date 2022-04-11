import GoTrue from 'gotrue-js';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

type Props = {
    logout: () => void;
    loggedIn: boolean;
}

const Navigation = (props:Props) => {

    const navigate = useNavigate();
    
    const auth = new GoTrue({
        APIUrl: 'https://filmxteka.netlify.app/.netlify/identity',
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
                <li><NavLink to='/homepage'>Homepage</NavLink></li>
                <li>
                    <NavLink 
                    onClick={(e) => {
                        e.preventDefault();
                        if(props.loggedIn){
                            props.logout();
                            logout();
                        }else{
                            navigate('/')
                        }
                    }} 
                    to='/'>{props.loggedIn ? 'Logout' : 'Login'}</NavLink>
                </li>
            </ul>

        </nav>
    )
}

export default Navigation;