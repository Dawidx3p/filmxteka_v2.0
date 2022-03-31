import React, { useState } from 'react';
import './App.scss';
import './MyTemplate.scss';
import GoTrue from 'gotrue-js';

// Instantiate the GoTrue auth client with an optional configuration

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  
 const auth = new GoTrue({
  APIUrl: 'https://filmxteka.tk/.netlify/identity',
  audience: '',
  setCookie: true,
});
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e) => {
          e.preventDefault();
          auth.signup(email, password)
          .then(response => {
            setResponse(JSON.stringify(response))
          })
          .catch((error: string) => {
            setResponse(error)
          })
        }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' type="email" />
          <input value={password}  onChange={(e) => setPassword(e.target.value)}  placeholder='password' type="password" />
          <input type="submit" value="Log in"/>
        </form>
        <p>{response && response}</p>
      </header>
    </div>
  );
}

export default App;
