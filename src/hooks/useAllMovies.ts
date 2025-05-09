import { useQuery } from "react-query";
import { getMultiplePages } from "../helpers/fetchUtils";
import { Film } from "../types/global";

export const useAllMovies = (lang: string, page: number) => {
	return useQuery<{ results: Film[]; page: number; total_pages: number }>(
		["allMovies", lang, page],
		() => getMultiplePages(page, lang),
		{ keepPreviousData: true }
	);
};
