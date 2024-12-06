const API_Key = process.env.REACT_APP_TMDB_API_KEY;
const Base_Url = process.env.REACT_APP_TMDB_BASE_URL;

type moviesType = "now_playing" | "top_rated" | "upcoming" | "popular"

export const fetchMovies = (page: number, lang: string, type:moviesType) => {
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

export const fetchGenres = (lang:string) => {
	return {
		method: "GET",
		url: `${Base_Url}/genre/movie/list`,
		params: { language: lang},
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_Key}`,
		},
	};
};
