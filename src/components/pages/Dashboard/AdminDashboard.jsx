import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";
import {
  FaUsers,
  FaBriefcase,
  FaRegFileAlt,
  FaChartBar,
  FaCog,
  FaPlus,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

// Mock data
const mockUsers = [
  {
    id: "u1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    createdAt: "2025-05-15T10:00:00Z",
  },
  {
    id: "u2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    createdAt: "2025-05-14T12:00:00Z",
  },
  {
    id: "u3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "admin",
    createdAt: "2025-05-13T09:00:00Z",
  },
  {
    id: "u4",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    role: "user",
    createdAt: "2025-05-12T15:00:00Z",
  },
];

const mockJobs = [
  {
    id: "j1",
    title: "Senior AI Engineer",
    company: "Tech Corp",
    status: "active",
    createdAt: "2025-05-16T08:00:00Z",
  },
  {
    id: "j2",
    title: "Data Scientist",
    company: "Data Inc",
    status: "active",
    createdAt: "2025-05-15T14:00:00Z",
  },
  {
    id: "j3",
    title: "ML Researcher",
    company: "AI Labs",
    status: "inactive",
    createdAt: "2025-05-14T11:00:00Z",
  },
  {
    id: "j4",
    title: "Backend Developer",
    company: "Cloud Solutions",
    status: "active",
    createdAt: "2025-05-13T16:00:00Z",
  },
];

const mockApplications = [
  {
    id: "a1",
    userId: "u1",
    jobId: "j1",
    status: "Applied",
    createdAt: "2025-05-16T09:00:00Z",
  },
  {
    id: "a2",
    userId: "u2",
    jobId: "j2",
    status: "Interview",
    createdAt: "2025-05-15T10:00:00Z",
  },
  {
    id: "a3",
    userId: "u3",
    jobId: "j3",
    status: "Offer",
    createdAt: "2025-05-14T12:00:00Z",
  },
];

const AdminDashboard = () => {
  const { isDarkMode, dbUser } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setDashboardLoading(true);

        // Use mock data
        const users = mockUsers;
        const jobs = mockJobs;
        const applications = mockApplications;

        // Update stats
        setStats({
          totalUsers: users.length,
          totalJobs: jobs.length,
          totalApplications: applications.length,
          activeJobs: jobs.filter((job) => job.status === "active").length,
        });

        // Get recent users (last 3 registered)
        setRecentUsers(
          users
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
        );

        // Get recent jobs (last 3 posted)
        setRecentJobs(
          jobs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
        );

        setDashboardLoading(false);
      } catch (error) {
        console.error("Error loading admin dashboard data:", error);
        setDashboardLoading(false);
      }
    };

    loadAdminData();
  }, []);

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

  if (dashboardLoading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen pt-16 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <LoadingSpinner size="large" text="Loading admin dashboard..." />
      </div>
    );
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
            Admin Dashboard, {dbUser?.name || "Admin"}
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Manage users, jobs, and applications
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
                  <FaUsers className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Total Users
                  </h3>
                  <p className="text-2xl font-semibold">{stats.totalUsers}</p>
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
                      ? "bg-green-900 text-green-400"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <FaBriefcase className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Total Jobs
                  </h3>
                  <p className="text-2xl font-semibold">{stats.totalJobs}</p>
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
                      ? "bg-yellow-900 text-yellow-400"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <FaRegFileAlt className="h-5 w-5" />
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
                    {stats.totalApplications}
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
                  <FaChartBar className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Active Jobs
                  </h3>
                  <p className="text-2xl font-semibold">{stats.activeJobs}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Users Section */}
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
                    <FaUsers
                      className={`mr-2 ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                    Recent Users
                  </h2>
                  <Link
                    to="/admin/users"
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
                  {recentUsers.length > 0 ? (
                    <div className="space-y-3">
                      {recentUsers.map((user) => (
                        <div
                          key={user.id}
                          className={`2 border rounded-lg p-4 hover:shadow-sm transition-shadow ${
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
                                {user.name}
                              </h3>
                              <p
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {user.email}
                              </p>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                user.role === "admin"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)}
                            </span>
                          </div>
                          <div
                            className={`mt-2 text-xs ${
                              isDarkMode ? "text-gray-500" : "text-gray-500"
                            }`}
                          >
                            Registered: {formatDate(user.createdAt)}
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
                        No users found
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recent Jobs Section */}
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
                    <FaBriefcase
                      className={`mr-2 ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                    Recent Jobs
                  </h2>
                  <Link
                    to="/admin/jobs"
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
                  {recentJobs.length > 0 ? (
                    <div className="space-y-3">
                      {recentJobs.map((job) => (
                        <div
                          key={job.id}
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
                                {job.title}
                              </h3>
                              <p
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {job.company}
                              </p>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                job.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {job.status.charAt(0).toUpperCase() +
                                job.status.slice(1)}
                            </span>
                          </div>
                          <div
                            className={`mt-2 text-xs ${
                              isDarkMode ? "text-gray-500" : "text-gray-500"
                            }`}
                          >
                            Posted: {formatDate(job.createdAt)}
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
                        No jobs found
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Admin Actions Card */}
              <Card
                className={`mt-6 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-blue-600 to-blue-800"
                    : "bg-gradient-to-br from-blue-600 to-blue-800"
                } text-white`}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Admin Actions</h3>
                  <p className="mb-6 text-blue-100">
                    Manage platform settings and perform administrative tasks
                  </p>
                  <div className="space-y-4">
                    <Button
                      to="/admin/users"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:bg-opacity-10 w-full"
                    >
                      Manage Users
                    </Button>
                    <Button
                      to="/admin/jobs"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:bg-opacity-10 w-full"
                    >
                      <FaPlus className="mr-2" />
                      Add Job
                    </Button>
                    <Button
                      to="/admin/jobs"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:bg-opacity-10 w-full"
                    >
                      Manage Jobs
                    </Button>
                    <Button
                      to="/admin/settings"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:bg-opacity-10 w-full"
                    >
                      <FaCog className="mr-2" />
                      Platform Settings
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
