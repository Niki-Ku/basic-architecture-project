import { useQuery } from "react-query";
import { dataFetch } from "../helpers/fetchUtils";
import { Genre } from "../types/global";
import { fetchGenres } from "../api/MoviesApi";

export const useGenres = (lang: string) => {
	return useQuery<{ genres: Genre[] }>(["genresData", lang], () =>
		dataFetch(fetchGenres(lang))
	);
};
