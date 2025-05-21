import { Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Globe,
  Tag,
  Sparkles,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function JobCard({ job, matchScore, isApplied }) {
  const { isDarkMode } = useAuth();

  // Validate job prop to prevent undefined errors
  if (!job || !job.title || !job.company) {
    return null; // Skip rendering if critical job data is missing
  }

  // Determine badge color based on matchScore
  const getMatchScoreColor = (score) => {
    if (score >= 80)
      return isDarkMode
        ? "bg-green-600 text-white"
        : "bg-green-100 text-green-800";
    if (score >= 60)
      return isDarkMode
        ? "bg-yellow-600 text-white"
        : "bg-yellow-100 text-yellow-800";
    return isDarkMode ? "bg-red-600 text-white" : "bg-red-100 text-red-800";
  };

  return (
    <div
      className={`rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg animate__animated animate__fadeInUp ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        {/* Job Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
              {job.title}
            </h3>
            {/* Highlight matchScore if available */}
            {matchScore && (
              <div className="relative group">
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getMatchScoreColor(
                    matchScore
                  )}`}
                  aria-label={`Job match score: ${matchScore}%`}
                >
                  <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                  {matchScore}% Match
                </span>
                <span
                  className={`absolute hidden group-hover:block text-xs p-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  } -top-10 left-1/2 transform -translate-x-1/2 z-10 whitespace-nowrap`}
                >
                  AI-calculated match based on your profile
                </span>
              </div>
            )}
          </div>
          <p
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } mt-1`}
          >
            {job.company}
          </p>

          {/* Meta Info */}
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <MapPin
                className={`h-4 w-4 mr-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <span>{job.location || "N/A"}</span>
            </div>
            <div className="flex items-center">
              <DollarSign
                className={`h-4 w-4 mr-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <span>{job.salary || "N/A"}</span>
            </div>
            <div className="flex items-center">
              <Clock
                className={`h-4 w-4 mr-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <span>{job.type || "N/A"}</span>
            </div>
            {job.remote && (
              <div className="flex items-center">
                <Globe
                  className={`h-4 w-4 mr-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <span>Remote</span>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(job.skills || []).slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Tag className="h-3 w-3 mr-1" />
                {skill}
              </span>
            ))}
            {(job.skills || []).length > 4 && (
              <span
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                +{(job.skills || []).length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col gap-2">
          <Link
            to={`/jobs/${job._id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            View Details
          </Link>
          <button
            disabled={isApplied}
            className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              isApplied
                ? "border-gray-500 text-gray-500 cursor-not-allowed"
                : isDarkMode
                ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>
        </div>
      </div>

      {/* AI Recommendation Link */}
      <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
        <Link
          to="/recommendations"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Sparkles className="h-4 w-4 mr-1" />
          Find similar AI-recommended jobs
        </Link>
      </div>
    </div>
  );
}
