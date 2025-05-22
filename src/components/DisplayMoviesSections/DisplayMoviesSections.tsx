import { useCategoryMovies } from "../../hooks/useCategoryMovies";
import HorizontalMoviesDisplay from "../HorizontalMoviesDisplay/HorizontalMoviesDisplay";
import { useDbUser } from "../../hooks/useDbUser";
import { useGenres } from "../../hooks/useGenres";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const DisplayMoviesSections = () => {
	const { i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language);
	const { data: genersData } = useGenres(lang);
	const { data: additionalUser } = useDbUser();
	const { data, isError, isLoading } = useCategoryMovies(lang, "upcoming");
	const {
		data: topData,
		isError: topError,
		isLoading: topLoading,
	} = useCategoryMovies(lang, "top_rated");

	const {
		data: playingData,
		isError: playingError,
		isLoading: playingLoading,
	} = useCategoryMovies(lang, "now_playing");

	const {
		data: popularData,
		isError: popularError,
		isLoading: popularLoading,
	} = useCategoryMovies(lang, "popular");

	const movieSections = [
		{
			data: topData,
			heading: "top-rated",
			loading: topLoading,
			error: topError,
		},
		{ data: data, heading: "upcoming", loading: isLoading, error: isError },
		{
			data: playingData,
			heading: "playing-now",
			loading: playingLoading,
			error: playingError,
		},
		{
			data: popularData,
			heading: "popular",
			loading: popularLoading,
			error: popularError,
		},
	];

	useEffect(() => {
		setLang(i18n.language);
	}, [i18n.language]);

	return (
		<div className=" max-w-[1400px] mx-auto ">
			{movieSections.map((section) => (
				<HorizontalMoviesDisplay
					key={section.heading}
					movies={section.data?.results}
					genres={genersData?.genres}
					heading={section.heading}
					link="/"
					loading={section?.loading}
					error={section?.error}
					user={additionalUser}
				/>
			))}
		</div>
	);
};

export default DisplayMoviesSections;
