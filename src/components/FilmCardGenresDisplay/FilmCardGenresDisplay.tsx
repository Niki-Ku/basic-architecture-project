import { Genre } from "../../types/global";

const FilmCardGenresDisplay = ({
	genres,
	genreIds,
}: {
	genres: Genre[];
	genreIds: number[];
}) => {
	const matchedGenre = genres.find((g) => Number(g.id) === genreIds[0]);

	if (!matchedGenre) return null;

	return <p className="text-xs">{matchedGenre.name}</p>;
};

export default FilmCardGenresDisplay;
