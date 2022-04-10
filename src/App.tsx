import './App.scss';
import './MyTemplate.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Register from './Components/Register/Register';
import Remind from './Components/Remind/Remind';
import Film from './Components/Films/Film';
import Navigation from './Components/Navigation/Navigation';
import { useEffect, useState } from 'react';
import { Film as FilmType, Genre } from "./utils/types";

import { getTheMostPopular, getTrendingWeek, getTrendingDay, getMovieGenres, getTvGenres } from "./utils/tmdb";
import Login from './Components/Login/Login';

function App() {
  const initialFilms: FilmType[] | [] = [];
  const initialGenres: Genre[] | [] = [];
  
  const [films, setFilms] = useState(initialFilms);
  const [trending, setTrending] = useState({day: initialFilms, week: initialFilms});
  const [genres, setGenres] = useState({movie: initialGenres, tv: initialGenres})

  useEffect(() => {

    Promise.all([getTheMostPopular(), getTrendingWeek(), getTrendingDay()])
    .then((values: {results: FilmType[]}[]) => {
      console.log(values)
      setFilms(values[0].results)
      setTrending(prev => ({...prev, week: values[1].results}))
      setTrending(prev => ({...prev, day: values[2].results}))
    })
    .catch(err => console.log(err));
    
    Promise.all([getMovieGenres(), getTvGenres()])
    .then((values: {genres: Genre[]}[]) => {
      setGenres(prev => ({...prev, movie: values[0].genres}))
      setGenres(prev => ({...prev, tv: values[1].genres}))
    })
    .catch(err => console.log(err));

  },[])
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Homepage films={films} trending={trending}/>}/>
          <Route path='/film/:filmId' element={<Film films={films} trending={trending} genres={genres}/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/remind' element={<Remind />}/>
          <Route path='*'  element={<Homepage films={films} trending={trending}/>}/>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
