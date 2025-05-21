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
    <section className="min-h-screen flex flex-col">
      {!isLogin && (
        <div className="sticky top-0 z-50 bg-black">
          <Navbar />
        </div>
      )}
      <Outlet />
      {!isLogin && <Footer />}
    </section>
  );
}
