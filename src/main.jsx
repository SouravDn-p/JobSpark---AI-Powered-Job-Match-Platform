import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./layout/Main.jsx";
import { router } from "./Routes/routes.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./components/providers/AuthProviders.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
