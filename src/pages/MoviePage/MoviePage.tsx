import { useParams } from "react-router-dom";
import { fetchMovies, fetchTrailer } from "../../api/MoviesApi";
import { useQuery } from "react-query";
import { Movie, Trailer } from "../../types/global";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import useMobile from "../../hooks/useMobile";
import Button from "../../components/Button/Button";
import TrailerComponent from "../../components/TrailerComponent/TrailerComponent";
import { dataFetch } from "../../helpers/fetchUtils";

// TODO:
// maybe make recomendations slider   https://developer.themoviedb.org/reference/movie-recommendations

// when you click on prev/forward buttons in the browser - the whole app crashes			it was beacuse of name inside array for useQurery
// make all pages scroll to top after changing route
// CORS error when using iframe to watch trailers. It doesn't affect anything

const MoviePage = () => {
	const movieId = useParams();
	const id = movieId.movieId;
	const { t, i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language);
	const isMobile = useMobile();
	const [trailerOptions, setTrailerOptions] = useState({});
	
	let options = {}
	if (id) options = fetchMovies(1, lang, id);     // is it okay to handle id value here like this???

	const { data, isError, isLoading } = useQuery<Movie>(
		["movieData", 1, lang],
		() => dataFetch(options),
		{ refetchOnWindowFocus: false }
	);

	const { data: trailersData, isError: trailerError, isLoading: trailerLoading } = useQuery<{ results: Trailer[] }>(
		["trailersData", lang, trailerOptions],
		() => dataFetch(trailerOptions),
		{
			enabled: !!trailerOptions,
			refetchOnWindowFocus: false
		}
	)

	const trailer = trailersData?.results.find((t) => t.type === "Trailer");             

	useEffect(() => {
		if (data?.id && id) setTrailerOptions(() => fetchTrailer(id, lang));
	}, [data, id, lang, i18n.language])

	useEffect(() => {
		setLang(i18n.language);
	}, [i18n.language]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError || !data) {
		return <div>Error loading data or no data available</div>;
	}

	const { backdrop_path, poster_path, title, status, runtime, release_date, genres, overview } = data;

	return (
		<div>
			{/* image/description component */}
			<div className="h-[130svh] bg-black-black-absolute overflow-hidden">
        <div className="h-full w-full bg-cover bg-center z-10 overflow-hidden relative"
          style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${
						isMobile ? poster_path : backdrop_path
					})`}}
				>
					<h2 className="absolute hidden md:inline-block pl-10 pt-10 text-4xl">{title}</h2>
					<div className="absolute w-full bottom-0 left-0 mx-auto max-w-[1680px] pt-20">
						<div className="flex flex-col md:flex-row gap-4 items-center md:items-start p-6 pb-3 md:p-10 md:pt-6">
							<div className="absolute inset-0 w-full h-full backdrop-saturate-[190%] backdrop-blur-3xl -z-10 mask-gradient"
								style={{backgroundColor: "rgba(40, 40, 40, .5)"}}
							></div>
								<div className="md:hidden max-w-[300px] text-text-default text-3xl text-center ">
									<h2>{title}</h2>
								</div>
								<div className="text-center text-text-secondary text-sm md:text-left md:min-w-[150px] md:order-2">
									{genres && 
										<span>{genres[0].name} </span>
									}
									<span>{status} </span>
									<span className="whitespace-nowrap">{release_date} </span>
									<span>{runtime  + t('min')}</span>
								</div>
								<div className="md:order-1 min-w-[150px] ">
									<Button label={t('toWatchlist')} variant="white"></Button>
								</div>
								<div className="text-text-secondary order-3">
									<span>{overview}</span>
								</div>
						</div>
					</div>
        </div>        
			</div>
			{/* trailer component */}
			<div className="w-full h-[300px] md:h-[500px] px-5 md:px-10 my-20">
				{trailer
					? <TrailerComponent src={trailer.key} title={trailer.name} isError={trailerError} isLoading={trailerLoading} />
					: <></>
				}
			</div>
		</div>
	);
};

export default MoviePage;
