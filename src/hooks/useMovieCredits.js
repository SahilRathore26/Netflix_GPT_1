import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieCredits = (id) => {
  const [ movieCredit, setMovieCredit ] = useState([]);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/"+id+"/credits?language=en-US", API_OPTIONS);
    const json = await data.json();
    setMovieCredit(json);
  }

  return movieCredit;
};

export default useMovieCredits;