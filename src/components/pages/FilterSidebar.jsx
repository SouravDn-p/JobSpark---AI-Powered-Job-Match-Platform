import { useState } from "react";
import { MapPin, Briefcase, Globe, Tag, X } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function FilterSidebar({ onApplyFilters, loading }) {
  const { isDarkMode } = useAuth();
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [remote, setRemote] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Unique skills from job data (hardcoded for simplicity)
  const availableSkills = [
    "React",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "AWS",
    "Figma",
    "Python",
    "Machine Learning",
    "React Native",
    "Docker",
    "Kubernetes",
  ];

  const handleApply = () => {
    const filters = {
      location: location.trim(),
      type: jobType || "",
      remote: remote !== null ? remote : undefined,
      skills: selectedSkills,
    };
    onApplyFilters(filters);
  };

  const handleClear = () => {
    setLocation("");
    setJobType("");
    setRemote(null);
    setSelectedSkills([]);
    onApplyFilters({});
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
      } transition-colors duration-300 animate__animated animate__fadeInLeft`}
    >
      <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
        Filter Jobs
      </h2>

      {/* Location */}
      <div className="mb-4">
        <label
          className={`flex items-center text-sm font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } mb-2`}
        >
          <MapPin className="h-4 w-4 mr-1" />
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., San Francisco"
          className={`w-full px-3 py-2 rounded-lg border ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-gray-200"
              : "bg-white border-gray-300 text-gray-900"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
        />
      </div>

      {/* Job Type */}
      <div className="mb-4">
        <label
          className={`flex items-center text-sm font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } mb-2`}
        >
          <Briefcase className="h-4 w-4 mr-1" />
          Job Type
        </label>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className={`w-full px-3 py-2 rounded-lg border ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-gray-200"
              : "bg-white border-gray-300 text-gray-900"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
        </select>
      </div>

      {/* Remote */}
      <div className="mb-4">
        <label
          className={`flex items-center text-sm font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } mb-2`}
        >
          <Globe className="h-4 w-4 mr-1" />
          Remote
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={remote === true}
              onChange={() => setRemote(remote === true ? null : true)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span
              className={`ml-2 text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Remote Only
            </span>
          </label>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label
          className={`flex items-center text-sm font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } mb-2`}
        >
          <Tag className="h-4 w-4 mr-1" />
          Skills
        </label>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedSkills.includes(skill)
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } transition-colors duration-200`}
            >
              {skill}
              {selectedSkills.includes(skill) && (
                <X className="h-3 w-3 ml-1 inline" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleApply}
          disabled={loading}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Applying..." : "Apply Filters"}
        </button>
        <button
          onClick={handleClear}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium border ${
            isDarkMode
              ? "border-gray-600 text-gray-200 hover:bg-gray-700"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
