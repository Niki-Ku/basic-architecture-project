import { DbUser, Film, Genre } from "../../types/global";
import HorizontalScroller from "../HorizontalScroller/HorizontalScroller";

interface IHorizontalMD {
	movies: Film[] | undefined;
	genres?: Genre[];
	link: string;
	heading: string;
	loading?: boolean;
	error?: boolean;
	user?: DbUser;
}

const HorizontalMoviesDisplay: React.FC<IHorizontalMD> = ({
	movies,
	genres,
	link,
	heading,
	loading,
	error,
	user,
}) => {
	if (error) return <div>Error fetching data...</div>;
	if (loading) return <div>Loading Scroller...</div>;

	if (!movies?.length) return null;

	return (
		<div className="first:mt-4">
			<HorizontalScroller
				link={link}
				heading={heading}
				films={movies}
				genres={genres}
				user={user}
			/>
		</div>
	);
};

export default HorizontalMoviesDisplay;
