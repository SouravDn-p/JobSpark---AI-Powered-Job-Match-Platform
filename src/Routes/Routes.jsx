import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../components/shared/ErrorPage";
import Home from "../components/home/Home";
import JobListings from "../components/pages/JobListing";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Recommendations from "../components/pages/recommendation/Recommendations";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <JobListings />,
      },
      {
        path: "/recommendations",
        element: <Recommendations />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
    ],
  },
]);
