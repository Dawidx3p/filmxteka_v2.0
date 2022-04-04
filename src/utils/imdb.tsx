const headers = {"method": "GET", "headers": { "x-rapidapi-host": "imdb8.p.rapidapi.com", "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY || ''}}

export interface Film{
	certificate: string;
	genres: string[];
	popularity: {
		currentRank: number;
	};
	ratings:{
		rating: number;
		ratingCount: number;
		topRank: number;
	};
	releaseDate: string;
	title:{
		id: string;
		image:{
			height: number;
			width: number;
			url: string;
		};
		title: string;
		titleType: string;
		year: number;
	};
}

export interface Overview{
	genres: string[];
	popularity: {
		currentRank: number;
	};
	ratings:{
		rating: number;
		ratingCount: number;
	};
	releaseDate: string;
	plotOutline?: {
		id: string;
		text: string;
	}
	plotSummary?: {
		id: string;
		text: string;
	}
	title:{
		id: string;
		image:{
			height: number;
			width: number;
			url: string;
		};
		runningTimeInMinutes: number;
		title: string;
		titleType: string;
		year: number;
	};
}

export interface Films {
	[id: string]: Film
};

export const search = async(q:string) => {
    let term = q;
    term.replace(' ', '%20');
    fetch(`https://imdb8.p.rapidapi.com/title/find?q=${term}`, headers)
	.then(response => response.json())
	.catch(err => console.error(err));
}
async function getids(){
	return fetch(`https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US`, headers)
	.then(response => response.json())
	.then(ids => ids.slice(0, 40).map((id:string) => id.slice(7, -1)).join('&ids='))
	.catch(err => console.error(err));
}
async function getMetaData(ids: string[]){
	return fetch(`https://imdb8.p.rapidapi.com/title/get-meta-data?ids=${ids}&region=US`, headers)
	.then(response => response.json())
	.then((data: Films) => Object.values(data))
	.catch(err => console.error(err));
}
export async function getMostPopular(){
	return getids()
	.then(ids => getMetaData(ids))
	.catch(err => console.error(err));
}
export const  getOverview = async(id:string) => {
	return fetch(`https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${id}&currentCountry=US`, headers)
	.then(response => response.json())
	.then((data: Overview) => data)
	.catch(err => console.error(err));
}