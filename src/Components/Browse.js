import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import { SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useDispatch, useSelector } from "react-redux";
import { toggleGptSearch } from "../utils/GPTSlice";
import { changeLanguage } from "../utils/configSlice";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //onAuthStateChanged handle this
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearch());
  };
  const handleLangSelecter = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="relative">
      <div className="absolute w-full flex justify-between z-20">
        <div>
          <Header logoSize="w-32" marginClass="mx-4" paddingClass="p-2" />
        </div>
        <div className="mx-2  p-2 flex z-10">
          {showGptSearch && (
            <select
              className="bg-neutral-700 text-white mr-4 h-10 rounded-sm mt-2 px-2"
              onChange={handleLangSelecter}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="my-2 mr-16 p-2 hover:bg-emerald-700 bg-emerald-600 text-sm font-bold text-white rounded-lg "
            onClick={handleGptSearchClick}
          >
            { showGptSearch ? "Home" : "GPT Search" }
          </button>
          <img
            className="w-10 h-10 m-2 rounded-lg"
            src={USER_AVATAR}
            alt="profile-logo"
          ></img>
          <button
            className="my-2 p-2 bg-red-700 text-sm font-bold text-white rounded-lg"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="relativ bg-neutral-900">
        {showGptSearch ? (
          <GptSearch />
        ) : (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
