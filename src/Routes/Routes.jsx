import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../components/shared/ErrorPage";
import Home from "../components/home/Home";
import JobListings from "../components/pages/JobListing";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Recommendations from "../components/pages/recommendation/Recommendations";
import DashboardPage from "../components/pages/Dashboard/DashboardPage";
import ProfilePage from "../components/pages/Profile/ProfilePage";
import JobDetailsPage from "../components/pages/jobs/JobDetailsPage";
import PrivateRoute from "./PrivateRoute";
import AddJobPage from "../components/pages/Dashboard/admin/AddJobPage";

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
        element: (
          <PrivateRoute>
            <JobListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/recommendations",
        element: (
          <PrivateRoute>
            <Recommendations />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/jobs",
        element: (
          <PrivateRoute>
            <AddJobPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/profilePage",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
