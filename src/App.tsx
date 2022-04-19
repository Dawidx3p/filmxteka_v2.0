import './App.scss';
import './MyTemplate.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Register from './Components/Register/Register';
import Remind from './Components/Remind/Remind';
import Film from './Components/Films/Film';
import Profile from './Components/MyProfile/MyProfile';
import Navigation from './Components/Navigation/Navigation';
import { useEffect, useState } from 'react';
import { Film as FilmType, Genre } from "./utils/types";

import { getTheMostPopular, getTrendingWeek, getTrendingDay, getMovieGenres, getTvGenres } from "./utils/tmdb";
import Login from './Components/Login/Login';

interface Trending{
  day: FilmType[];
  week: FilmType[];
}
interface Genres{
  movie: Genre[];
  tv: Genre[];
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [films, setFilms] = useState<FilmType[]>([]);
  const [trending, setTrending] = useState<Trending>({day: [], week: []});
  const [genres, setGenres] = useState<Genres>({movie: [], tv: []})

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
        <Navigation logout={() => setLoggedIn(false)} loggedIn={loggedIn}/>
        <Routes>
          <Route path='/' element={<Login login={() => setLoggedIn(true)}/>}/>
          <Route path='/homepage' element={<Homepage films={films} trending={trending}/>}/>
          <Route path='/film/:filmId' element={<Film films={films} trending={trending} genres={genres}/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/remind' element={<Remind />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='*' element={<Homepage films={films} trending={trending}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
