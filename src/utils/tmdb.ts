const apiKey = process.env.REACT_APP_TMDB_KEY || '';

// https://image.tmdb.org/t/p/w200/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg tutaj przykładowy link do postera spidermana zauważ że można podać szerokość obrazka w px

const getTheMostPopular = async() => {
	return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

const getTrendingWeek = async() => {
	return fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

const getTrendingDay = async() =>{
	return fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

const getMovieGenres = async() =>{
	return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

const getTvGenres = async() => {
	return fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

const getVideos = async(movie_id: string) =>{
	return fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

const findMovie = async(id: string) => {
	return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

const getRecommendations = (id: string) => {
	return fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&page=1`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

export { findMovie, getTheMostPopular, getTrendingDay, getTrendingWeek, getMovieGenres, getTvGenres, getVideos, getRecommendations}