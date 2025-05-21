import { useState, useEffect } from "react";
import { Search, Sparkles } from "lucide-react";
import JobCard from "./JobCard";
import FilterSidebar from "./FilterSidebar";
import useAuth from "../hooks/useAuth";
import useJobs from "../hooks/useJobs";

export default function JobListings() {
  const { jobs, loading: jobsLoading } = useJobs();
  const { isDarkMode } = useAuth();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize filteredJobs with jobs data when jobs are loaded
  useEffect(() => {
    if (!jobsLoading && jobs) {
      setFilteredJobs(jobs);
    }
  }, [jobs, jobsLoading]);

  // Simulate async processing for search/filter
  const simulateAsync = (fn) => {
    setIsProcessing(true);
    setTimeout(() => {
      fn();
      setIsProcessing(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredJobs(jobs);
      return;
    }

    simulateAsync(() => {
      const query = searchQuery.toLowerCase();
      const results = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query))
      );
      setFilteredJobs(results);
    });
  };

  const handleApplyFilters = (filters) => {
    simulateAsync(() => {
      let results = [...jobs];

      if (filters.location) {
        results = results.filter((job) =>
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.type) {
        results = results.filter((job) => job.type === filters.type);
      }

      if (filters.remote !== undefined) {
        results = results.filter((job) => job.remote === filters.remote);
      }

      if (filters.skills && filters.skills.length > 0) {
        results = results.filter((job) =>
          filters.skills.every((skill) =>
            job.skills.some((jobSkill) =>
              jobSkill.toLowerCase().includes(skill.toLowerCase())
            )
          )
        );
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        results = results.filter(
          (job) =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query) ||
            job.skills.some((skill) => skill.toLowerCase().includes(query))
        );
      }

      setFilteredJobs(results);
    });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredJobs(jobs);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div
      className={`w-screen px-4 sm:px-6 lg:px-8 py-8 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-700"
      } transition-colors duration-300`}
    >
      {/* Header */}
      <div className="mb-8 animate__animated animate__fadeIn">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <p
          className={`mt-2 text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Find your next career move with JobSpark’s curated jobs
        </p>
        <a
          href="/recommendations"
          className="inline-flex items-center mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Sparkles className="h-4 w-4 mr-1" />
          Get AI-Powered Recommendations
        </a>
      </div>

      {/* Search Bar */}
      <div className="mb-6 animate__animated animate__fadeIn animate__delay-1s">
        <form onSubmit={handleSearch} className="flex w-full max-w-3xl mx-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search
                className={`h-5 w-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <input
              type="text"
              className={`block w-full pl-10 pr-3 py-2 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              placeholder="Search jobs, skills, or companies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isProcessing || jobsLoading}
            className={`ml-3 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              isProcessing || jobsLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing
              ? "Searching..."
              : jobsLoading
              ? "Loading..."
              : "Search"}
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="ml-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Main Content */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-6">
        {/* Filter Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20 animate__animated animate__fadeInLeft">
            <FilterSidebar
              onApplyFilters={handleApplyFilters}
              loading={isProcessing || jobsLoading}
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          {/* Mobile Filter Toggle */}
          <div className="mb-4 lg:hidden">
            <button
              type="button"
              className={`w-full flex justify-center items-center px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-gray-200"
                  : "bg-white border-gray-300 text-gray-700"
              } hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              onClick={toggleMobileFilter}
            >
              {isMobileFilterOpen ? "Close Filters" : "Filters"}
            </button>
            <div
              className={`mt-3 transition-all duration-300 ${
                isMobileFilterOpen
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <FilterSidebar
                onApplyFilters={handleApplyFilters}
                loading={isProcessing || jobsLoading}
              />
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-4 flex items-center justify-between">
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Showing <span className="font-medium">{filteredJobs.length}</span>{" "}
              jobs
            </p>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              onClick={() => setFilteredJobs(jobs)}
            >
              Reset Filters
            </button>
          </div>

          {/* Job Listings or States */}
          {jobsLoading ? (
            <div className="flex flex-col items-center justify-center py-12 animate__animated animate__pulse animate__infinite">
              <div
                className={`w-12 h-12 rounded-full bg-blue-400 animate-pulse mb-4`}
              ></div>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Loading jobs...
              </p>
            </div>
          ) : isProcessing ? (
            <div className="flex flex-col items-center justify-center py-12 animate__animated animate__pulse animate__infinite">
              <div
                className={`w-12 h-12 rounded-full bg-blue-400 animate-pulse mb-4`}
              ></div>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Processing filters...
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div
              className={`text-center py-12 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              } animate__animated animate__fadeIn`}
            >
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                No jobs found.
              </p>
              <button
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                onClick={() => setFilteredJobs(jobs)}
              >
                View all jobs
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <div
                  key={job._id}
                  className={`animate__animated animate__fadeInUp animate__delay-${
                    (index % 5) + 1
                  }s`}
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
