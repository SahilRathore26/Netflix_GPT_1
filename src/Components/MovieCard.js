import { CARD_CDN_URL } from "../utils/constants";

const MovieCard = ({posterPath}) => {
  return (
    <div className="w-32 md:w-48 pr-4 transform transition duration-300 hover:scale-105 -translate-y-2">
      <img className="rounded-sm" alt="Movie-Card-Image" src={CARD_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;