import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieDetail = (id) => {
  const [ movieInfo, setMovieInfo ] = useState([]);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/"+id+"?language=en-US", API_OPTIONS);
    const json = await data.json();
    setMovieInfo(json);
  }

  return movieInfo;
};

export default useMovieDetail;