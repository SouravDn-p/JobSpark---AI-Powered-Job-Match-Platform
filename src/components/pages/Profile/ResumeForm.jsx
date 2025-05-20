import { motion } from "framer-motion";
import { FaFileUpload, FaTrash, FaFilePdf } from "react-icons/fa";
import Card from "./others/Card";
import Button from "./others/Button";
import useAuth from "../../hooks/useAuth";

const ResumeForm = ({ formData, handleResumeChange, handleResumeRemove }) => {
  const { isDarkMode } = useAuth();

  return (
    <>
      <motion.div
        key="resume"
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
              <FaFileUpload
                className={`mr-2 ${
                  isDarkMode ? "text-purple-400" : "text-blue-500"
                }`}
              />
              Resume
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {formData.resume ? (
                <div
                  className={`border rounded-lg p-4 flex items-center justify-between ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-800/50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <FaFilePdf
                      className={`mr-2 ${
                        isDarkMode ? "text-red-400" : "text-red-500"
                      }`}
                      size={24}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {formData.resume.name || "Uploaded Resume"}
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={handleResumeRemove}
                    variant="danger"
                    size="small"
                    icon={<FaTrash size={12} />}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div
                  className={`text-center py-8 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <FaFileUpload size={36} className="mx-auto mb-3 opacity-50" />
                  <p>No resume uploaded yet.</p>
                  <p className="text-sm mt-1">
                    Upload your resume to share with potential employers.
                  </p>
                </div>
              )}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Upload Resume (PDF)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleResumeChange(e.target.files[0])}
                  className={`w-full px-4 py-2 rounded-lg transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-blue-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default ResumeForm;
