import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { auth } from '../../utils/auth';

type Props = {
    logout: () => void;
    loggedIn: boolean;
}

const Navigation = (props:Props) => {
    const [burgerOpen, setBurger] = useState(false);
    const navigate = useNavigate();
    const user = auth.currentUser();
    const pathname = useLocation().pathname
    const logout = () => {
        if(user){
            user.logout()
            .then(response => {
                props.logout();
                navigate('/');
        })
        .catch(error => {
            throw error;
        });
        }
    }

    return(
        <>
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
                </ul>

            </nav>
            <nav className='burger'>
                {pathname!=='/' && pathname!=='/homepage' && <div onClick={() => {
                    navigate(-1);
                    setBurger(false);
                }} className='back'>← Go back</div>}
                <div className='container' onClick={() => setBurger(prev => !prev)}>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                </div>
                {burgerOpen && <ul>
                    <li><NavLink to='/homepage' onClick={() => setBurger(false)}>Homepage</NavLink></li>
                    {props.loggedIn && <li>
                            <NavLink to='/profile' onClick={() => setBurger(false)}>Profile</NavLink>
                        </li>}
                    <li>
                        <NavLink 
                        onClick={(e) => {
                            e.preventDefault();
                            setBurger(false)
                            if(props.loggedIn){
                                setBurger(false)
                                logout();
                            }else{
                                setBurger(false)
                                navigate('/')
                            }
                        }} 
                        to='/'>{props.loggedIn ? 'Logout' : 'Login'}</NavLink>
                    </li>
                </ul>}
            </nav>
        </>
    )
}

export default Navigation;