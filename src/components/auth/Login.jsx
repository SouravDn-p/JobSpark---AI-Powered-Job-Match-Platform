"use client";

import { useState } from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import auth from "../firebase/firebase.init";
import {
  Briefcase,
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogOut,
  Loader,
  Sparkles,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser, signInUser, isDarkMode } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const userCredential = await signInUser(email, password);
      setUser(userCredential.user);
      setSuccess("Welcome back! Login successful");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setSuccess("Welcome! Google sign-in successful");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Google Sign-In error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signOut(auth);
      setUser(null);
      setSuccess("Successfully signed out");
    } catch (err) {
      console.error("Sign-Out error:", err.message);
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
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border`}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-2">
                JobSpark Login
              </h2>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Sign in to unlock AI-powered job opportunities
            </p>
          </div>

          {user ? (
            <div className="space-y-4 text-center">
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <p className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
                  Welcome, {user.displayName || user.email}
                </p>
                <Link
                  to="/recommendations"
                  className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  Explore AI Job Matches
                </Link>
              </div>
              <button
                className={`w-full px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                } animate__animated animate__zoomIn`}
                onClick={handleGoogleSignOut}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </>
                )}
              </button>
            </div>
          ) : (
            <>
              {/* Form */}
              <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
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
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/forgot-password", { state: { email } })
                      }
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Forgot password?
                    </button>
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
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Alerts */}
              {error && (
                <div
                  className={`mt-4 p-4 rounded-lg border animate__animated animate__fadeIn ${
                    isDarkMode
                      ? "bg-red-900/30 border-red-800 text-red-400"
                      : "bg-red-50 border-red-200 text-red-600"
                  }`}
                >
                  <p className="text-sm text-center">{error}</p>
                </div>
              )}
              {success && (
                <div
                  className={`mt-4 p-4 rounded-lg border animate__animated animate__fadeIn ${
                    isDarkMode
                      ? "bg-green-900/30 border-green-800 text-green-400"
                      : "bg-green-50 border-green-200 text-green-600"
                  }`}
                >
                  <p className="text-sm text-center">{success}</p>
                </div>
              )}

              {/* Google Sign-In */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`w-full border-t ${
                      isDarkMode ? "border-gray-600" : "border-gray-300"
                    }`}
                  />
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
              </div>

              <button
                className={`w-full px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium border rounded-lg animate__animated animate__zoomIn ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleGoogleSignIn}
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
                    Sign in with Google
                  </>
                )}
              </button>

              {/* Sign Up Link */}
              <p
                className={`mt-6 text-center text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </>
          )}

          {/* Home Link */}
          <NavLink
            to="/"
            className={`w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors animate__animated animate__zoomIn`}
          >
            <Briefcase className="w-5 h-5" />
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}
