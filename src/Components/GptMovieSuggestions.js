import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames || movieNames.length === 0) {
    return (
      <div className="flex flex-col items-center text-gray-500 pt-40 h-full bottom-0">
        <h2 className="text-2xl font-semibold mb-2">🎬 Discover Movies with AI</h2>
        <p className="text-sm">Type something above and get smart recommendations!</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
