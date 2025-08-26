import { useSelector } from "react-redux";
import MovieList from "./MovieList.js";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    (movies.popularMovies && movies.nowPlayingMovies && movies.topRatedMovies && movies.upcomingMovies) && (
      <div className="-mt-8 md:-mt-60 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
        <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
      </div>
    )
  );
};

export default SecondaryContainer;
