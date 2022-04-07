export type Data = {
    text: string,
    author: {
      name: string,
      email: string
    },
    comments: Data[]
    date: string
  }
  
  export type Comment = {
    ref: {"@ref": { id: string }},
    data: Data
  }

  export interface Film{
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
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
	results: Film[]
};