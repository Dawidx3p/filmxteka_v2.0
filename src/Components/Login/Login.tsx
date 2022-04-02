import GoTrue from "gotrue-js";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate();
    const auth = new GoTrue({
        APIUrl: 'https://filmxteka.ml/.netlify/identity',
        audience: '',
        setCookie: true,
      });
    return(
        <>
        <form onSubmit={(e) => {
            e.preventDefault();
            auth.login(email, password)
            .then(response => {
            setResponse(JSON.stringify(response))
            })
            .catch((error) => {
            setResponse(JSON.stringify(error))
            })
        }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' type="email" />
            <input value={password}  onChange={(e) => setPassword(e.target.value)}  placeholder='password' type="password" />
            <input type="submit" value="login"/>
            <input className="transparent-primary" type="submit" onClick={(e) => {
                e.preventDefault();
                navigate('/register');
            }} value="register"/>
        </form>
        <button onClick={() => setResponse('user' + JSON.stringify(auth.currentUser()))}>Get user</button>
        <p>{response && response}</p>
    </>
    )
}

export default Login