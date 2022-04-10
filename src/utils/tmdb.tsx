const apiKey = process.env.REACT_APP_TMDB_KEY || '';

// https://image.tmdb.org/t/p/w200/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg tutaj przykładowy link do postera spidermana zauważ że można podać szerokość obrazka w px

export async function getTheMostPopular(){
	return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

export async function getTrendingWeek(){
	return fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

export async function getTrendingDay(){
	return fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

export async function getMovieGenres(){
	return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

export async function getTvGenres(){
	return fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}

export async function getVideos(movie_id: string){
	return fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}`)
	.then(response => response.json())
	.catch(err => console.error(err));
}