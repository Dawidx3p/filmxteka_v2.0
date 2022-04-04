import './App.scss';
import './MyTemplate.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Register from './Components/Register/Register';
import Remind from './Components/Remind/Remind';
import Film from './Components/Films/Film';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/title/:filmId' element={<Film />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/remind' element={<Remind />}/>
          <Route path='*'  element={<Homepage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
