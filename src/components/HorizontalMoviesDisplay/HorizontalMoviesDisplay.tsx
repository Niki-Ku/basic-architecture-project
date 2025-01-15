import { DbUser, Film, Genre } from "../../types/global"
import HorizontalScroller from "../HorizontalScroller/HorizontalScroller";

interface IHorizontalMD {
  movies: Film[] | undefined;
  genres: Genre[] | undefined;
  link: string;
  heading: string;
  loading: boolean | undefined;
  error: boolean | undefined;
  user: DbUser | undefined;
}

const HorizontalMoviesDisplay:React.FC<IHorizontalMD> = ({ movies, genres, link, heading, loading, error, user }) => {

  if (error) return <div>Error fetching data...</div>
  if (loading) return <div>Loading...</div>

  return (
    <div className="first:mt-4">
      {
        movies && genres && movies?.length > 0 && 
          <HorizontalScroller link={link} heading={heading} films={movies} genres={genres} user={user} />
      }
    </div>
  )
};

export default HorizontalMoviesDisplay;
