import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { fetchGenres, fetchMovies } from "../../api/MoviesApi";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperMovies } from "../../config/swiperMovies";
import HorizontalMoviesDisplay from "../../components/HorizontalMoviesDisplay/HorizontalMoviesDisplay";
import "swiper/css";
import "swiper/css/pagination";
import "./HomePage.css";
import { Pagination, Autoplay } from "swiper/modules";
import { pagination, autoplay } from "../../helpers/sliderUtils";
import { Film, Genre, DbUser } from "../../types/global";
import { getUserFromDb } from "../../helpers/firebaseUtils";
import { useAuth } from "../../context/AuthContext";
import { dataFetch } from "../../helpers/fetchUtils";
import useMobile from "../../hooks/useMobile";

const HomePage = () => {
	const { t, i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language);
	const upcomingOptions = fetchMovies(1, lang, "upcoming");
	const playingOptions = fetchMovies(1, lang, "now_playing");
	const popularOptions = fetchMovies(1, lang, "popular");
	const topOptions = fetchMovies(1, lang, "top_rated");
	const genresOptions = fetchGenres(lang);
	const isMobile = useMobile();
	const { currentUser } = useAuth();
	
	useEffect(() => {
		setLang(i18n.language);
	}, [i18n.language]);

	const moviesFetch = async (options: {}) => {
		try {
			const data = await axios.request(options);
			return data.data;
		} catch (error) {
			console.log(error);
		}
	};

	const { data, isError, isLoading } = useQuery<{ results: Film[] }>(
		["data", 1, lang],
		() => moviesFetch(upcomingOptions),
		{ refetchOnWindowFocus: false }
	);
	const {
		data: topData,
		isError: topError,
		isLoading: topLoading,
	} = useQuery<{ results: Film[] }>(
		["topData", 1, lang],
		() => moviesFetch(topOptions),
		{ refetchOnWindowFocus: false }
	);
	const {
		data: playingData,
		isError: playingError,
		isLoading: playingLoading,
	} = useQuery<{ results: Film[] }>(
		["playingData", 1, lang],
		() => moviesFetch(playingOptions),
		{ refetchOnWindowFocus: false }
	);
	const {
		data: popularData,
		isError: popularError,
		isLoading: popularLoading,
	} = useQuery<{ results: Film[] }>(
		["popularData", 1, lang],
		() => moviesFetch(popularOptions),
		{ refetchOnWindowFocus: false }
	);
	const { data: genersData } = useQuery<{ genres: Genre[] }>(
		["genresData", lang],
		() => dataFetch(genresOptions)
	);

	const { data: additionalUser } = useQuery<DbUser | undefined >(
		["user", currentUser],
		() => getUserFromDb(currentUser?.uid),
		{refetchInterval: 10000}
	)
  
	const movieSections = [
		{ data: topData, heading: "top-rated", loading: topLoading, error: topError },
		{ data: data, heading: "upcoming", loading: isLoading, error: isError },
		{ data: playingData, heading: "playing-now", loading: playingLoading, error: playingError },
		{ data: popularData, heading: "popular", loading: popularLoading, error: popularError },
	];

	return (
		<div className="min-h-[100svh] w-full overflow-hidden">
			<div className="h-[100svh]">
				<Swiper
					pagination={pagination}
					autoplay={autoplay}
					modules={[Pagination, Autoplay]}
					className="mySwiper"
					loop={true}
				>
					{swiperMovies.map((m) => (
						<SwiperSlide key={m.title}>
							<div
								className={`bg-${m.mobileImage} md:bg-${m.image} bg-center bg-cover w-full h-full block relative`}
								style={{
									backgroundImage: `url(${isMobile ? m.mobileImage : m.image})`,
								}}
							>
								<div className="absolute bottom-5 left-5">
									<Link onClick={() => window.scrollTo({top: 0,})} to={m.link}>
										<p className="text-3xl md:text-6xl">{t(m.title)}</p>
									</Link>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div>
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
		</div>
	);
};

export default HomePage;
