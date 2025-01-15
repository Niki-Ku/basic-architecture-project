import axios from "axios";
import { fetchSearchResults } from "../api/MoviesApi";
import { Data } from "../types/global";

export const dataFetch = async (options: {}) => {
	try {
		const data = await axios.request(options);
		return data.data;
	} catch (error) {
		console.log(error);
	}
};

export const getMultiplePages = async (pageParam: number, query: string, lang: string): Promise<Data> => {
	const opt = fetchSearchResults(query, lang, pageParam)
	try {
		const data = await axios.request(opt);
		return data.data;
	} catch (error) {
		console.log(error);
		throw new Error("Error, failed to fetch data");
	}
}