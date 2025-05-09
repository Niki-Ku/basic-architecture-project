import { Links } from "../../types/global";
import { useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "../../components/SearchBar/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { Pagination } from "@heroui/pagination";
import DisplayFilmCards from "../../components/DisplayFilmCards/DisplayFilmCards";
import { useAllMovies } from "../../hooks/useAllMovies";
import { useDbUser } from "../../hooks/useDbUser";
import { useGenres } from "../../hooks/useGenres";
import { useSearchMutation } from "../../hooks/useSearchMutation";
import DisplayFilmCardsSkeleton from "../../components/DisplayFilmCards/DisplayFilmCardsSkeleton";

const SearchPage = () => {
	const { i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language);
	const [searchValue, setSearchValue] = useState<string>("");
	const debouncedSearchValue = useDebounce(searchValue);
	const searchLinks = useRef<Links[]>([]);
	const [page, setPage] = useState<number>(1);
	const { data: additionalUser } = useDbUser();
	const { data: genersData } = useGenres(lang);

	const {
		data: allMovies,
		error: allMoviesError,
		isLoading: allMoviesLoading,
	} = useAllMovies(lang, page);

	const {
		data: searchedData,
		mutate,
		isError,
		isLoading,
	} = useSearchMutation(page, searchValue, lang);

	const { data: searchBarData, mutate: mutate2 } = useSearchMutation(
		page,
		debouncedSearchValue,
		lang
	);

	const displayMovies = useMemo(
		() => (searchedData ? searchedData : allMovies),
		[allMovies, searchedData]
	);

	if (searchBarData?.results)
		searchLinks.current = searchBarData.results.slice(0, 5).map((item) => ({
			name: item.title,
			path: `../movies/${item.id}`,
		}));

	const onQueryChange = (query: string) => {
		setSearchValue(query);
		mutate2({ page: page, searchValue: searchValue, lang: lang });
	};

	const onSearchSubmit = () => {
		mutate({ page: page, searchValue: searchValue, lang: lang });
	};

	const onPaginationClick = (page: number) => {
		setPage(page);
		if (searchedData && searchedData.results.length > 0) {
			mutate({ page: page, searchValue: searchValue, lang: lang });
		}
		window.scrollTo({ top: 0 });
	};

	useEffect(() => {
		setLang(i18n.language);
	}, [i18n.language]);

	if (isError || allMoviesError) return <div>Error loading data...</div>;
	if (!displayMovies) return <DisplayFilmCardsSkeleton />
	// if (isLoading || allMoviesLoading) return <div>Loadin...</div>;

	return (
		<div className="w-[90%] min-h-[100svh] max-w-[1640px] mx-auto">
			<div className="my-4">
				<SearchBar
					links={searchLinks.current}
					query={searchValue}
					onQueryChange={onQueryChange}
					onSubmit={onSearchSubmit}
					placeholder="searchMovies"
				/>
			</div>
			{(isLoading || allMoviesLoading)
				? (<DisplayFilmCardsSkeleton />)
				// ? (<div className="bg-bg-primary min-h-[1500svh] md:min-h-[400svh]">Loadinggggggg...</div>)
				: (
					<>
						<DisplayFilmCards
							movies={displayMovies.results}
							genres={genersData?.genres}
							user={additionalUser}
						/>
						<Pagination
							classNames={{
								cursor: "bg-red-default",
								item: "bg-text-default text-bg-primary",
								wrapper: "mx-auto",
							}}
							onChange={onPaginationClick}
							initialPage={page}
							total={displayMovies?.total_pages}
						/>
					</>
				)
			}
		</div>
	);
};

export default SearchPage;
