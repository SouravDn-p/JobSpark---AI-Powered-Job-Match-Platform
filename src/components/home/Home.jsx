import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle,
  Users,
  Briefcase,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { AuthContexts } from "../providers/AuthProviders";

const Home = () => {
  const { user, isDarkMode, toggleTheme } = useContext(AuthContexts);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } transition-colors duration-300`}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            isDarkMode
              ? "from-blue-900 to-blue-700"
              : "from-blue-700 to-blue-500"
          } opacity-95`}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-end mb-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  aria-label={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Find Your Perfect Job Match</span>
                <span className="block text-blue-200">Powered by AI</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
                JobMatch uses AI to connect you with jobs that match your
                skills, experience, and career goals.
              </p>
              <div className="mt-10 flex justify-center gap-4 flex-wrap">
                {user ? (
                  <>
                    <Link
                      to="/recommendations"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Get Job Recommendations
                    </Link>
                    <Link
                      to="/jobs"
                      className="inline-flex items-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Browse All Jobs
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/jobs"
                      className="inline-flex items-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                      Browse Jobs
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        className={`py-16 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        } lg:py-24`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className={`text-3xl font-extrabold ${
                isDarkMode ? "text-white" : "text-gray-900"
              } sm:text-4xl`}
            >
              Find Jobs That Match Your Skills
            </h2>
            <p
              className={`mt-4 max-w-3xl mx-auto text-xl ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Our AI-powered platform analyzes your skills and experience to
              find the perfect job match.
            </p>
          </div>

          <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h3
                className={`text-2xl font-extrabold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } sm:text-3xl`}
              >
                Personalized Job Recommendations
              </h3>
              <p
                className={`mt-3 text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Our AI algorithm matches your profile with the most relevant job
                opportunities.
              </p>
              <dl className="mt-10 space-y-10">
                <div className="flex">
                  <div
                    className={`flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 text-white flex items-center justify-center`}
                  >
                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <dt
                      className={`text-lg font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      AI-Powered Matching
                    </dt>
                    <dd
                      className={`mt-2 text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Analyzes your skills and preferences to recommend
                      high-match jobs.
                    </dd>
                  </div>
                </div>
                <div className="flex">
                  <div
                    className={`flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 text-white flex items-center justify-center`}
                  >
                    <CheckCircle className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <dt
                      className={`text-lg font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Skills-Based Matching
                    </dt>
                    <dd
                      className={`mt-2 text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Identifies jobs where your skills align with requirements.
                    </dd>
                  </div>
                </div>
                <div className="flex">
                  <div
                    className={`flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 text-white flex items-center justify-center`}
                  >
                    <Users className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <dt
                      className={`text-lg font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Career Growth Insights
                    </dt>
                    <dd
                      className={`mt-2 text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Provides skill gap analysis and career advancement tips.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="relative rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-96 object-cover"
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="People working on computers"
                />
                <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-20" />
              </div>
            </div>
          </div>

          <div className="mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:order-2">
              <h3
                className={`text-2xl font-extrabold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } sm:text-3xl`}
              >
                For Job Seekers & Employers
              </h3>
              <p
                className={`mt-3 text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                JobMatch connects job seekers with dream roles and employers
                with top talent.
              </p>
              <dl className="mt-10 space-y-10">
                <div className="flex">
                  <div
                    className={`flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 text-white flex items-center justify-center`}
                  >
                    <Briefcase className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <dt
                      className={`text-lg font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Wide Range of Opportunities
                    </dt>
                    <dd
                      className={`mt-2 text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Explore thousands of jobs across industries like tech,
                      healthcare, and finance.
                    </dd>
                  </div>
                </div>
                <div className="flex">
                  <div
                    className={`flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 text-white flex items-center justify-center`}
                  >
                    <Search className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <dt
                      className={`text-lg font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Advanced Filtering
                    </dt>
                    <dd
                      className={`mt-2 text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Filter jobs by location, type, experience, and more.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            <div className="mt-10 lg:mt-0 lg:order-1">
              <div className="relative rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-96 object-cover"
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="People in a meeting"
                />
                <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className={`py-12 ${
          isDarkMode ? "bg-blue-900" : "bg-blue-700"
        } lg:py-24`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            <span className="block">Ready to find your perfect job?</span>
            <span className="block text-blue-200">
              Start with JobMatch today.
            </span>
          </h2>
          <div className="mt-8 flex gap-4 flex-wrap lg:mt-0">
            <Link
              to={user ? "/recommendations" : "/register"}
              className="inline-flex items-center px-5 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              {user ? "Get Recommendations" : "Get Started"}
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
