import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import ForgotPass from "./ForgotPass";
import GptSearch from "./GptSearch";
import MovieDetail from "./MovieDetail";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPass />,
    },
    {
      path: "/gptSearch",
      element: <GptSearch />,
    },
    {
      path: "/movie/:id",
      element: <MovieDetail />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
