import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import JobCard from "./JobCard";
import FilterSidebar from "./FilterSidebar";
import useAuth from "../hooks/useAuth";

const jobData = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    salary: "$95,000 - $120,000",
    description:
      "We are looking for a skilled Frontend Developer to join our dynamic team. The ideal candidate will have strong experience with React, TypeScript, and modern web development practices.",
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable components and libraries",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with designers and backend developers",
    ],
    requirements: [
      "Proficiency in React and TypeScript",
      "Strong understanding of UI/UX principles",
      "Experience with responsive design",
      "Knowledge of modern frontend build pipelines and tools",
    ],
    posted: "2023-05-15",
    type: "Full-time",
    remote: true,
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "Data Systems LLC",
    location: "Seattle, WA",
    salary: "$110,000 - $140,000",
    description:
      "We are seeking a talented Backend Engineer to develop and maintain our server infrastructure and APIs. The ideal candidate will have experience with Node.js, databases, and API design.",
    responsibilities: [
      "Design and implement server-side architecture",
      "Develop APIs and services",
      "Optimize database performance",
      "Ensure data security and compliance",
    ],
    requirements: [
      "Experience with Node.js and Express",
      "Knowledge of SQL and NoSQL databases",
      "Understanding of REST API best practices",
      "Familiarity with cloud infrastructure (AWS/Azure/GCP)",
    ],
    posted: "2023-05-10",
    type: "Full-time",
    remote: true,
    skills: ["Node.js", "Express", "MongoDB", "SQL", "AWS", "API Design"],
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Creative Solutions",
    location: "New York, NY",
    salary: "$85,000 - $110,000",
    description:
      "We are looking for a creative UI/UX Designer to create amazing user experiences. The ideal candidate should have a portfolio demonstrating their design skills.",
    responsibilities: [
      "Create user flows, wireframes, and prototypes",
      "Conduct user research and testing",
      "Collaborate with developers to implement designs",
      "Maintain design system consistency",
    ],
    requirements: [
      "Proficiency in design tools (Figma, Adobe XD)",
      "Understanding of user-centered design principles",
      "Ability to translate business requirements into designs",
      "Portfolio demonstrating UI/UX work",
    ],
    posted: "2023-05-12",
    type: "Full-time",
    remote: false,
    skills: [
      "Figma",
      "UI Design",
      "UX Design",
      "Wireframing",
      "Prototyping",
      "User Research",
    ],
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "Nexus Technologies",
    location: "Austin, TX",
    salary: "$100,000 - $130,000",
    description:
      "We are seeking a Full Stack Developer to work on our flagship product. The ideal candidate will be comfortable working on both frontend and backend technologies.",
    responsibilities: [
      "Develop features across the entire stack",
      "Optimize application performance",
      "Implement security and data protection measures",
      "Work with cross-functional teams to define requirements",
    ],
    requirements: [
      "Experience with React and Node.js",
      "Knowledge of database systems",
      "Understanding of web security principles",
      "Experience with version control and CI/CD workflows",
    ],
    posted: "2023-05-08",
    type: "Full-time",
    remote: true,
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB", "AWS"],
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Cloud Systems Inc.",
    location: "Remote",
    salary: "$120,000 - $150,000",
    description:
      "We are looking for a DevOps Engineer to help automate and maintain our infrastructure. The ideal candidate will have experience with cloud platforms and CI/CD pipelines.",
    responsibilities: [
      "Build and maintain CI/CD pipelines",
      "Automate infrastructure provisioning",
      "Monitor system performance and reliability",
      "Implement security best practices",
    ],
    requirements: [
      "Experience with cloud platforms (AWS/Azure/GCP)",
      "Knowledge of containerization (Docker, Kubernetes)",
      "Familiarity with infrastructure as code tools",
      "Understanding of networking and security principles",
    ],
    posted: "2023-05-05",
    type: "Full-time",
    remote: true,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
  },
  {
    id: "6",
    title: "Product Manager",
    company: "Innovate Solutions",
    location: "Chicago, IL",
    salary: "$110,000 - $140,000",
    description:
      "We are seeking an experienced Product Manager to oversee the development of our digital products. The ideal candidate will have a blend of technical and business skills.",
    responsibilities: [
      "Define product vision and strategy",
      "Prioritize features and create roadmaps",
      "Conduct market research and competitive analysis",
      "Work closely with engineering and design teams",
    ],
    requirements: [
      "Previous experience in product management",
      "Understanding of software development lifecycle",
      "Ability to communicate with technical and non-technical stakeholders",
      "Data-driven decision making skills",
    ],
    posted: "2023-05-03",
    type: "Full-time",
    remote: false,
    skills: [
      "Product Management",
      "Agile",
      "Roadmapping",
      "Market Research",
      "User Stories",
    ],
  },
  {
    id: "7",
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Boston, MA",
    salary: "$100,000 - $130,000",
    description:
      "We are looking for a Data Scientist to help extract insights from our data. The ideal candidate will have strong analytical skills and experience with machine learning.",
    responsibilities: [
      "Design and implement machine learning models",
      "Analyze large datasets to extract insights",
      "Develop data visualization tools",
      "Collaborate with engineering and product teams",
    ],
    requirements: [
      "Experience with Python and data science libraries",
      "Knowledge of machine learning techniques",
      "Statistical analysis skills",
      "Data visualization expertise",
    ],
    posted: "2023-05-01",
    type: "Full-time",
    remote: true,
    skills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "Data Analysis",
      "Statistics",
    ],
  },
  {
    id: "8",
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Los Angeles, CA",
    salary: "$90,000 - $120,000",
    description:
      "We are seeking a Mobile Developer to create innovative applications for iOS and Android platforms. The ideal candidate will have experience with React Native.",
    responsibilities: [
      "Develop cross-platform mobile applications",
      "Ensure responsiveness and performance",
      "Collaborate with backend developers for API integration",
      "Implement automated testing strategies",
    ],
    requirements: [
      "Experience with React Native or similar frameworks",
      "Understanding of mobile UI/UX principles",
      "Knowledge of mobile app performance techniques",
      "Familiarity with app deployment processes",
    ],
    posted: "2023-04-28",
    type: "Full-time",
    remote: false,
    skills: [
      "React Native",
      "JavaScript",
      "iOS",
      "Android",
      "Mobile Development",
    ],
  },
];

export default function JobListings() {
  const { isDarkMode } = useAuth();
  const [filteredJobs, setFilteredJobs] = useState(jobData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
      setFilteredJobs(jobData);
      return;
    }

    simulateAsync(() => {
      const query = searchQuery.toLowerCase();
      const results = jobData.filter(
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
      let results = [...jobData];

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
    setFilteredJobs(jobData);
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
            disabled={isProcessing}
            className={`ml-3 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? "Searching..." : "Search"}
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
              loading={isProcessing}
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
                loading={isProcessing}
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
              onClick={() => setFilteredJobs(jobData)}
            >
              Reset Filters
            </button>
          </div>

          {/* Job Listings or States */}
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-12 animate__animated animate__pulse animate__infinite">
              <div
                className={`w-12 h-12 rounded-full bg-blue-400 animate-pulse mb-4`}
              ></div>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Loading jobs...
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
                onClick={() => setFilteredJobs(jobData)}
              >
                View all jobs
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
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
