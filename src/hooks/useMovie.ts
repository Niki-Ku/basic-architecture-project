import { useQuery } from "react-query";
import { dataFetch } from "../helpers/fetchUtils";
import { Movie } from "../types/global";
import { fetchMovies } from "../api/MoviesApi";

export const useMovie = ( lang: string, id?: string ) => {
	let options = {};
	if (id) options = fetchMovies(1, lang, id);

	return useQuery<Movie>(["movieData", 1, lang, id], () => dataFetch(options), {
		refetchOnWindowFocus: false,
	});
};
