import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaStar,
  FaRegStar,
  FaArrowLeft,
} from "react-icons/fa";
import Card from "../common/Card";
import useAuth from "../../hooks/useAuth";
import ApplySection from "./ApplySection";
import useJobs from "../../hooks/useJobs";

const JobDetailsPage = () => {
  const { id } = useParams();
  const { isDarkMode, dbUser } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const { jobs } = useJobs();

  const job = jobs.find((job) => job._id === id);
  const isApplied = dbUser?.applications?.find((job) => job.jobId == id);

  if (!job) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold">Job not found</h2>
      </div>
    );
  }

  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={`min-h-screen py-8 px-4 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Back to Jobs Link */}
        <Link
          to="/jobs"
          className={`flex items-center mb-6 text-sm ${
            isDarkMode
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </Link>

        {/* Main Content Grid */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 flex flex-col">
          {/* Job Details */}
          <div className="lg:col-span-2 mb-6 lg:mb-0">
            <Card
              className={`overflow-visible ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1
                      className={`text-3xl font-bold ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {job.title}
                    </h1>
                    <div
                      className={`flex items-center mt-2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <FaBuilding className="mr-2" />
                      <span>{job.company}</span>
                    </div>
                  </div>
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
                        className={`w-8 h-8 ${
                          isDarkMode ? "text-yellow-400" : "text-yellow-500"
                        }`}
                      />
                    ) : (
                      <FaRegStar className="w-8 h-8" />
                    )}
                  </button>
                </div>

                {/* Job Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <FaClock className="mr-2" />
                    <span>{job.type}</span>
                  </div>
                  <div
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <FaBriefcase className="mr-2" />
                    <span>{job.remote ? "Remote" : "On-site"}</span>
                  </div>
                  <div
                    className={`flex items-center ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        isDarkMode ? "text-primary-400" : "text-primary-600"
                      }`}
                    >
                      {job.salary}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2
                    className={`text-xl font-semibold mb-3 ${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Job Description
                  </h2>
                  <p
                    className={`leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {job.description}
                  </p>
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                  <h2
                    className={`text-xl font-semibold mb-3 ${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Responsibilities
                  </h2>
                  <ul
                    className={`list-disc pl-5 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h2
                    className={`text-xl font-semibold mb-3 ${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Requirements
                  </h2>
                  <ul
                    className={`list-disc pl-5 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {job.requirements.map((item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h2
                    className={`text-xl font-semibold mb-3 ${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
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
                  </div>
                </div>

                {/* Additional Info */}
                <div
                  className={`mb-6 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <p>Posted on: {job.posted}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Apply Section */}
          <div className="lg:col-span-1">
            <ApplySection
              job={job}
              isDarkMode={isDarkMode}
              isApplied={isApplied}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetailsPage;
