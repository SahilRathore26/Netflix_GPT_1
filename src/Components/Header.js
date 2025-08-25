import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../utils/constants";

const Header = ({
  logoSize = "w-44",
  marginClass = "mx-32",
  paddingClass = "p-6",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        navigate("/Browse");
        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-full bg-gradient-to-b from-black z-10">
      <div className={`${marginClass} ${paddingClass}`}>
        <img
          className={`${logoSize}`}
          src= {LOGO}
          alt="logo"
        ></img>
      </div>
    </div>
  );
};

export default Header;
