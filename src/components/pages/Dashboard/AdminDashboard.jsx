import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Users,
  FileText,
  Settings,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Calendar,
  Clock,
  MapPin,
  Search,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

// Helper function to conditionally join class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Mock data for jobs
const mockJobs = [
  {
    id: "j1",
    title: "Senior AI Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    status: "active",
    createdAt: "2025-05-16T08:00:00Z",
  },
  {
    id: "j2",
    title: "Data Scientist",
    company: "Data Inc",
    location: "Remote",
    status: "active",
    createdAt: "2025-05-15T14:00:00Z",
  },
  {
    id: "j3",
    title: "ML Researcher",
    company: "AI Labs",
    location: "New York, NY",
    status: "inactive",
    createdAt: "2025-05-14T11:00:00Z",
  },
  {
    id: "j4",
    title: "Backend Developer",
    company: "Cloud Solutions",
    location: "Austin, TX",
    status: "active",
    createdAt: "2025-05-13T16:00:00Z",
  },
];

// Mock data for recent activity
const recentActivity = [
  {
    action: "New application received for",
    job: "Frontend Developer",
    time: "2 hours ago",
  },
  { action: "Job posting updated:", job: "UX Designer", time: "Yesterday" },
  {
    action: "New job posted:",
    job: "Full Stack Developer",
    time: "3 days ago",
  },
  {
    action: "Application status changed for",
    job: "Product Manager",
    time: "4 days ago",
  },
];

function AdminDashboard() {
  const { isDarkMode, isLoading } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 156,
    totalJobs: 24,
    totalApplications: 342,
    activeJobs: 18,
  });
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Navigate to edit page
  const navigateToEditJob = (jobId) => {
    window.location.href = `/admin/edit-job/${jobId}`;
  };

  // Navigate to add job page
  const navigateToAddJob = () => {
    window.location.href = "/admin/jobs";
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={` mx-auto px-12 py-12 w-screen ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Page Header with Animated Gradient */}
      <div className="relative mb-10 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-gradient-shift"></div>
        <div className="relative p-8 md:p-12 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                Manage your job listings, view applications, and update your
                account settings.
              </p>
            </div>
            <button
              onClick={navigateToAddJob}
              className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-2 group"
            >
              <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Add New Job</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Users",
            value: stats.totalUsers,
            icon: Users,
            color: "from-blue-500 to-indigo-500",
            bgLight: "bg-blue-100",
            bgDark: "bg-blue-900/30",
            textLight: "text-blue-600",
            textDark: "text-blue-400",
          },
          {
            label: "Total Jobs",
            value: stats.totalJobs,
            icon: Briefcase,
            color: "from-purple-500 to-pink-500",
            bgLight: "bg-purple-100",
            bgDark: "bg-purple-900/30",
            textLight: "text-purple-600",
            textDark: "text-purple-400",
          },
          {
            label: "Applications",
            value: stats.totalApplications,
            icon: FileText,
            color: "from-green-500 to-emerald-500",
            bgLight: "bg-green-100",
            bgDark: "bg-green-900/30",
            textLight: "text-green-600",
            textDark: "text-green-400",
          },
          {
            label: "Active Jobs",
            value: stats.activeJobs,
            icon: BarChart3,
            color: "from-amber-500 to-orange-500",
            bgLight: "bg-amber-100",
            bgDark: "bg-amber-900/30",
            textLight: "text-amber-600",
            textDark: "text-amber-400",
          },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div
                  className={cn(
                    "p-3 rounded-lg text-white",
                    `bg-gradient-to-br ${stat.color}`,
                    "shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                  )}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                  style={{
                    width: `${Math.min(100, (stat.value / 100) * 50 + 30)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Listings Section */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Briefcase className="mr-2 h-6 w-6 text-purple-600 dark:text-purple-400" />
              Job Listings
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage and edit your job postings
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-lg"></div>
          <div className="relative overflow-hidden rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Posted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {isLoading ? (
                    // Loading skeleton
                    Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-auto"></div>
                          </td>
                        </tr>
                      ))
                  ) : filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                              {job.title.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {job.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {job.company}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                            {job.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(job.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={cn(
                              "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
                              job.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            )}
                          >
                            {job.status.charAt(0).toUpperCase() +
                              job.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              className="p-1 rounded-md text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                              title="View"
                              onClick={() =>
                                (window.location.href = `/jobs/${job.id}`)
                              }
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <button
                              className="p-1 rounded-md text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                              title="Edit"
                              onClick={() => navigateToEditJob(job.id)}
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              className="p-1 rounded-md text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                      >
                        No jobs found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-lg"></div>
            <div className="relative p-6 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <Clock className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200 group"
                  >
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-3 group-hover:scale-125 transition-transform"></div>
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-gray-200">
                        <span>{item.action}</span>{" "}
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                          {item.job}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.time}
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center justify-center mx-auto">
                  View All Activity
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="lg:col-span-1">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl blur-lg"></div>
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg">
              <div className="absolute top-0 right-0 p-6">
                <Sparkles className="h-6 w-6 text-white/30 animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-2">Admin Actions</h2>
              <p className="mb-6 text-white/80">
                Manage platform settings and perform administrative tasks
              </p>
              <div className="space-y-3">
                {[
                  { label: "Manage Users", icon: Users, href: "/admin/users" },
                  { label: "Add New Job", icon: Plus, href: "/admin/jobs" },
                  {
                    label: "View Applications",
                    icon: FileText,
                    href: "/admin/applications",
                  },
                  {
                    label: "Platform Settings",
                    icon: Settings,
                    href: "/admin/settings",
                  },
                ].map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className="flex items-center justify-between p-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors duration-200 group"
                  >
                    <div className="flex items-center">
                      <action.icon className="h-5 w-5 mr-3" />
                      <span>{action.label}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-lg"></div>
            <div className="relative p-6 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                Quick Stats
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Applications Today", value: 12 },
                  { label: "Jobs Added This Week", value: 8 },
                  { label: "Active Users", value: 243 },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
