import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {

  return (
    <div className="px-4 md:px-14">
      <h1 className="text-sm md:text-lg py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}> <MovieCard posterPath={movie.poster_path} /> </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
