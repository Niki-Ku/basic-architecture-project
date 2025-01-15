import { useAuth } from "../../context/AuthContext";
import { useQuery, useInfiniteQuery } from "react-query";
import { getUserFromDb } from "../../helpers/firebaseUtils";
import { DbUser, Genre, Links, Data } from "../../types/global";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "../../components/SearchBar/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { fetchGenres } from "../../api/MoviesApi";
import { dataFetch } from "../../helpers/fetchUtils";
import FilmCard from "../../components/FilmCard/FilmCard";
import Button from "../../components/Button/Button";
import { getMultiplePages } from "../../helpers/fetchUtils";

const SearchPage = () => {
	const { t, i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language);
	const { currentUser } = useAuth();
	const [searchValue, setSearchValue] = useState<string>("");
	const debouncedSearchValue = useDebounce(searchValue);
	const [searchPageNumber, setSearchPageNumber] = useState<number>(1);
	const [totalSearchPagesNumber, setTotalSearchPagesNumber] =
		useState<number>(1);
	const searchLinks = useRef<Links[]>([]);
	const genresOptions = fetchGenres(lang);
	const [displayFilmCards, setDisplayFilmCards] = useState<
		React.ReactElement<typeof FilmCard>[]
	>([]);

	const { data: additionalUser } = useQuery<DbUser | undefined>(
		["user", currentUser],
		() => getUserFromDb(currentUser?.uid),
		{ refetchInterval: 10000 }
	);

	const {
		data: searchData,
		error,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: [
			`searchData-${debouncedSearchValue}`,
			searchValue,
      searchPageNumber,
      lang
		],
		queryFn: () => getMultiplePages(searchPageNumber, searchValue, lang),
	});

	const { data: genersData } = useQuery<{ genres: Genre[] }>(
		["genresData", lang],
		() => dataFetch(genresOptions)
	);

	if (searchData?.pages)
		searchLinks.current = searchData.pages[0].results
			.slice(0, 5)
			.map((item) => ({
				name: item.title,
				path: `../movies/${item.id}`,
			}));

	const generateFilmCards = (searchData: Data) => {
		if (genersData) {
			const filmCards = searchData.results.map((page, index) => (
				<div
					key={`${index}-${searchPageNumber}-${page.title}`}
					className="basis-full sm:basis-[30%] md:basis-[15%] xl:basis-[10%]"
				>
					<FilmCard
						cardData={page}
						genres={genersData.genres}
						link={`../movies/${page.id}`}
						user={additionalUser}
					/>
				</div>
			));
			return filmCards;
		} else return [] as React.ReactElement<typeof FilmCard>[];
	};

	const onSearchSubmit = () => {
		if (searchData?.pages && genersData) {
			searchData.pages.forEach((page) => {
				setDisplayFilmCards(generateFilmCards(page));
			});
			setTotalSearchPagesNumber(searchData.pages[0].total_pages);
		}
	};

	const onLoadMoreClick = () => {
		setSearchPageNumber((prev) => prev + 1);
		searchData?.pages.forEach((page) => {
			console.log(page);
			setDisplayFilmCards((prev) => {
				const previous = prev ?? [];
				return [...previous, ...generateFilmCards(page).flat()];
			});
		});
	};

	useEffect(() => {
		setLang(i18n.language);
  }, [i18n.language]);
  
  if (error) return <div>Error loading data...</div>
  
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
				{displayFilmCards}
			</div>
			{totalSearchPagesNumber > searchPageNumber && !isFetchingNextPage && (
				<div className="mb-20">
					<Button label={t('loadMore')} onClick={onLoadMoreClick} wide></Button>
				</div>
			)}
		</div>
	);
};

export default SearchPage;
