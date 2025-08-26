import { useRef, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignButton = () => {
    //validate login
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!signInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(
            "User not found. Check your e-mail and password again!"
          );
        });
    }
  };

  const toggleToSignUp = () => {
    setSignInForm(!signInForm);
  };
  return (
    <div className="relative">
      <Header />
      <div className="fixed">
        <img
          className="brightness-50 h-screen object-cover md:h-auto"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg"
          alt="bg-img"
        ></img>
      </div>
      <div className="flex m-auto justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute w-[360px] md:w-[480px] py-12 px-10 md:px-16 mt-24 md:mt-32 justify-center bg-black bg-opacity-80 rounded-md text-white"
        >
          <p className="test-sm text-white pb-4 w-auto">
            ⚠️ This is a learning project built with Firebase Authentication.
            Not affiliated with any real brand.
          </p>
          <h1 className="font-bold text-3xl mb-5">
            {signInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!signInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Enter Full Name"
              className="my-2 p-4 w-full bg-gray-700 rounded-md bg-opacity-75"
            ></input>
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or mobile number"
            className="my-2 p-4 w-full bg-gray-700 rounded-md bg-opacity-75"
          ></input>
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="my-2 p-4 w-full bg-gray-700 rounded-md bg-opacity-75"
          ></input>
          <p className="text-md font-bold text-red-600 my-2">{errorMessage}</p>
          <button
            className="my-4 p-3 w-full text-sm font-semibold bg-red-700 rounded-md"
            onClick={handleSignButton}
          >
            {signInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-gray-400 text-center m-1">OR</p>
          <button className="my-4 p-3 w-full text-sm font-semibold bg-neutral-600 rounded-md bg-opacity-70">
            Use a sign-in code
          </button>
          <p className="text-center m-2 underline">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
          <p className="text-gray-400 my-5">
            {signInForm ? "New to Netflix? " : "Already a user? "}{" "}
            <span
              className="text-white font-bold cursor-pointer"
              onClick={toggleToSignUp}
            >
              {signInForm ? "Sign up now" : "Sign in now"}
            </span>
          </p>
          <p className="text-neutral-400 text-sm">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
