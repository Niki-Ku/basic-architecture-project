import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ReactComponent as BookmarkIcon } from "../../assets/icons/BookmarkIcon.svg";
import { DbUser, Film, Genre } from "../../types/global";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { db } from "../..";
import { doc, updateDoc } from "firebase/firestore";
import { addMovieToWatchList, removeMovieFromWatchList } from "../../helpers/firebaseUtils";
import NoImage from "../../assets/images/no-image.jpg";

export interface movieCardProps {
	cardData: Film;
	genres: Genre[];
	link: string;
	user?: DbUser;
}

const FilmCard: React.FC<movieCardProps> = ({
	cardData,
	genres,
	link,
	user
}) => {
	const { t } = useTranslation();
	const { userLoggedIn } = useAuth();
	const [inList, setInlist] = useState<boolean>(false);

	const updateInList = (list: Film[], obj:Film) => {
		const movieInList = list.find((m) => m.id === obj.id);
		movieInList?.id === obj.id
			? setInlist(true)
			: setInlist(false)
	}

	useEffect(() => {
		if (user) {
			updateInList(user.watchList, cardData);
		};
	}, [cardData, user])

	const onClick = async () => {
		if (user) {
			const docRef = doc(db, "users", user.docId);
			const userWatchList = user.watchList;
			let updatedList: Film[] = [];
			inList
				? updatedList = removeMovieFromWatchList(userWatchList, cardData)
				: updatedList = addMovieToWatchList(userWatchList, cardData)
			try {
				await updateDoc(docRef, {
					watchList: updatedList
				});
				updateInList(updatedList, cardData);
			} catch (error) {
				console.log("Error when trying to add movie to watchlist: " + error)
			}
		}
	}

	return (
		<div className="group snap-start relative">
			{userLoggedIn && 			
				<button
					onClick={() => onClick()}
					className="w-7 h-7 absolute top-5 right-2 bg-gray-static rounded-full justify-center items-center z-10 hidden group-hover:flex"
					aria-label={t('')}   
				>
					<BookmarkIcon
						className={`w-5 h-5`}
						style={inList ? {} : {fill: "transparent",}}
					/>
				</button>
			}
			<Link onClick={() => window.scrollTo({top: 0,})} to={link}>
				<div className=" overflow-hidden rounded-2xl relative">
					<div className="absolute w-full h-full pointer-events-none bg-black-black-30 -top-full group-hover:top-0 right-0 z-10">
					</div>
					<img
						className="w-full ablsoute object-cover"
						src={cardData.poster_path ? `https://image.tmdb.org/t/p/w500${cardData.poster_path}` : NoImage}
						alt={cardData.title + t('movie')}
					/>
				</div>
				<h4 className="font-semibold">{cardData.title}</h4>
				{genres.map(
					(genre, index) => {
						if (cardData.genre_ids)
							return Number(genre.id) === cardData.genre_ids[0] && <p key={genre.id + index} className="text-xs">{genre.name}</p>
					}
				)}
			</Link>
		</div>
	);
};

export default FilmCard;
