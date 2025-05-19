import ProfileForm from "../components/profile/ProfileForm";
import useAuth from "../../hooks/useAuth";

export default function Profile() {
  const { isDarkMode } = useAuth();
  return (
    <div
      className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 animate__animated animate__fadeIn`}
    >
      <h1
        className={`text-3xl font-bold ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        } mb-8`}
      >
        My Profile
      </h1>
      <ProfileForm />
    </div>
  );
}
