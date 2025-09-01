import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearch } from "../utils/GPTSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        if (window.location.pathname === "/") {
          navigate("/Browse");
        }
        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //onAuthStateChanged handle this
        localStorage.removeItem("openai_key");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearch());
    if (!showGptSearch) {
      navigate("/gptSearch");
    } else {
      navigate("/browse");
    }
  };
  const handleLangSelecter = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="bg-gradient-to-b from-black absolute w-full flex justify-between z-20">
      <Link to="/browse">
        <button>
          <img
            className="mx-2 p-1 md:mx-4 md:p-2 w-20 md:w-32"
            src={LOGO}
            alt="logo"
          ></img>
        </button>
      </Link>
      {user && (
        <div className="mx-2  p-2 flex justify-center z-10">
          {showGptSearch && (
            <select
              className="bg-neutral-700 text-white mr-4 h-[25px] w-16 md:w-24 md:h-[34px] rounded-sm mt-1 md:mt-2 px-2"
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
            className="mr-2 my-1 p-1 md:my-2 md:p-2 hover:bg-emerald-700 bg-emerald-600 text-xs md:text-sm font-bold text-white rounded-sm md:rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          {!showGptSearch && (
            <div className="flex items-center">
              <img
                className="w-6 h-6 md:w-10 md:h-10 m:1 md:m-2 rounded-lg"
                src={USER_AVATAR}
                alt="profile-logo"
              />
              <button
                className="ml-1 my-1 p-1 md:my-2 md:p-2 bg-red-700 text-xs md:text-sm font-bold text-white rounded-sm md:rounded-lg"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
