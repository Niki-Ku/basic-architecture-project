import { useMutation } from "react-query";
import { getMultiplePagesSearch } from "../helpers/fetchUtils";
import { Film } from "../types/global";

export const useSearchMutation = (page: number, searchValue: string, lang: string) => {
	return useMutation<
		{
			results: Film[];
			page: number;
			total_pages: number;
		},
		unknown,
		{ page: number, searchValue: string, lang: string }
	>(({ page, searchValue, lang }) =>
		getMultiplePagesSearch(page, searchValue, lang)
	);
};
