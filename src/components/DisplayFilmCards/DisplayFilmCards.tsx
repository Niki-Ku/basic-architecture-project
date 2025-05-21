import { DbUser, Film, Genre } from "../../types/global";
import FilmCard from "../FilmCard/FilmCard";

interface IDisplayFilmCards {
	movies: Film[];
	genres?: Genre[];
	user?: DbUser;
}

const DisplayFilmCards: React.FC<IDisplayFilmCards> = ({
	movies,
	genres,
	user,
}) => {
	return (
		<div className="gap-2 md:gap-5 sm:gap-4 justify-evenly pt-4 mb-4 grid grid-cols-cards">
			{movies.map((m, i) => (
				<FilmCard
					key={`${i}-${m.title}`}
					cardData={m}
					genres={genres}
					link={`../movies/${m.id}`}
					user={user}
				/>
			))}
		</div>
	);
};

export default DisplayFilmCards;
