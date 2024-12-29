export interface User {
	id: string;
	name: string;
	email: string;
	role: "admin" | "user";
	// ... other fields
}

export type Theme = "light" | "dark";

export interface Genre {
	id: number;
	name: string;
}

export interface ProductionCompany {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	iso_639_1: string;
	name: string;
}

export interface Movie {
	adult: boolean;
	backdrop_path: string;
	budget: number;
	genres: Genre[];
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	vote_average: number;
    vote_count: number;
}

export interface Film {
    title: string;
    poster_path: string;
    genre_ids: number[];
    id: string;
  }

export interface Trailer {
	id:  string;
	key: string;
	name: string;
	site:  string;
	type: string;
	official: boolean
}

export interface IGenre {
	id: string;
	name: string;
}

export interface FirebaseUser {
	uid: string;
}