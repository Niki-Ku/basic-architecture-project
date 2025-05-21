import { useQuery } from "react-query";
import { fetchMovies, moviesFetch } from "../api/MoviesApi";
import { Film, moviesType } from "../types/global";

export const useCategoryMovies = (lang: string, category: moviesType) => {
	const options = fetchMovies(1, lang, category);

	return useQuery<{ results: Film[] }>(
		[`${category}`, 1, lang],
		() => moviesFetch(options),
		{ refetchOnWindowFocus: false }
	);
};
