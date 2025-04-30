import { useAuth } from "../../context/AuthContext";
import { useQuery, useInfiniteQuery, useMutation } from "react-query";
import { getUserFromDb } from "../../helpers/firebaseUtils";
import { DbUser, Genre, Links, Film } from "../../types/global";
import { useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "../../components/SearchBar/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { fetchGenres } from "../../api/MoviesApi";
import { dataFetch, getMultiplePagesSearch } from "../../helpers/fetchUtils";
import FilmCard from "../../components/FilmCard/FilmCard";
import { getMultiplePages } from "../../helpers/fetchUtils";
import { Pagination } from "@heroui/pagination";

const SearchPage = () => {
	const { i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language);
	const { currentUser } = useAuth();
	const [searchValue, setSearchValue] = useState<string>("");
	const debouncedSearchValue = useDebounce(searchValue);

	const searchLinks = useRef<Links[]>([]);
	const genresOptions = fetchGenres(lang);

	const [page, setPage] = useState<number>(1);
	const pageRef = useRef<number>(1);
	const { data: additionalUser } = useQuery<DbUser | undefined>(
		["user", currentUser],
		() => getUserFromDb(currentUser?.uid),
		{ refetchInterval: 10000 }
	);

	const {
		data: allMovies,
		error: allMoviesError,
		isLoading: allMoviesLoading,
	} = useQuery<{ results: Film[]; page: number; total_pages: number }>(
		["allMovies", lang, page],
		() => getMultiplePages(pageRef.current, lang),
		{ keepPreviousData: true }
	);

	const { data: searchedData, mutate } = useMutation<{
		results: Film[];
		page: number;
		total_pages: number;
	}>({
		mutationFn: () =>
			getMultiplePagesSearch(pageRef.current, searchValue, lang),
	});

	const {
		data: searchData,
		error,
	} = useInfiniteQuery({
		queryKey: [`searchData-${debouncedSearchValue}`, searchValue, page, lang],
		queryFn: () => getMultiplePagesSearch(page, searchValue, lang),
	});

	const { data: genersData } = useQuery<{ genres: Genre[] }>(
		["genresData", lang],
		() => dataFetch(genresOptions)
	);

	const displayMovies = useMemo(
		() => (searchedData ? searchedData : allMovies),
		[allMovies, searchedData]
	);

	if (searchData?.pages)
		searchLinks.current = searchData.pages[0].results
			.slice(0, 5)
			.map((item) => ({
				name: item.title,
				path: `../movies/${item.id}`,
			}));

	const onSearchSubmit = () => {
		mutate();
	};

	const onPaginationClick = (page: number) => {
		setPage(page);
		pageRef.current = page;
		if (searchData?.pages[0].results.length !== 0) mutate();
		window.scrollTo({ top: 0 });
	};

	useEffect(() => {
		setLang(i18n.language);
	}, [i18n.language]);

	if (error) return <div>Error loading data...</div>;

	return (
		<div className="w-[90%] min-h-[100svh] max-w-[1640px] mx-auto">
			<div className="my-4">
				<SearchBar
					links={searchLinks.current}
					query={searchValue}
					setQuery={setSearchValue}
					onSubmit={onSearchSubmit}
					placeholder="searchMovies"
				/>
			</div>
			<div className="flex gap-10 sm:gap-4 flex-wrap pt-4 mb-4">
				{displayMovies &&
					genersData &&
					displayMovies.results.map((m, i) => (
						<div
							key={`${i}-${page}-${m.title}`}
							className="basis-full sm:basis-[30%] md:basis-[15%] xl:basis-[10%]"
						>
							<FilmCard
								cardData={m}
								genres={genersData.genres}
								link={`../movies/${m.id}`}
								user={additionalUser}
							/>
						</div>
					))}
			</div>
			{displayMovies && (
				<Pagination
					classNames={{
						cursor: "bg-red-default",
						item: "bg-gray-light",
					}}
					onChange={onPaginationClick}
					initialPage={page}
					total={displayMovies?.total_pages}
				/>
			)}
		</div>
	);
};

export default SearchPage;
