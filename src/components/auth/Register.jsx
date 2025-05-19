"use client";

import { useContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase/firebase.init";
import {
  Briefcase,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Image,
  Loader,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { isDarkMode, createUser } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const passwordCriteria = [
    { test: /[A-Z]/, message: "One uppercase letter" },
    { test: /[a-z]/, message: "One lowercase letter" },
    { test: /.{6,}/, message: "At least 6 characters" },
  ];

  const validatePassword = (password) => {
    const failedCriteria = passwordCriteria.filter(
      (criterion) => !criterion.test.test(password)
    );
    return failedCriteria.length
      ? failedCriteria.map((c) => c.message).join(", ")
      : null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const validationErrors = validatePassword(password);
    if (validationErrors) {
      setError(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUser(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL:
          photoURL ||
          "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email,
      });
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
      e.target.reset();
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess("Google registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300 animate__animated animate__fadeIn`}
    >
      <div className="w-full max-w-md">
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-2">
                JobSpark Register
              </h2>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Join JobSpark to unlock AI-powered job opportunities
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                } mb-2`}
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className={`w-full px-4 py-3 pl-12 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  required
                />
                <User
                  className={`w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                } mb-2`}
              >
                Profile Picture URL (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="photoURL"
                  placeholder="https://example.com/photo.jpg"
                  className={`w-full px-4 py-3 pl-12 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                />
                <Image
                  className={`w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                } mb-2`}
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 pl-12 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  required
                />
                <Mail
                  className={`w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className={`block text-sm font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                } mb-2`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 pl-12 pr-12 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  required
                />
                <Lock
                  className={`w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-600"
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicators */}
              <div className="mt-2 space-y-1">
                {passwordCriteria.map((criterion, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-3 h-3 rounded-full flex items-center justify-center ${
                        criterion.test.test(password)
                          ? "bg-green-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      {criterion.test.test(password) && (
                        <span className="text-white text-[8px]">✓</span>
                      )}
                    </div>
                    <span
                      className={`${
                        criterion.test.test(password)
                          ? "text-green-600 dark:text-green-400"
                          : isDarkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {criterion.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors animate__animated animate__zoomIn ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Alerts */}
          {error && (
            <div
              className={`mt-4 p-4 rounded-lg border flex items-center gap-2 animate__animated animate__fadeIn ${
                isDarkMode
                  ? "bg-red-900/30 border-red-800 text-red-400"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div
              className={`mt-4 p-4 rounded-lg border flex items-center gap-2 animate__animated animate__fadeIn ${
                isDarkMode
                  ? "bg-green-900/30 border-green-800 text-green-400"
                  : "bg-green-50 border-green-200 text-green-600"
              }`}
            >
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          {/* Google Sign-Up */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  isDarkMode ? "border-gray-600" : "border-gray-300"
                }`}
              />
            </div>
            <div
              className={`relative flex justify-center text-sm ${
                isDarkMode
                  ? "bg-gray-800 text-gray-400"
                  : "bg-white text-gray-500"
              }`}
            >
              <span className="px-2">Or continue with</span>
            </div>
          </div>

          <button
            className={`w-full px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium border rounded-lg animate__animated animate__zoomIn ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleGoogleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </>
            )}
          </button>

          {/* Sign In Link */}
          <p
            className={`mt-6 text-center text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Sign in
            </button>
          </p>

          {/* Explore Jobs Link */}
          <p
            className={`mt-2 text-center text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Ready to find your dream job?{" "}
            <Link
              to="/jobs"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Explore Jobs
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
