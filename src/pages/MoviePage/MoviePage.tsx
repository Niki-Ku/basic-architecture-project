import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import useMobile from "../../hooks/useMobile";
import Button from "../../components/Button/Button";
import TrailerComponent from "../../components/TrailerComponent/TrailerComponent";
import { useAuth } from "../../context/AuthContext";
import { Film } from "../../types/global";
import { addMovieToWatchList, removeMovieFromWatchList } from "../../helpers/firebaseUtils";
import { db } from "../..";
import { doc, updateDoc } from "firebase/firestore";
import { useDbUser } from "../../hooks/useDbUser";
import { useMovie } from "../../hooks/useMovie";
import { useTrailer } from "../../hooks/useTrailer";

// button status is not updating

const MoviePage = () => {
	const { movieId } = useParams<{ movieId: string }>();
	const [id, setId] = useState<string>()
	const { t, i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language);
	const isMobile = useMobile();
	const { userLoggedIn } = useAuth();
	const [inList, setInlist] = useState<boolean>(false);
	const { data: additionalUser } = useDbUser();
	const { data, isError, isLoading } = useMovie(lang, id);
	const { data: trailersData, isError: trailerError, isLoading: trailerLoading } = useTrailer(lang, id);

	const updateInList = (list: Film[], movieId: string) => {
		const movieInList = list.find((m) => m.id.toString() === movieId);
		movieInList
			? setInlist(true)
			: setInlist(false)
	}
	
	const onClick = async () => {
		if (additionalUser && data) {
			const movieData = {
				...data,
				genre_ids: [data.genres[0].id],
			}
			const docRef = doc(db, "users", additionalUser.docId);
			const userWatchList = additionalUser.watchList;
			let updatedList: Film[] = []
			inList
				? updatedList = removeMovieFromWatchList(userWatchList, movieData)
				: updatedList = addMovieToWatchList(userWatchList, movieData)
			try {
				await updateDoc(docRef, {
					watchList: updatedList
				});
				updateInList(updatedList, movieData.id);
			} catch (error) {
				console.log("Error when trying to add movie to watchlist: " + error)
			}
		}
	}

	const trailer = trailersData?.results.find((t) => t.type === "Trailer");             

	useEffect(() => {
		if (additionalUser && data) {
			updateInList(additionalUser.watchList, data.id.toString());
		};
	}, [data, i18n.language, additionalUser])

	useEffect(() => {
		if (movieId) setId(movieId)
	}, [])

	useEffect(() => {
		setLang(i18n.language);
	}, [i18n.language]);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !data) 
		return <div>Error loading data or no data available</div>;

	const { backdrop_path, poster_path, title, status, runtime, release_date, genres, overview } = data;

	return (
		<div>
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
									{genres.length > 0 && 
										<span>{genres[0].name} </span>
									}
									<span>{status} </span>
									<span className="whitespace-nowrap">{release_date} </span>
									<span>{runtime  + t('min')}</span>
								</div>
								{userLoggedIn && 		
									<div className="md:order-1 min-w-[150px] ">
										<Button label={inList ? t('inWatchlist') : t('toWatchlist')} onClick={onClick} variant="white"></Button>
									</div>
								}
								<div className="text-text-secondary order-3">
									<span>{overview}</span>
								</div>
						</div>
					</div>
        </div>        
			</div>
			{trailer &&
				<TrailerComponent src={trailer.key} title={trailer.name} isError={trailerError} isLoading={trailerLoading} />
			}
		</div>
	);
};

export default MoviePage;
