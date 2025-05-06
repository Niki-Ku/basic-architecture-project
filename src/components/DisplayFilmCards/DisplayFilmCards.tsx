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
		<div className="gap-2 md:gap-5 sm:gap-4 flex-wrap pt-4 mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{movies.map((m, i) => (
				<div
					key={`${i}-${m.title}`}
					className="basis-full sm:basis-[30%] md:basis-[15%] xl:basis-[10%] "
				>
					<FilmCard
						cardData={m}
						genres={genres}
						link={`../movies/${m.id}`}
						user={user}
					/>
				</div>
			))}
		</div>
	);
};

export default DisplayFilmCards;
