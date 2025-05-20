import { motion } from "framer-motion";
import { FaUser, FaMapMarkerAlt, FaTimes, FaPlus } from "react-icons/fa";
import Card from "./others/Card";
import Input from "./others/Input";
import Button from "./others/Button";
import useAuth from "../../hooks/useAuth";

const ProfileForm = ({
  formData,
  errors,
  handleChange,
  handleSkillAdd,
  handleSkillRemove,
  newSkill,
  setNewSkill,
}) => {
  const { isDarkMode, dbUser } = useAuth();

  return (
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
              value={formData?.headline}
              onChange={handleChange}
              error={errors.headline}
              placeholder="e.g., Senior Frontend Developer | React Expert"
              className="transition-all duration-300"
            />

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Bio
              </label>
              <textarea
                name="bio"
                value={formData?.bio}
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
                <p className="mt-1 text-sm text-red-500">{errors.bio}</p>
              )}
            </div>

            <Input
              label="Location"
              name="location"
              value={formData?.location}
              onChange={handleChange}
              error={errors?.location}
              placeholder="e.g., San Francisco, CA"
              icon={<FaMapMarkerAlt />}
            />

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData?.skills.map((skill, index) => (
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
                <p className="mt-1 text-sm text-red-500">{errors.skills}</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileForm;
