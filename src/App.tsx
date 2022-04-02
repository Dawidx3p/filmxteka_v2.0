import './App.scss';
import './MyTemplate.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Register from './Components/Register/Register';

// Instantiate the GoTrue auth client with an optional configuration

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='*'  element={<Homepage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
