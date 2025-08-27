import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstant";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptResults } from "../utils/GPTSlice";
import getOpenAIClient from "../utils/openai";

const GptSearchBar = ({apiKey}) => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    const gptSearch =
      "Act as movie recommendation system suggest movies for " +
      searchText.current.value +
      "only give 5 movie names separate by commas Like: Sholay, Don, Saiyaara, Shiddat, Gadar";

    const openAI = getOpenAIClient(apiKey);
    const gptResults = await openAI.chat.completions.create({
      model: "gpt-4o-mini", // ✅ switched from gpt-3.5-turbo
      messages: [{ role: "user", content: gptSearch }],
    });

    console.log(gptResults.choices[0]?.message?.content);

    const gptMovies = gptResults.choices[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //[promise, promise, promise, promise, promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(addGptResults({movieNames: gptMovies, movieResults: tmdbResults}));
  };

  return (
    <div className="pt-28 md:pt-28 flex justify-center">
      <form className="w-full mx-5 flex md:w-1/3" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          className="w-3/4 p-2 px-4 m-2 h-10 border-none rounded-sm text-sm"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        ></input>
        <button
          className="m-2 p-2 px-6 h-10 bg-red-700 text-sm text-white ml-2 rounded-sm"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
