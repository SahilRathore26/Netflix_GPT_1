import { useParams } from "react-router-dom";
import useMovieDetail from "../hooks/useMovieDetail";
import Header from "./Header";
import { CARD_CDN_URL } from "../utils/constants";
import useMovieCredits from "../hooks/useMovieCredits";

const MovieDetail = () => {
  const { id } = useParams();
  const movieInfo = useMovieDetail(id);
  const movieCredit = useMovieCredits(id);
  console.log(movieCredit?.cast?.[0]);
  const convertRuntime = () => {
    if (!movieInfo.runtime) return "N/A";
    const hrs = Math.floor(movieInfo.runtime / 60);
    const mins = movieInfo.runtime % 60;
    return `${hrs}h ${mins}m`;
  };
  const releaseDate = movieInfo.release_date;
  const releaseYear = new Date(releaseDate).getFullYear();

  if (!movieInfo) return <h1 className="text-white">Loading...</h1>;

  return (
    <div className="h-full bg-neutral-900 text-white">
      <div>
        <Header />
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-20 px-6 md:px-16 py-20 md:py-32">
        <div className="">
          <img
            className="w-40 md:w-56 h-auto object-cover shadow-lg"
            alt="bg-image"
            src={CARD_CDN_URL + movieInfo.poster_path}
          />
          <h2 className="text-center pt-2">
            <span className="font-bold">Runtime: </span>
            {convertRuntime()}
          </h2>
        </div>
        <div className="w-full md:w-2/6 px-6 md:px-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            {movieInfo.title}
            <span className="text-lg md:text-xl pl-2">({releaseYear})</span>
          </h1>
          <div className="flex flex-wrap gap-2 py-2">
            {movieInfo.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 text-xs md:text-sm bg-gray-800 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <h2 className="py-2">
            <span className="font-bold">Rating: </span>⭐{" "}
            {movieInfo.vote_average} / 10
          </h2>
          <h2>{movieInfo.tagline}</h2>
          <p className="py-2">{movieInfo.overview}</p>
          <h3 className="text-base font-semibold">
            {movieCredit?.cast?.[0]?.name}
          </h3>
          <p className="text-sm text-gray-400 italic">
            as {movieCredit?.cast?.[0]?.character}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
