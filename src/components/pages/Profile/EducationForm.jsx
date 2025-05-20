import { motion } from "framer-motion";
import { FaGraduationCap, FaPlus, FaTrash } from "react-icons/fa";
import Card from "./others/Card";
import Button from "./others/Button";
import Input from "./others/Input";
import useAuth from "../../hooks/useAuth";

const EducationForm = ({
  activeSection,
  formData,
  handleEducationAdd,
  handleEducationRemove,
  handleEducationChange,
}) => {
  const { isDarkMode } = useAuth();

  return (
    <>
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
                      isDarkMode ? "text-gray-400" : "text-gray-600"
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
                              isDarkMode ? "text-gray-300" : "text-gray-800"
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
    </>
  );
};

export default EducationForm;
