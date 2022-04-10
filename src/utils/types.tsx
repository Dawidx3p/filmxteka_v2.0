export type Data = {
    text: string;
    author: {
      name?: string;
      email: string;
    },
	filmId: number;
    comments?: Data[];
    createdAt?: string;
	lastModified: string;
  }
  
  export type Comment = {
    ref?: {"@ref": { id: string }},
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
	media_type?: string;
}

export interface Video{
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
}

export interface Genre {id: number; name: string}