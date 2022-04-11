import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    close: () => void;
}

const Popup = (props:Props) => {
    const navigate = useNavigate();
    return (
        <article className="popup">
            <section>
                <nav>
                    <button onClick={() => props.close()} className='warning'>x</button>
                </nav>
                <div className='container'>
                    <h1>You are not logged in</h1>
                    <button className='primary' onClick={() => navigate('/')}>Login</button>
                </div>
            </section>
        </article>
    )
}

export default Popup;