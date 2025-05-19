import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw, AlertTriangle } from "lucide-react";
import JobCard from "../JobCard";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const jobData = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    salary: "$95,000 - $120,000",
    description: "We are looking for a skilled Frontend Developer...",
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable components...",
    ],
    requirements: [
      "Proficiency in React and TypeScript",
      "Strong understanding of UI/UX...",
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
    description: "We are seeking a talented Backend Engineer...",
    responsibilities: [
      "Design and implement server-side architecture",
      "Develop APIs...",
    ],
    requirements: [
      "Experience with Node.js and Express",
      "Knowledge of SQL...",
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
    description: "We are looking for a creative UI/UX Designer...",
    responsibilities: [
      "Create user flows, wireframes...",
      "Conduct user research...",
    ],
    requirements: ["Proficiency in design tools (Figma, Adobe XD)..."],
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
    description: "We are seeking a Full Stack Developer...",
    responsibilities: ["Develop features across the entire stack..."],
    requirements: [
      "Experience with React and Node.js",
      "Knowledge of database systems...",
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
    description: "We are looking for a DevOps Engineer...",
    responsibilities: ["Build and maintain CI/CD pipelines..."],
    requirements: ["Experience with cloud platforms (AWS/Azure/GCP)..."],
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
    description: "We are seeking an experienced Product Manager...",
    responsibilities: ["Define product vision and strategy..."],
    requirements: ["Previous experience in product management..."],
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
    description: "We are looking for a Data Scientist...",
    responsibilities: ["Design and implement machine learning models..."],
    requirements: ["Experience with Python and data science libraries..."],
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
    description: "We are seeking a Mobile Developer...",
    responsibilities: ["Develop cross-platform mobile applications..."],
    requirements: ["Experience with React Native or similar frameworks..."],
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

export default function Recommendations() {
  const { currentUser, isDarkMode } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = () => {
    setIsLoading(true);
    setError(null);

    // Simulate async processing
    setTimeout(() => {
      try {
        let jobs = [...jobData];

        // Mock recommendation logic
        if (currentUser?.skills && currentUser.skills.length > 0) {
          jobs = jobs.map((job) => {
            const matchedSkills = job.skills.filter((skill) =>
              currentUser.skills.includes(skill)
            );
            const matchScore = (matchedSkills.length / job.skills.length) * 100;
            return { ...job, matchScore: Math.round(matchScore) };
          });

          // Sort by matchScore (descending)
          jobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        } else {
          // If no skills, return unsorted jobs with 0 matchScore
          jobs = jobs.map((job) => ({ ...job, matchScore: 0 }));
        }

        setRecommendations(jobs);
      } catch (err) {
        console.error("Error processing recommendations:", err);
        setError(
          "Failed to fetch job recommendations. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    }, 1000); // Simulate 1s delay
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

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
          disabled={isLoading}
          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } animate__animated animate__zoomIn`}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Recommendations
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
        {currentUser?.skills && currentUser.skills.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentUser.skills.map((skill) => (
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
                to="/profile"
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
                to="/profile"
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
        {isLoading ? (
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
        ) : error ? (
          <div
            className={`text-center py-12 rounded-lg border animate__animated animate__fadeIn ${
              isDarkMode
                ? "bg-red-900/30 border-red-800"
                : "bg-red-50 border-red-200"
            }`}
          >
            <p className={isDarkMode ? "text-red-400" : "text-red-600"}>
              {error}
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
                to="/profile"
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
                key={job.id}
                className={`animate__animated animate__fadeInUp animate__delay-${
                  (index % 5) + 1
                }s`}
              >
                <JobCard job={job} isRecommended={true} />
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
