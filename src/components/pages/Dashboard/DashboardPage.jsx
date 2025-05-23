import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";
import JobCard from "../jobs/JobCard";
import LoadingSpinner from "../common/LoadingSpinner";
import {
  FaBriefcase,
  FaRegListAlt,
  FaChartLine,
  FaUserTie,
  FaCheck,
  FaRegClock,
  FaRegFileAlt,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useJobs from "../../hooks/useJobs";
import AdminDashboard from "./AdminDashboard";

const DashboardPage = () => {
  const { jobs } = useJobs();
  const { currentUser, isDarkMode, dbUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [applicationStats, setApplicationStats] = useState({
    applied: 0,
    inProgress: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setDashboardLoading(true);
        setLoading(true);

        // Use dbUser.skills for job matching
        const userSkills = dbUser?.profile?.skills || [];
        let filteredJobs = jobs;
        if (userSkills.length > 0) {
          filteredJobs = jobs.filter((job) =>
            job.skills.some((skill) => userSkills.includes(skill))
          );
        }

        // Add mock matchScore to jobs (since dbUser doesn't provide matchScore)
        const jobsWithScore = filteredJobs.slice(0, 3).map((job, index) => ({
          ...job,
          matchScore: 95 - index * 5, // Mock scores: 95, 90, 85
        }));
        setMatchedJobs(jobsWithScore);

        // Set applications from dbUser
        setApplications(dbUser?.applications || []);

        // Set application stats from dbUser
        setApplicationStats({
          applied: dbUser?.applicationStats?.applied || 0,
          inProgress: dbUser?.applicationStats?.inProgress || 0,
          interviews: dbUser?.applicationStats?.interviews || 0,
          offers: dbUser?.applicationStats?.offers || 0,
          rejected: dbUser?.applicationStats?.rejected || 0,
        });

        setLoading(false);
        setDashboardLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setDashboardLoading(false);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [currentUser, dbUser]);

  // Status labels and colors for application status
  const statusConfig = {
    Applied: { label: "Applied", color: "bg-blue-100 text-blue-800" },
    "In Progress": {
      label: "In Progress",
      color: "bg-yellow-100 text-yellow-800",
    },
    Interview: { label: "Interview", color: "bg-purple-100 text-purple-800" },
    Offer: { label: "Offer", color: "bg-green-100 text-green-800" },
    Rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
  };

  // Format date string
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const fields = [
      dbUser?.profile?.headline,
      dbUser?.profile?.bio,
      dbUser?.profile?.location,
      dbUser?.profile?.skills?.length > 0,
      dbUser?.profile?.experience?.length > 0,
      dbUser?.profile?.education?.length > 0,
      dbUser?.profile?.jobPreferences?.jobTypes?.length > 0,
      dbUser?.profile?.jobPreferences?.locations?.length > 0,
      dbUser?.profile?.jobPreferences?.salary?.min,
      dbUser?.profile?.jobPreferences?.salary?.max,
      dbUser?.profile?.jobPreferences?.remote !== null,
    ];
    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  if (dashboardLoading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen pt-16 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <LoadingSpinner size="large" text="Loading your dashboard..." />
      </div>
    );
  }

  if (dbUser?.role == "admin") {
    return <AdminDashboard />;
  }

  return (
    <div
      className={`pt-20 pb-10 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            Welcome, {dbUser?.name || currentUser?.name || "User"}
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Here's what's happening with your job search
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card
              className={`p-6 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`p-3 rounded-full ${
                    isDarkMode
                      ? "bg-blue-900 text-blue-400"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  <FaRegListAlt className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Total Applications
                  </h3>
                  <p className="text-2xl font-semibold">
                    {applications.length}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card
              className={`p-6 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`p-3 rounded-full ${
                    isDarkMode
                      ? "bg-yellow-900 text-yellow-400"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <FaRegClock className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Interviews
                  </h3>
                  <p className="text-2xl font-semibold">
                    {applicationStats.interviews}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card
              className={`p-6 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`p-3 rounded-full ${
                    isDarkMode
                      ? "bg-green-900 text-green-400"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <FaCheck className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Offers
                  </h3>
                  <p className="text-2xl font-semibold">
                    {applicationStats.offers}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card
              className={`p-6 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`p-3 rounded-full ${
                    isDarkMode
                      ? "bg-purple-900 text-purple-400"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  <FaChartLine className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Application Rate
                  </h3>
                  <p className="text-2xl font-semibold">
                    {(() => {
                      const {
                        applied,
                        inProgress,
                        interviews,
                        offers,
                        rejected,
                      } = applicationStats;
                      const totalApplications =
                        applied + inProgress + interviews + offers + rejected;
                      const activeApplications =
                        inProgress + interviews + offers;
                      return totalApplications > 0
                        ? `${Math.round(
                            (activeApplications / totalApplications) * 100
                          )}%`
                        : "0%";
                    })()}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top matches section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className={`${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`px-6 py-4 border-b ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  } flex justify-between items-center`}
                >
                  <h2
                    className={`text-xl font-semibold flex items-center ${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    <FaBriefcase
                      className={`mr-2 ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                    Top AI Job Matches
                  </h2>
                  <Link
                    to="/recommendations"
                    className={`text-sm font-medium ${
                      isDarkMode
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    View all
                  </Link>
                </div>
                <div className="p-6">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <LoadingSpinner text="Finding your matches..." />
                    </div>
                  ) : matchedJobs.length > 0 ? (
                    <div className="space-y-4">
                      {matchedJobs.map((job) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          matchScore={job.matchScore}
                          showMatchScore={true}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                      <div className="mt-4 text-center">
                        <Button
                          to="/matches"
                          variant="outline"
                          className={`animate__animated animate__zoomIn ${
                            isDarkMode
                              ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          View All Matches
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FaUserTie
                        className={`mx-auto h-12 w-12 ${
                          isDarkMode ? "text-gray-600" : "text-gray-400"
                        } mb-4`}
                      />
                      <h3
                        className={`text-lg font-medium ${
                          isDarkMode ? "text-gray-200" : "text-gray-900"
                        } mb-2`}
                      >
                        No matches yet
                      </h3>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        } mb-4`}
                      >
                        Complete your profile to get personalized job matches
                      </p>
                      <Button
                        to="/profile"
                        variant="primary"
                        className={`animate__animated animate__zoomIn ${
                          isDarkMode
                            ? "bg-blue-400 hover:bg-blue-500 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        Update Profile
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recent applications section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card
                className={`${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`px-6 py-4 border-b ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  } flex justify-between items-center`}
                >
                  <h2
                    className={`text-xl font-semibold flex items-center ${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    <FaRegFileAlt
                      className={`mr-2 ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                    Recent Applications
                  </h2>
                  <Link
                    to="#"
                    className={`text-sm font-medium ${
                      isDarkMode
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    View all
                  </Link>
                </div>
                <div className="p-4">
                  {applications.length > 0 ? (
                    <div className="space-y-3">
                      {applications.map((app) => (
                        <div
                          key={app.applicationId}
                          className={`border rounded-lg p-4 hover:shadow-sm transition-shadow ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3
                                className={`font-medium ${
                                  isDarkMode ? "text-gray-200" : "text-gray-900"
                                }`}
                              >
                                {app.job}
                              </h3>
                              <p
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {app.company}
                              </p>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                statusConfig[app.status]?.color ||
                                "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {statusConfig[app.status]?.label || app.status}
                            </span>
                          </div>
                          <div
                            className={`mt-2 text-xs ${
                              isDarkMode ? "text-gray-500" : "text-gray-500"
                            }`}
                          >
                            <div>Applied: {formatDate(app.appliedDate)}</div>
                            {app.nextStep && (
                              <div className="mt-1">
                                Next: {app.nextStep}
                                {app.nextStepDate &&
                                  ` (${formatDate(app.nextStepDate)})`}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        } mb-4`}
                      >
                        You haven't applied to any jobs yet
                      </p>
                      <Button
                        to="/jobs"
                        variant="primary"
                        size="small"
                        className={`animate__animated animate__zoomIn ${
                          isDarkMode
                            ? "bg-blue-400 hover:bg-blue-500 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        Browse Jobs
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Profile completion card */}
              <Card
                className={`mt-6 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-blue-600 to-blue-800"
                    : "bg-gradient-to-br from-blue-600 to-blue-800"
                } text-white`}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Complete Your Profile
                  </h3>
                  <p className="mb-6 text-blue-100">
                    A complete profile increases your chances of getting matched
                    with the perfect job by {dbUser?.progress}%
                  </p>
                  <div
                    className={`w-full h-2 rounded-full ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-2 rounded-full ${
                        isDarkMode
                          ? "bg-gradient-to-r from-purple-500 to-blue-500"
                          : "bg-gradient-to-r from-blue-500 to-purple-600"
                      }`}
                      style={{ width: `${dbUser?.progress || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-blue-100 mb-4">
                    {dbUser?.progress}% Complete
                  </p>
                  <Button
                    to="/profile"
                    variant="outline"
                    className={`animate__animated animate__zoomIn border-white text-white hover:bg-white hover:bg-opacity-10 w-full`}
                  >
                    Complete Profile
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
