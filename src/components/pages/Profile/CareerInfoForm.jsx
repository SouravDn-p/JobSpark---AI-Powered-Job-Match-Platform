import { motion } from "framer-motion";
import { FaUserTie } from "react-icons/fa";
import Card from "./others/Card";
import Input from "./others/Input";
import useAuth from "../../hooks/useAuth";

const CareerInfoForm = ({ formData, handleCareerInfoChange }) => {
  const { isDarkMode } = useAuth();
  return (
    <>
      <motion.div
        key="career"
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
              <FaUserTie
                className={`mr-2 ${
                  isDarkMode ? "text-purple-400" : "text-blue-500"
                }`}
              />
              Career Information
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Professional Summary
                </label>
                <textarea
                  name="summary"
                  value={formData.careerInfo.summary}
                  onChange={(e) =>
                    handleCareerInfoChange("summary", e.target.value)
                  }
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  placeholder="Summarize your professional background and expertise"
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Career Goals
                </label>
                <textarea
                  name="goals"
                  value={formData.careerInfo.goals}
                  onChange={(e) =>
                    handleCareerInfoChange("goals", e.target.value)
                  }
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  placeholder="Describe your career aspirations and objectives"
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default CareerInfoForm;
