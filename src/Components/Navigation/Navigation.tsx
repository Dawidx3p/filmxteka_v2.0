import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { auth } from '../../utils/auth';

type Props = {
    logout: () => void;
    loggedIn: boolean;
}

const Navigation = (props:Props) => {
    const navigate = useNavigate();
    const user = auth.currentUser();
    const logout = () => {
        if(user){
            user.logout()
            .then(response => {
                props.logout();
                console.log("User logged out");
                navigate('/');
        })
        .catch(error => {
            console.log("Failed to logout user: %o", error);
            throw error;
        });
        }
    }

    const changeData = () => {
        if(user){
            user.getUserData()
            .then(data => console.log(data))
            user.update({data: {surname: 'Pocahontaz'}})
            .then(data => console.log(data))
            .catch(err => console.log(err));
        }
    }

    return(
        <nav className="main">
            <ul>
                <li><NavLink to='/homepage'>Homepage</NavLink></li>
                {props.loggedIn && <li>
                        <NavLink to='/profile'>Profile</NavLink>
                    </li>}
                <li>
                    <NavLink 
                    onClick={(e) => {
                        e.preventDefault();
                        if(props.loggedIn){
                            logout();
                        }else{
                            navigate('/')
                        }
                    }} 
                    to='/'>{props.loggedIn ? 'Logout' : 'Login'}</NavLink>
                </li>
                <li>
                    <NavLink to='/login' onClick={(e) => {
                        e.preventDefault();
                        changeData();
                    }}>Whatever</NavLink>
                </li>
            </ul>

        </nav>
    )
}

export default Navigation;