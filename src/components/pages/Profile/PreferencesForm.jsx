import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaMapMarkerAlt, FaCog } from "react-icons/fa";
import Card from "./others/Card";
import Input from "./others/Input";
import useAuth from "../../hooks/useAuth";

const PreferencesForm = ({
  activeSection,
  formData,
  handlePreferenceChange,
}) => {
  const { isDarkMode } = useAuth();

  return (
    <>
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
                      isDarkMode ? "text-gray-300" : "text-gray-800"
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
                          formData.jobPreferences.jobTypes.includes(type)
                            ? isDarkMode
                              ? "bg-purple-900/50 border border-purple-700 text-purple-300"
                              : "bg-blue-50 border border-blue-200 text-blue-700"
                            : isDarkMode
                            ? "bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700"
                            : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.jobPreferences.jobTypes.includes(
                            type
                          )}
                          onChange={(e) => {
                            const updatedTypes = e.target.checked
                              ? [...formData.jobPreferences.jobTypes, type]
                              : formData.jobPreferences.jobTypes.filter(
                                  (t) => t !== type
                                );
                            handlePreferenceChange("jobTypes", updatedTypes);
                          }}
                          className="sr-only"
                        />
                        <span className="text-sm">{type}</span>
                        {formData.jobPreferences.jobTypes.includes(type) && (
                          <FaCheck
                            className={`ml-2 ${
                              isDarkMode ? "text-purple-400" : "text-blue-500"
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
                      isDarkMode ? "text-gray-300" : "text-gray-800"
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
                              isDarkMode ? "text-gray-400" : "text-gray-600"
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
                                : "text-gray-600 hover:text-gray-800"
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
                          !formData.jobPreferences.locations.includes(value)
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
                      isDarkMode ? "text-gray-300" : "text-gray-800"
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
                          handlePreferenceChange("remote", e.target.checked)
                        }
                        className="sr-only"
                      />
                      <span
                        className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-all duration-200 ease-in-out transform ${
                          formData.jobPreferences.remote ? "translate-x-5" : ""
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
    </>
  );
};

export default PreferencesForm;
