import { Link } from "react-router-dom";
import { DbUser, Film, Genre } from "../../types/global";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
import FilmCardImage from "../FilmCardImage/FilmCardImage";
import FilmCardGenresDisplay from "../FilmCardGenresDisplay/FilmCardGenresDisplay";

export interface movieCardProps {
	cardData: Film;
	genres?: Genre[];
	link: string;
	user?: DbUser;
}

const FilmCard: React.FC<movieCardProps> = ({
	cardData,
	genres,
	link,
	user,
}) => {
	return (
		<div className="group snap-start relative w-[230px]">
			{user && <BookmarkButton user={user} cardData={cardData} />}
			<Link onClick={() => window.scrollTo({ top: 0 })} to={link}>
				<FilmCardImage
					posterUrl={cardData.poster_path}
					title={cardData.title}
				/>
				<h4 className="font-semibold">{cardData.title}</h4>
				{genres && cardData.genre_ids && (
					<FilmCardGenresDisplay
						genres={genres}
						genreIds={cardData.genre_ids}
					/>
				)}
			</Link>
		</div>
	);
};

export default FilmCard;
