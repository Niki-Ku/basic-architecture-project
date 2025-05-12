import { useQuery } from "react-query";
import { dataFetch } from "../helpers/fetchUtils";
import { Trailer } from "../types/global";
import { fetchTrailer } from "../api/MoviesApi";

export const useTrailer = (lang: string, id?: string) => {
	let trailerOptions = {};
	if (id) trailerOptions = fetchTrailer(id, lang);

	return useQuery<{ results: Trailer[] }>(
		["trailersData", lang, trailerOptions],
		() => dataFetch(trailerOptions),
		{
			enabled: !!trailerOptions,
			refetchOnWindowFocus: false,
		}
	);
};
