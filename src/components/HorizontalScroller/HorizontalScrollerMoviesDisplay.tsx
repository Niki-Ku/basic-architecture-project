import { LegacyRef } from "react";
import { Film, DbUser, Genre } from "../../types/global";
import FilmCard from "../FilmCard/FilmCard";

const HorizontalScrollerMoviesDisplay = ({ scrollContainerRef, films, user, genres }: {
  scrollContainerRef: LegacyRef<HTMLDivElement> | null;
  films: Film[];
  user: DbUser | undefined;
  genres: Genre[];
}) => {
	return (
		<div
			ref={scrollContainerRef}
			className="scrollbar overflow-x-auto scroll-smooth scroll-px-2 sm:scroll-px-0 grid grid-flow-col gap-4 snap-x
					auto-cols-mobile sm:auto-cols-sm md:auto-cols-md lg:auto-cols-lg 2xl:auto-cols-xxl"
		>
			{films.map((film) => (
				<FilmCard
					key={film.title}
					cardData={film}
					genres={genres}
					link={`movies/${film.id}`}
					user={user}
				/>
			))}
		</div>
	);
};

export default HorizontalScrollerMoviesDisplay;
