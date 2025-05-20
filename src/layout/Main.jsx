import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function Main() {
  const location = useLocation();
  const isLogin =
    location.pathname.includes("login") ||
    location.pathname.includes("register") ||
    location.pathname.includes("forgotPassword");
  return (
    <section className="mx-auto my-auto h-screen">
      {isLogin || <Navbar />}
      <Outlet />
      {isLogin || <Footer />}
    </section>
  );
}
