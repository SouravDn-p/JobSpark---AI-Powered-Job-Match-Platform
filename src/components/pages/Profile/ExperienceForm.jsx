import { motion } from "framer-motion";
import { FaBriefcase, FaPlus, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import Card from "./others/Card";
import Button from "./others/Button";
import Input from "./others/Input";
import useAuth from "../../hooks/useAuth";

const ExperienceForm = ({
  activeSection,
  formData,
  handleExperienceAdd,
  handleExperienceRemove,
  handleExperienceChange,
}) => {
  const { isDarkMode } = useAuth();

  return (
    <>
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
                      isDarkMode ? "text-gray-400" : "text-gray-600"
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
                              isDarkMode ? "text-gray-300" : "text-gray-800"
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
                              isDarkMode ? "text-gray-300" : "text-gray-800"
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
    </>
  );
};

export default ExperienceForm;
