import axios from "axios";
import { moviesType } from "../types/global";

const API_Key = process.env.REACT_APP_TMDB_API_KEY;
const Base_Url = process.env.REACT_APP_TMDB_BASE_URL;

export const fetchMovies = (
	page: number,
	lang: string,
	type: moviesType | string
) => {
	return {
		method: "GET",
		url: `${Base_Url}movie/${type}`,
		params: { language: lang, page: page.toString() },
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_Key}`,
		},
	};
};

export const fetchAllMovies = (page: number, lang: string) => {
	return {
		method: "GET",
		url: `${Base_Url}/trending/movie/day`,
		params: { language: lang, page: page.toString() },
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_Key}`,
		},
	};
};

export const fetchGenres = (lang: string) => {
	return {
		method: "GET",
		url: `${Base_Url}/genre/movie/list`,
		params: { language: lang },
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_Key}`,
		},
	};
};

export const fetchTrailer = (movieId: string, lang: string) => {
	return {
		method: "GET",
		url: `${Base_Url}movie/${movieId}/videos`,
		params: { language: lang },
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_Key}`,
		},
	};
};

export const fetchSearchResults = (q: string, lang: string, page: number) => {
	return {
		method: "GET",
		url: `${Base_Url}search/movie`,
		params: {
			query: q,
			include_adult: "false",
			language: lang,
			page: page.toString(),
		},
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_Key}`,
		},
	};
};

export const moviesFetch = async (options: {}) => {
	try {
		const data = await axios.request(options);
		return data.data;
	} catch (error) {
		console.log(error);
	}
};
