import axios from "axios";
import { fetchAllMovies, fetchSearchResults } from "../api/MoviesApi";
import { Data } from "../types/global";

export const dataFetch = async (options: {}) => {
	try {
		const data = await axios.request(options);
		return data.data;
	} catch (error) {
		console.log(error);
	}
};

export const getMultiplePagesSearch = async (page: number, query: string, lang: string): Promise<Data> => {
	const opt = fetchSearchResults(query, lang, page)
	try {
		const data = await axios.request(opt);
		return data.data;
	} catch (error) {
		console.log(error);
		throw new Error("Error, failed to fetch data");
	}
}

export const getMultiplePages = async (page: number, lang: string): Promise<Data> => {
	const opt = fetchAllMovies(page, lang)
	try {
		const data = await axios.request(opt);
		return data.data;
	} catch (error) {
		console.log(error);
		throw new Error("Error, failed to fetch data");
	}
}