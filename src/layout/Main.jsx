import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function Main() {
  return (
    <section className="mx-auto my-auto h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
}
