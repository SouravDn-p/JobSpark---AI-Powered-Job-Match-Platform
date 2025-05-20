"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  FaChartLine,
  FaProjectDiagram,
  FaFilePdf,
} from "react-icons/fa";
import { AuthContexts } from "../../providers/AuthProviders";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { Pointer } from "lucide-react";
import Card from "./others/Card";
import Button from "./others/Button";
import Input from "./others/Input";
import Alert from "./others/Alert";
import ProfileForm from "./ProfileForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import PreferencesForm from "./PreferencesForm";
import CareerInfoForm from "./CareerInfoForm";
import ResumeForm from "./ResumeForm";

const ProfilePage = () => {
  const { dbUser, setDbUser, loader, isDarkMode, toggleTheme } = useAuth();
  const axiosSecure = useAxiosSecure();
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
    careerInfo: [],
    projects: [],
  });
  const [newSkill, setNewSkill] = useState("");
  // const [formData, setFormData] = useState(dbUser);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [activeSection, setActiveSection] = useState("basic");
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    // setFormData(dbUser);
    console.log(dbUser?.profile);
    if (dbUser?.profile) {
      setFormData((prevData) => ({
        ...prevData,
        ...dbUser?.profile,
      }));
    }
  }, [dbUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      console.log("formData", formData);
      const response = await axiosSecure.patch(`/user/${dbUser?.email}`, {
        profile: formData,
      });
      if (response.data.success) {
        setDbUser(response.data.user);
        console.log("result", response);
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
        submit: error.response?.data?.message || "Failed to update profile",
      }));
    }
  };

  const sections = [
    { id: "basic", label: "Basic Info", icon: <FaUser /> },
    { id: "experience", label: "Experience", icon: <FaBriefcase /> },
    { id: "education", label: "Education", icon: <FaGraduationCap /> },
    { id: "preferences", label: "Job Preferences", icon: <FaCog /> },
    // { id: "resume", label: "Resume", icon: <FaFilePdf /> },
    // { id: "project", label: "Projects", icon: <FaProjectDiagram /> },
    { id: "careerInfo", label: "Career Info", icon: <FaChartLine /> },
  ];

  if (loader && !dbUser?.profile) {
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
                      src={dbUser?.dbPhoto || "/placeholder.svg"}
                      alt={dbUser?.displayName}
                      className="w-full h-full object-cover"
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
                    {dbUser?.displayName}
                  </h2>
                  <p
                    className={`${
                      isDarkMode ? "text-purple-400" : "text-blue-600"
                    } font-medium`}
                  >
                    {dbUser?.profile?.headline}
                  </p>
                  <p
                    className={`mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {dbUser?.email}
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
                      isDarkMode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    Profile Completion
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-purple-400" : "text-blue-600"
                    }`}
                  >
                    {dbUser?.progress} %
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
                    style={{ width: `${dbUser?.progress || 0}%` }}
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
                <ProfileForm
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  handleSkillAdd={handleSkillAdd}
                  handleSkillRemove={handleSkillRemove}
                  newSkill={newSkill}
                  setNewSkill={setNewSkill}
                />
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <ExperienceForm
                  activeSection={activeSection}
                  formData={formData}
                  handleExperienceAdd={handleExperienceAdd}
                  handleExperienceRemove={handleExperienceRemove}
                  handleExperienceChange={handleExperienceChange}
                />
              )}

              {/* Education Section */}
              {activeSection === "education" && (
                <EducationForm
                  activeSection={activeSection}
                  formData={formData}
                  handleEducationAdd={handleEducationAdd}
                  handleEducationRemove={handleEducationRemove}
                  handleEducationChange={handleEducationChange}
                />
              )}

              {/* Job Preferences Section */}
              {activeSection === "preferences" && (
                <PreferencesForm
                  activeSection={activeSection}
                  formData={formData}
                  handlePreferenceChange={handlePreferenceChange}
                />
              )}
              {activeSection === "careerInfo" && (
                <CareerInfoForm
                  activeSection={activeSection}
                  formData={formData}
                  handlePreferenceChange={handlePreferenceChange}
                />
              )}
              {activeSection === "resume" && (
                <ResumeForm
                  activeSection={activeSection}
                  formData={formData}
                  handlePreferenceChange={handlePreferenceChange}
                />
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
                isLoading={loader}
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
