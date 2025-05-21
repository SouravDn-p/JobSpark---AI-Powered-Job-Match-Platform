import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw, AlertTriangle } from "lucide-react";
import JobCard from "../JobCard";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useJobs from "../../hooks/useJobs";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function Recommendations() {
  const { dbUser, isDarkMode, user } = useAuth();
  const { jobs, jobsLoading, error: jobsError } = useJobs();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();
  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    // Simulate async processing with a minimum delay for visual feedback
    setTimeout(async () => {
      try {
        const response = await axiosPublic.get("/recommendations", {
          params: { email: user?.email },
        });
        setRecommendations(response.data);
      } catch (err) {
        console.error("Error processing recommendations:", err);
        setError(
          "Failed to fetch job recommendations. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    }, 1000); // 1-second delay to ensure loading state is visible
  };

  useEffect(() => {
    if (!jobsLoading) {
      fetchRecommendations();
    }
  }, [jobs, jobsLoading, dbUser]);

  const handleRefresh = () => {
    fetchRecommendations();
  };

  return (
    <div
      className={`w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-700"
      } transition-colors duration-300 animate__animated animate__fadeIn`}
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
            AI-Powered Recommendations
          </h1>
          <p
            className={`mt-2 text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Jobs tailored to your skills with AI-powered matching
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isLoading || jobsLoading}
          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            isLoading || jobsLoading ? "opacity-50 cursor-not-allowed" : ""
          } animate__animated animate__zoomIn`}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          {isLoading ? "Refreshing..." : "Refresh Recommendations"}
        </button>
      </div>

      {/* Skills Summary */}
      <div
        className={`rounded-lg shadow-sm border p-6 mb-8 animate__animated animate__fadeInUp ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-lg font-medium mb-4">Your Skills Profile</h2>
        {dbUser?.profile?.skills?.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {dbUser.profile.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 text-sm rounded-full ${
                    isDarkMode
                      ? "bg-blue-700 text-blue-200"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              These skills are used to generate your job recommendations.{" "}
              <Link
                to="/profilePage"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Update your skills
              </Link>
            </p>
          </>
        ) : (
          <div
            className={`flex items-start p-4 rounded-md ${
              isDarkMode
                ? "bg-amber-900/30 border-amber-800"
                : "bg-amber-50 border-amber-200"
            } border`}
          >
            <AlertTriangle
              className={`h-5 w-5 ${
                isDarkMode ? "text-amber-400" : "text-amber-500"
              } mr-3 flex-shrink-0 mt-0.5`}
            />
            <div>
              <p className={isDarkMode ? "text-amber-300" : "text-amber-800"}>
                You haven’t added skills to your profile yet. Adding skills will
                improve your job recommendations.
              </p>
              <Link
                to="/profilePage"
                className={`mt-2 inline-block text-sm font-medium ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                Update your skills profile
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-xl font-medium mb-4">Recommended Jobs</h2>
        {jobsLoading || isLoading ? (
          <div
            className={`flex flex-col items-center justify-center py-12 rounded-lg shadow-sm border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } animate__animated animate__pulse animate__infinite`}
          >
            <div
              className={`w-12 h-12 rounded-full bg-blue-400 animate-pulse mb-4`}
            ></div>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Analyzing your profile and finding the best matches...
            </p>
          </div>
        ) : jobsError || error ? (
          <div
            className={`text-center py-12 rounded-lg border animate__animated animate__fadeIn ${
              isDarkMode
                ? "bg-red-900/30 border-red-800"
                : "bg-red-50 border-red-200"
            }`}
          >
            <p className={isDarkMode ? "text-red-400" : "text-red-600"}>
              {jobsError?.message || error || "An error occurred"}
            </p>
            <button
              className={`mt-4 text-sm font-medium ${
                isDarkMode
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              }`}
              onClick={handleRefresh}
            >
              Try again
            </button>
          </div>
        ) : recommendations.length === 0 ? (
          <div
            className={`text-center py-12 rounded-lg border animate__animated animate__fadeIn ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              We couldn’t find job matches based on your current profile.
            </p>
            <div className="mt-4 space-x-4">
              <Link
                to="/profilePage"
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                Update your profile
              </Link>
              <Link
                to="/jobs"
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                Browse all jobs
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendations.map((job, index) => (
              <div
                key={job.jobDetails._id}
                className={`animate__animated animate__fadeInUp animate__delay-${
                  (index % 5) + 1
                }s`}
              >
                <JobCard
                  job={job.jobDetails}
                  isRecommended={true}
                  matchScore={job.match_score}
                  isApplied={job.jobDetails.isApplied}
                />
              </div>
            ))}
            <div className="text-center pt-4">
              <Link
                to="/jobs"
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                View all available jobs
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
