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
import Button from "../common/Button";
import Card from "../common/Card"; // Assuming a Card component exists
import useAuth from "../../hooks/useAuth";

const JobDetailsPage = () => {
  const { id } = useParams(); // Get job ID from URL
  const { isDarkMode } = useAuth(); // Get dark mode state
  const [isSaved, setIsSaved] = useState(false); // Local state for saving job
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
      skills: [
        "React",
        "Node.js",
        "JavaScript",
        "TypeScript",
        "MongoDB",
        "AWS",
      ],
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

  // Find job by ID
  const job = jobData.find((job) => job.id === id);

  // Handle case where job is not found
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
    // TODO: Integrate with backend to save job (e.g., using axiosSecure)
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
      <div className="container mx-auto max-w-4xl">
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

        {/* Job Details Card */}
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

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                className={
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : ""
                }
              >
                Share Job
              </Button>
              <Button
                variant="primary"
                className={
                  isDarkMode ? "bg-primary-500 hover:bg-primary-600" : ""
                }
              >
                Apply Now
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default JobDetailsPage;
