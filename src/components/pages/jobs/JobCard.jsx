import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../common/Button";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

const JobCard = ({
  job,
  matchScore,
  showMatchScore = false,
  showActions = true,
  isDetailed = false,
  isDarkMode = true,
}) => {
  const [isSaved, setIsSaved] = useState(job.isSaved || false);

  const toggleSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: {
      y: -5,
      boxShadow: isDarkMode
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3 },
    },
  };

  // Function to render skill tags
  const renderSkillTags = (skills, limit = isDetailed ? skills.length : 3) => {
    const limitedSkills = skills.slice(0, limit);

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {limitedSkills.map((skill, index) => (
          <span
            key={index}
            className={`text-xs px-3 py-1 rounded-full ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 border border-gray-600"
                : "bg-gray-100 text-gray-800 border border-gray-200"
            }`}
          >
            {skill}
          </span>
        ))}
        {skills.length > limit && !isDetailed && (
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              isDarkMode
                ? "bg-gray-700 text-gray-400 border border-gray-600"
                : "bg-gray-100 text-gray-500 border border-gray-200"
            }`}
          >
            +{skills.length - limit} more
          </span>
        )}
      </div>
    );
  };

  // Generate a gradient based on the match score
  const getMatchScoreGradient = (score) => {
    if (score >= 90) return "from-green-500 to-green-600";
    if (score >= 80) return "from-green-400 to-green-500";
    if (score >= 70) return "from-blue-400 to-blue-500";
    if (score >= 60) return "from-blue-300 to-blue-400";
    if (score >= 50) return "from-yellow-400 to-yellow-500";
    return "from-gray-400 to-gray-500";
  };

  return (
    <motion.div
      className={`rounded-xl overflow-hidden border transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 hover:border-gray-600"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={showActions ? "hover" : {}}
    >
      <Link to={`/jobs/${job.id}`} className="block h-full">
        <div className="p-6">
          {/* Header with Title and Company */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3
                className={`text-xl font-bold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                } mb-1`}
              >
                {job.title}
              </h3>
              <div
                className={`flex items-center ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <FaBuilding className="mr-1" />
                <span>{job.company}</span>
              </div>
            </div>

            {/* Save button and match score */}
            <div className="flex flex-col items-end">
              {showActions && (
                <button
                  onClick={toggleSaved}
                  className={`${
                    isDarkMode
                      ? "text-gray-400 hover:text-yellow-400"
                      : "text-gray-400 hover:text-yellow-500"
                  } transition-colors`}
                >
                  {isSaved ? (
                    <FaStar
                      className={`w-6 h-6 ${
                        isDarkMode ? "text-yellow-400" : "text-yellow-500"
                      }`}
                    />
                  ) : (
                    <FaRegStar className="w-6 h-6" />
                  )}
                </button>
              )}

              {showMatchScore && (
                <div className="mt-2">
                  <div
                    className={`text-xs font-bold text-white bg-gradient-to-r ${getMatchScoreGradient(
                      matchScore
                    )} py-1 px-3 rounded-full`}
                  >
                    {matchScore}% Match
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Job details */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div
              className={`flex items-center text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <FaMapMarkerAlt
                className={`mr-2 ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              />
              <span>{job.location}</span>
            </div>
            <div
              className={`flex items-center text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <FaClock
                className={`mr-2 ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              />
              <span>{job.jobType}</span>
            </div>
            <div
              className={`flex items-center text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <FaBriefcase
                className={`mr-2 ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              />
              <span>{job.experience}</span>
            </div>
            <div
              className={`flex items-center text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span
                className={`font-medium ${
                  isDarkMode ? "text-primary-400" : "text-primary-600"
                }`}
              >
                ${job.salary.toLocaleString()}
              </span>
              <span
                className={`ml-1 ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                /year
              </span>
            </div>
          </div>

          {/* Job description (shortened) */}
          {job.description && (
            <p
              className={`text-sm line-clamp-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } mb-3`}
            >
              {job.description}
            </p>
          )}

          {/* Skills */}
          {job.skills && job.skills.length > 0 && renderSkillTags(job.skills)}

          {/* CTA for detailed view */}
          {showActions && (
            <div className="mt-4 flex justify-between items-center">
              <span
                className={`text-xs ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Posted {job.postedDate}
              </span>
              <Button
                size="small"
                variant="outline"
                onClick={(e) => e.preventDefault()}
                className={
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : ""
                }
              >
                View Details
              </Button>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default JobCard;
