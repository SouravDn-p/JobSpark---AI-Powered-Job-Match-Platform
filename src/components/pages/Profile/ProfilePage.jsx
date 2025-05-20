"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCog,
  FaMoon,
  FaSun,
  FaPlus,
  FaTimes,
  FaCheck,
  FaSave,
  FaTrash,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInfo,
} from "react-icons/fa";
// Mock auth hook
const useAuth = () => {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "https://via.placeholder.com/150",
    profile: {
      headline: "Senior Frontend Developer | React Expert",
      bio: "Passionate developer with 5+ years of experience building modern web applications.",
      location: "San Francisco, CA",
      skills: ["React", "JavaScript", "Tailwind CSS", "Node.js"],
      experience: [
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "Tech Company Inc.",
          location: "San Francisco, CA",
          startDate: "2020-01",
          endDate: "",
          current: true,
          description:
            "Leading frontend development for enterprise applications.",
        },
      ],
      education: [
        {
          id: 1,
          school: "University of California",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startYear: "2012",
          endYear: "2016",
          current: false,
        },
      ],
      jobPreferences: {
        jobTypes: ["Full-time", "Contract"],
        locations: ["San Francisco", "Remote"],
        salary: {
          min: "100000",
          max: "150000",
        },
        remote: true,
      },
    },
  });

  const [loading, setLoading] = useState(false);

  const updateProfile = async (profileData) => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser((prev) => ({
          ...prev,
          profile: {
            ...profileData,
          },
        }));
        setLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  return { user, updateProfile, loading };
};

// Custom Button component
const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  type = "button",
  isLoading = false,
  className = "",
  icon = null,
}) => {
  const { isDarkMode } = useAuth();

  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: `${
      isDarkMode
        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white focus:ring-purple-500"
        : "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white focus:ring-purple-500"
    }`,
    secondary: `${
      isDarkMode
        ? "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500"
        : "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300"
    }`,
    outline: `${
      isDarkMode
        ? "border border-gray-600 hover:border-gray-500 bg-transparent hover:bg-gray-800 text-gray-300 focus:ring-gray-500"
        : "border border-gray-300 hover:border-gray-400 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-300"
    }`,
    danger: `${
      isDarkMode
        ? "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
        : "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400"
    }`,
    default: `${
      isDarkMode
        ? "bg-gray-800 hover:bg-gray-700 text-white focus:ring-gray-500"
        : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-blue-500"
    }`,
  };

  const sizes = {
    small: "px-3 py-1.5 text-xs",
    default: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const loadingClasses = isLoading
    ? "opacity-80 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${loadingClasses} ${className}`}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && <span className={`${children ? "mr-2" : ""}`}>{icon}</span>}
      {children}
    </button>
  );
};

// Custom Input component
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error = "",
  icon = null,
  className = "",
  ...props
}) => {
  const { isDarkMode } = useAuth();

  return (
    <div className={`${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-1 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 ${
            icon ? "pl-10" : ""
          } rounded-lg transition-all duration-200 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
              : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          } ${
            error
              ? isDarkMode
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Custom Card component
const Card = ({ children, className = "" }) => {
  const { isDarkMode } = useAuth();

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Custom Alert component
const Alert = ({ type = "info", message, className = "" }) => {
  const { isDarkMode } = useAuth();

  const types = {
    success: {
      bg: isDarkMode ? "bg-green-900/30" : "bg-green-50",
      border: isDarkMode ? "border-green-700" : "border-green-200",
      text: isDarkMode ? "text-green-400" : "text-green-800",
      icon: (
        <FaCheck className={isDarkMode ? "text-green-400" : "text-green-500"} />
      ),
    },
    error: {
      bg: isDarkMode ? "bg-red-900/30" : "bg-red-50",
      border: isDarkMode ? "border-red-700" : "border-red-200",
      text: isDarkMode ? "text-red-400" : "text-red-800",
      icon: (
        <FaTimes className={isDarkMode ? "text-red-400" : "text-red-500"} />
      ),
    },
    info: {
      bg: isDarkMode ? "bg-blue-900/30" : "bg-blue-50",
      border: isDarkMode ? "border-blue-700" : "border-blue-200",
      text: isDarkMode ? "text-blue-400" : "text-blue-800",
      icon: (
        <FaInfo className={isDarkMode ? "text-blue-400" : "text-blue-500"} />
      ),
    },
  };

  const { bg, border, text, icon } = types[type];

  return (
    <div
      className={`flex items-center p-4 rounded-lg border ${bg} ${border} ${className}`}
    >
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <div className={`text-sm font-medium ${text}`}>{message}</div>
    </div>
  );
};

// Loading Spinner component
const LoadingSpinner = ({ size = "default" }) => {
  const { isDarkMode } = useAuth();

  const sizes = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center">
      <svg
        className={`animate-spin ${sizes[size]} ${
          isDarkMode ? "text-purple-500" : "text-blue-600"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

const ProfilePage = () => {
  const { user, updateProfile, loading, isDarkMode, toggleTheme } = useAuth();
  const [formData, setFormData] = useState({
    headline: "",
    bio: "",
    location: "",
    skills: [],
    experience: [],
    education: [],
    jobPreferences: {
      jobTypes: [],
      locations: [],
      salary: {
        min: "",
        max: "",
      },
      remote: false,
    },
  });
  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [activeSection, setActiveSection] = useState("basic");
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    if (user?.profile) {
      setFormData((prevData) => ({
        ...prevData,
        ...user.profile,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSkillAdd = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleExperienceAdd = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  };

  const handleExperienceChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleExperienceRemove = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const handleEducationAdd = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          school: "",
          degree: "",
          field: "",
          startYear: "",
          endYear: "",
          current: false,
        },
      ],
    }));
  };

  const handleEducationChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const handleEducationRemove = (id) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handlePreferenceChange = (category, value) => {
    setFormData((prev) => ({
      ...prev,
      jobPreferences: {
        ...prev.jobPreferences,
        [category]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.headline?.trim()) {
      newErrors.headline = "Professional headline is required";
    }

    if (!formData.bio?.trim()) {
      newErrors.bio = "Bio is required";
    }

    if (!formData.location?.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.skills?.length) {
      newErrors.skills = "At least one skill is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) return;

    try {
      const success = await updateProfile(formData);
      if (success) {
        setShowSuccessAnimation(true);
        setTimeout(() => {
          setShowSuccessAnimation(false);
          setSuccessMessage("Profile updated successfully");
        }, 1500);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || "Failed to update profile",
      }));
    }
  };

  const sections = [
    { id: "basic", label: "Basic Info", icon: <FaUser /> },
    { id: "experience", label: "Experience", icon: <FaBriefcase /> },
    { id: "education", label: "Education", icon: <FaGraduationCap /> },
    { id: "preferences", label: "Job Preferences", icon: <FaCog /> },
  ];

  if (loading && !user?.profile) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-8 pb-12 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header with Dark Mode Toggle */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Profile Settings
              </h1>
              <p
                className={`mt-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Keep your profile up to date to get the best job matches
              </p>
            </div>
            <Button
              onClick={toggleTheme}
              variant={isDarkMode ? "outline" : "default"}
              className="relative overflow-hidden group"
            >
              <span className="flex items-center">
                {isDarkMode ? (
                  <>
                    <FaSun className="mr-2 text-yellow-400" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <FaMoon className="mr-2 text-blue-600" />
                    Dark Mode
                  </>
                )}
              </span>
              <span
                className={`absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-gradient-to-r ${
                  isDarkMode
                    ? "from-yellow-400 to-orange-500"
                    : "from-blue-600 to-purple-600"
                } group-hover:translate-x-0 opacity-20`}
              ></span>
            </Button>
          </div>

          {/* User Profile Card */}
          <Card className="mb-8 overflow-visible">
            <div
              className={`p-6 relative ${
                isDarkMode
                  ? "bg-gradient-to-r from-gray-800 to-gray-900"
                  : "bg-gradient-to-r from-blue-50 to-purple-50"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <div
                    className={`w-24 h-24 rounded-full overflow-hidden border-4 ${
                      isDarkMode ? "border-purple-600" : "border-blue-500"
                    } shadow-lg`}
                  >
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                  <div
                    className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                      isDarkMode
                        ? "bg-purple-600 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    <FaUser size={14} />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2
                    className={`text-2xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.name}
                  </h2>
                  <p
                    className={`${
                      isDarkMode ? "text-purple-400" : "text-blue-600"
                    } font-medium`}
                  >
                    {formData.headline}
                  </p>
                  <p
                    className={`mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {user.email}
                  </p>
                  <div className="mt-3 flex items-center justify-center md:justify-start gap-3">
                    <Button
                      variant="outline"
                      size="small"
                      icon={<FaLinkedin />}
                    />
                    <Button
                      variant="outline"
                      size="small"
                      icon={<FaGithub />}
                    />
                    <Button
                      variant="outline"
                      size="small"
                      icon={<FaTwitter />}
                    />
                  </div>
                </div>
                <div
                  className={`hidden md:block px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700/50 text-green-400"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        isDarkMode ? "bg-green-400" : "bg-green-500"
                      }`}
                    ></div>
                    <span className="text-sm font-medium">Profile Active</span>
                  </div>
                </div>
              </div>

              {/* Profile Completion Bar */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Profile Completion
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-purple-400" : "text-blue-600"
                    }`}
                  >
                    85%
                  </span>
                </div>
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
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          {successMessage && (
            <Alert type="success" message={successMessage} className="mb-6" />
          )}

          {errors.submit && (
            <Alert type="error" message={errors.submit} className="mb-6" />
          )}

          {/* Success Animation */}
          <AnimatePresence>
            {showSuccessAnimation && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
              >
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center ${
                    isDarkMode ? "bg-purple-600" : "bg-green-500"
                  }`}
                >
                  <FaCheck size={48} className="text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Tabs */}
          <div className="mb-8 overflow-x-auto">
            <nav
              className={`flex space-x-2 p-1 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white shadow"
              }`}
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? isDarkMode
                        ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : isDarkMode
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Info Section */}
            <AnimatePresence mode="wait">
              {activeSection === "basic" && (
                <motion.div
                  key="basic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-8 overflow-visible">
                    <div
                      className={`p-6 border-b ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <h2
                        className={`text-xl font-semibold flex items-center ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <FaUser
                          className={`mr-2 ${
                            isDarkMode ? "text-purple-400" : "text-blue-500"
                          }`}
                        />
                        Basic Information
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        <Input
                          label="Professional Headline"
                          name="headline"
                          value={formData.headline}
                          onChange={handleChange}
                          error={errors.headline}
                          placeholder="e.g., Senior Frontend Developer | React Expert"
                          className="transition-all duration-300"
                        />

                        <div>
                          <label
                            className={`block text-sm font-medium mb-1 ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Bio
                          </label>
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className={`w-full px-4 py-2 rounded-lg transition-all duration-300 ${
                              isDarkMode
                                ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            } ${
                              errors.bio
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : ""
                            }`}
                            placeholder="Tell us about your professional background and career goals"
                          />
                          {errors.bio && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.bio}
                            </p>
                          )}
                        </div>

                        <Input
                          label="Location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          error={errors.location}
                          placeholder="e.g., San Francisco, CA"
                          icon={<FaMapMarkerAlt />}
                        />

                        <div>
                          <label
                            className={`block text-sm font-medium mb-1 ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Skills
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {formData.skills.map((skill, index) => (
                              <motion.span
                                key={index}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className={`px-3 py-1 rounded-full text-sm flex items-center ${
                                  isDarkMode
                                    ? "bg-gray-700 text-purple-300 border border-purple-700"
                                    : "bg-blue-50 text-blue-700 border border-blue-200"
                                }`}
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => handleSkillRemove(skill)}
                                  className={`ml-2 ${
                                    isDarkMode
                                      ? "text-purple-400 hover:text-purple-200"
                                      : "text-blue-600 hover:text-blue-800"
                                  }`}
                                >
                                  <FaTimes size={12} />
                                </button>
                              </motion.span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              placeholder="Add a skill"
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              onClick={handleSkillAdd}
                              variant={isDarkMode ? "outline" : "default"}
                              icon={<FaPlus size={12} />}
                            >
                              Add
                            </Button>
                          </div>
                          {errors.skills && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.skills}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-8 overflow-visible">
                    <div
                      className={`p-6 border-b ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h2
                          className={`text-xl font-semibold flex items-center ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          <FaBriefcase
                            className={`mr-2 ${
                              isDarkMode ? "text-purple-400" : "text-blue-500"
                            }`}
                          />
                          Work Experience
                        </h2>
                        <Button
                          type="button"
                          onClick={handleExperienceAdd}
                          variant={isDarkMode ? "outline" : "default"}
                          size="small"
                          icon={<FaPlus size={12} />}
                        >
                          Add Experience
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {formData.experience.length === 0 ? (
                          <div
                            className={`text-center py-8 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <FaBriefcase
                              size={36}
                              className="mx-auto mb-3 opacity-50"
                            />
                            <p>No work experience added yet.</p>
                            <p className="text-sm mt-1">
                              Click the button above to add your work history.
                            </p>
                          </div>
                        ) : (
                          formData.experience.map((exp, index) => (
                            <motion.div
                              key={exp.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`border rounded-lg p-4 ${
                                isDarkMode
                                  ? "border-gray-700 bg-gray-800/50"
                                  : "border-gray-200 bg-white"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-4">
                                <h3
                                  className={`text-lg font-medium flex items-center ${
                                    isDarkMode ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                      isDarkMode
                                        ? "bg-purple-600 text-white"
                                        : "bg-blue-500 text-white"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>
                                  {exp.title || "New Experience"}
                                </h3>
                                <Button
                                  type="button"
                                  onClick={() => handleExperienceRemove(exp.id)}
                                  variant="danger"
                                  size="small"
                                  icon={<FaTrash size={12} />}
                                >
                                  Remove
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                  label="Job Title"
                                  value={exp.title}
                                  onChange={(e) =>
                                    handleExperienceChange(
                                      exp.id,
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g., Senior Frontend Developer"
                                />

                                <Input
                                  label="Company"
                                  value={exp.company}
                                  onChange={(e) =>
                                    handleExperienceChange(
                                      exp.id,
                                      "company",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g., Tech Company Inc."
                                />

                                <Input
                                  label="Location"
                                  value={exp.location}
                                  onChange={(e) =>
                                    handleExperienceChange(
                                      exp.id,
                                      "location",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g., San Francisco, CA"
                                  icon={<FaMapMarkerAlt />}
                                />

                                <div className="flex gap-4">
                                  <Input
                                    label="Start Date"
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) =>
                                      handleExperienceChange(
                                        exp.id,
                                        "startDate",
                                        e.target.value
                                      )
                                    }
                                  />

                                  <Input
                                    label="End Date"
                                    type="month"
                                    value={exp.endDate}
                                    onChange={(e) =>
                                      handleExperienceChange(
                                        exp.id,
                                        "endDate",
                                        e.target.value
                                      )
                                    }
                                    disabled={exp.current}
                                  />
                                </div>

                                <div className="md:col-span-2">
                                  <label
                                    className={`flex items-center space-x-2 ${
                                      isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={exp.current}
                                      onChange={(e) =>
                                        handleExperienceChange(
                                          exp.id,
                                          "current",
                                          e.target.checked
                                        )
                                      }
                                      className={`rounded ${
                                        isDarkMode
                                          ? "bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                                          : "border-gray-300 text-blue-600 focus:ring-blue-500"
                                      }`}
                                    />
                                    <span className="text-sm">
                                      I currently work here
                                    </span>
                                  </label>
                                </div>

                                <div className="md:col-span-2">
                                  <label
                                    className={`block text-sm font-medium mb-1 ${
                                      isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    Description
                                  </label>
                                  <textarea
                                    value={exp.description}
                                    onChange={(e) =>
                                      handleExperienceChange(
                                        exp.id,
                                        "description",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                    className={`w-full px-4 py-2 rounded-lg transition-all duration-300 ${
                                      isDarkMode
                                        ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                                        : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    }`}
                                    placeholder="Describe your responsibilities and achievements"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Education Section */}
              {activeSection === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-8 overflow-visible">
                    <div
                      className={`p-6 border-b ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h2
                          className={`text-xl font-semibold flex items-center ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          <FaGraduationCap
                            className={`mr-2 ${
                              isDarkMode ? "text-purple-400" : "text-blue-500"
                            }`}
                          />
                          Education
                        </h2>
                        <Button
                          type="button"
                          onClick={handleEducationAdd}
                          variant={isDarkMode ? "outline" : "default"}
                          size="small"
                          icon={<FaPlus size={12} />}
                        >
                          Add Education
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {formData.education.length === 0 ? (
                          <div
                            className={`text-center py-8 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <FaGraduationCap
                              size={36}
                              className="mx-auto mb-3 opacity-50"
                            />
                            <p>No education history added yet.</p>
                            <p className="text-sm mt-1">
                              Click the button above to add your education.
                            </p>
                          </div>
                        ) : (
                          formData.education.map((edu, index) => (
                            <motion.div
                              key={edu.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`border rounded-lg p-4 ${
                                isDarkMode
                                  ? "border-gray-700 bg-gray-800/50"
                                  : "border-gray-200 bg-white"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-4">
                                <h3
                                  className={`text-lg font-medium flex items-center ${
                                    isDarkMode ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                      isDarkMode
                                        ? "bg-purple-600 text-white"
                                        : "bg-blue-500 text-white"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>
                                  {edu.school || "New Education"}
                                </h3>
                                <Button
                                  type="button"
                                  onClick={() => handleEducationRemove(edu.id)}
                                  variant="danger"
                                  size="small"
                                  icon={<FaTrash size={12} />}
                                >
                                  Remove
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                  label="School"
                                  value={edu.school}
                                  onChange={(e) =>
                                    handleEducationChange(
                                      edu.id,
                                      "school",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g., University of California"
                                />

                                <Input
                                  label="Degree"
                                  value={edu.degree}
                                  onChange={(e) =>
                                    handleEducationChange(
                                      edu.id,
                                      "degree",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g., Bachelor of Science"
                                />

                                <Input
                                  label="Field of Study"
                                  value={edu.field}
                                  onChange={(e) =>
                                    handleEducationChange(
                                      edu.id,
                                      "field",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g., Computer Science"
                                />

                                <div className="flex gap-4">
                                  <Input
                                    label="Start Year"
                                    type="number"
                                    value={edu.startYear}
                                    onChange={(e) =>
                                      handleEducationChange(
                                        edu.id,
                                        "startYear",
                                        e.target.value
                                      )
                                    }
                                    min="1900"
                                    max={new Date().getFullYear()}
                                  />

                                  <Input
                                    label="End Year"
                                    type="number"
                                    value={edu.endYear}
                                    onChange={(e) =>
                                      handleEducationChange(
                                        edu.id,
                                        "endYear",
                                        e.target.value
                                      )
                                    }
                                    min="1900"
                                    max={new Date().getFullYear() + 10}
                                    disabled={edu.current}
                                  />
                                </div>

                                <div className="md:col-span-2">
                                  <label
                                    className={`flex items-center space-x-2 ${
                                      isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={edu.current}
                                      onChange={(e) =>
                                        handleEducationChange(
                                          edu.id,
                                          "current",
                                          e.target.checked
                                        )
                                      }
                                      className={`rounded ${
                                        isDarkMode
                                          ? "bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                                          : "border-gray-300 text-blue-600 focus:ring-blue-500"
                                      }`}
                                    />
                                    <span className="text-sm">
                                      I'm currently studying here
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Job Preferences Section */}
              {activeSection === "preferences" && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-8 overflow-visible">
                    <div
                      className={`p-6 border-b ${
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <h2
                        className={`text-xl font-semibold flex items-center ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <FaCog
                          className={`mr-2 ${
                            isDarkMode ? "text-purple-400" : "text-blue-500"
                          }`}
                        />
                        Job Preferences
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        <div>
                          <label
                            className={`block text-sm font-medium mb-3 ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Job Types
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {[
                              "Full-time",
                              "Part-time",
                              "Contract",
                              "Freelance",
                              "Internship",
                            ].map((type) => (
                              <label
                                key={type}
                                className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                  formData.jobPreferences.jobTypes.includes(
                                    type
                                  )
                                    ? isDarkMode
                                      ? "bg-purple-900/50 border border-purple-700 text-purple-300"
                                      : "bg-blue-50 border border-blue-200 text-blue-700"
                                    : isDarkMode
                                    ? "bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700"
                                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.jobPreferences.jobTypes.includes(
                                    type
                                  )}
                                  onChange={(e) => {
                                    const updatedTypes = e.target.checked
                                      ? [
                                          ...formData.jobPreferences.jobTypes,
                                          type,
                                        ]
                                      : formData.jobPreferences.jobTypes.filter(
                                          (t) => t !== type
                                        );
                                    handlePreferenceChange(
                                      "jobTypes",
                                      updatedTypes
                                    );
                                  }}
                                  className="sr-only"
                                />
                                <span className="text-sm">{type}</span>
                                {formData.jobPreferences.jobTypes.includes(
                                  type
                                ) && (
                                  <FaCheck
                                    className={`ml-2 ${
                                      isDarkMode
                                        ? "text-purple-400"
                                        : "text-blue-500"
                                    }`}
                                    size={12}
                                  />
                                )}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label
                            className={`block text-sm font-medium mb-1 ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Preferred Locations
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {formData.jobPreferences.locations.map(
                              (location, index) => (
                                <motion.span
                                  key={index}
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className={`px-3 py-1 rounded-full text-sm flex items-center ${
                                    isDarkMode
                                      ? "bg-gray-700 text-gray-300 border border-gray-600"
                                      : "bg-gray-100 text-gray-700 border border-gray-200"
                                  }`}
                                >
                                  <FaMapMarkerAlt
                                    className={`mr-1 ${
                                      isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }`}
                                    size={10}
                                  />
                                  {location}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedLocations =
                                        formData.jobPreferences.locations.filter(
                                          (_, i) => i !== index
                                        );
                                      handlePreferenceChange(
                                        "locations",
                                        updatedLocations
                                      );
                                    }}
                                    className={`ml-2 ${
                                      isDarkMode
                                        ? "text-gray-400 hover:text-gray-200"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                                  >
                                    <FaTimes size={12} />
                                  </button>
                                </motion.span>
                              )
                            )}
                          </div>
                          <Input
                            placeholder="Add a preferred location"
                            icon={<FaMapMarkerAlt />}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const value = e.target.value.trim();
                                if (
                                  value &&
                                  !formData.jobPreferences.locations.includes(
                                    value
                                  )
                                ) {
                                  handlePreferenceChange("locations", [
                                    ...formData.jobPreferences.locations,
                                    value,
                                  ]);
                                  e.target.value = "";
                                }
                              }
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Minimum Salary (Annual)"
                            type="number"
                            value={formData.jobPreferences.salary.min}
                            onChange={(e) =>
                              handlePreferenceChange("salary", {
                                ...formData.jobPreferences.salary,
                                min: e.target.value,
                              })
                            }
                            placeholder="e.g., 50000"
                          />

                          <Input
                            label="Maximum Salary (Annual)"
                            type="number"
                            value={formData.jobPreferences.salary.max}
                            onChange={(e) =>
                              handlePreferenceChange("salary", {
                                ...formData.jobPreferences.salary,
                                max: e.target.value,
                              })
                            }
                            placeholder="e.g., 100000"
                          />
                        </div>

                        <div>
                          <label
                            className={`flex items-center space-x-2 ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            <div
                              className={`relative w-10 h-5 transition-all duration-200 ease-in-out rounded-full ${
                                formData.jobPreferences.remote
                                  ? isDarkMode
                                    ? "bg-purple-600"
                                    : "bg-blue-600"
                                  : isDarkMode
                                  ? "bg-gray-700"
                                  : "bg-gray-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={formData.jobPreferences.remote}
                                onChange={(e) =>
                                  handlePreferenceChange(
                                    "remote",
                                    e.target.checked
                                  )
                                }
                                className="sr-only"
                              />
                              <span
                                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-all duration-200 ease-in-out transform ${
                                  formData.jobPreferences.remote
                                    ? "translate-x-5"
                                    : ""
                                }`}
                              ></span>
                            </div>
                            <span className="text-sm font-medium">
                              Open to remote work
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Save Button */}
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                type="submit"
                variant="primary"
                size="large"
                isLoading={loading}
                icon={<FaSave />}
                className="px-8"
              >
                Save Changes
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
