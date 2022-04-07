import './App.scss';
import './MyTemplate.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Register from './Components/Register/Register';
import Remind from './Components/Remind/Remind';
import Film from './Components/Films/Film';
import Navigation from './Components/Navigation/Navigation';
import { useEffect, useState } from 'react';
import { Film as FilmType, Films } from "./utils/types";

import { getTheMostPopular, getTrending } from "./utils/tmdb";

function App() {
  const initialFilms: FilmType[] | [] = [];
  
  const [films, setFilms] = useState(initialFilms);
  const [trending, setTrending] = useState(initialFilms);

  useEffect(() => {
    getTheMostPopular()
    .then((films: Films) => setFilms(films.results));
    getTrending()
    .then((films: Films) => setTrending(films.results))
  },[])
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage films={films} trending={trending}/>}/>
          <Route path='/film/:filmId' element={<Film films={films} trending={trending}/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/remind' element={<Remind />}/>
          <Route path='*'  element={<Homepage films={films} trending={trending}/>}/>
        </Routes>
        <Navigation />
      </BrowserRouter>

    </div>
  );
}

export default App;
