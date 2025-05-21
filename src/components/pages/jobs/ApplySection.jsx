import React, { useState } from "react";
import PropTypes from "prop-types";
import { Share2, Mail, Briefcase } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ApplySection = ({ job, isDarkMode, isApplied }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [motivation, setMotivation] = useState("");
  const axiosSecure = useAxiosSecure();
  const [applications] = useState([
    {
      id: "1",
      jobTitle: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      status: "interview",
      appliedDate: "2025-03-15",
      nextStep: "Technical Interview",
      nextStepDate: "2025-03-25",
    },
    {
      id: "2",
      jobTitle: "UX Designer",
      company: "Creative Solutions Co.",
      status: "applied",
      appliedDate: "2025-03-10",
      nextStep: "Application Review",
      nextStepDate: null,
    },
    {
      id: "3",
      jobTitle: "Product Manager",
      company: "NextGen Products",
      status: "offer",
      appliedDate: "2025-02-28",
      nextStep: "Offer Negotiation",
      nextStepDate: "2025-03-20",
    },
    {
      id: "4",
      jobTitle: "Backend Engineer",
      company: "Data Systems Ltd.",
      status: "rejected",
      appliedDate: "2025-03-05",
      nextStep: null,
      nextStepDate: null,
    },
  ]);
  const { dbUser } = useAuth();
  const handleApply = async () => {
    if (!isApplying) {
      setIsApplying(true);
      return;
    }

    if (motivation.trim().length < 50) {
      alert(
        "Please provide a detailed response about why you want to join our team (minimum 50 characters)."
      );
      return;
    }

    const applicationData = {
      jobId: job._id,
      job: job.title,
      company: job.company,
      companyLocation: job.location,
      salary: job.salary,
      jobType: job.type,
      remote: job.remote,
      skillsRequired: job.skills,
      motivation,
      status: "In Progress",
      appliedDate: new Date().toISOString(),
      nextStep: "Technical Interview",
      nextStepDate: "2025-03-25",
      applicationId: Date.now().toString(),
      feedback: null,
      timeline: [
        {
          stage: "Applied",
          date: new Date().toISOString(),
          note: "Application submitted by user.",
        },
      ],
    };

    try {
      const response = await axiosSecure.patch(
        `/user/${dbUser.email}/apply`,
        applicationData
      );

      if (response.data.success) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        alert("Application submitted successfully!");
        setMotivation("");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleShare = () => {
    // console.log(`Sharing job: ${job.title}`);
  };

  // const isApplied = applications.some(
  //   (app) => app.jobTitle === job.title && app.company === job.company
  // );

  return (
    <div className="sticky top-6">
      <div
        className={`rounded-xl shadow-sm border overflow-hidden ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Apply Section Header */}
        <div
          className={`px-6 py-5 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Apply Now
          </h2>
        </div>

        {/* Apply Section Content */}
        <div className="px-6 py-6">
          <div className="space-y-5">
            {/* Job Summary */}
            <div className="flex items-start space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isDarkMode
                    ? "bg-indigo-900/30 text-indigo-400"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                <Briefcase size={24} />
              </div>
              <div>
                <h3
                  className={`font-medium ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {job.title}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {job.company} • {job.location}
                </p>
              </div>
            </div>

            {/* Quick Info */}
            <div
              className={`rounded-lg p-4 ${
                isDarkMode ? "bg-gray-700/30" : "bg-gray-50"
              }`}
            >
              <dl className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between">
                  <dt
                    className={`font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Experience
                  </dt>
                  <dd
                    className={`${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    2+ years
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt
                    className={`font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Closing On
                  </dt>
                  <dd
                    className={`${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Aug 31, 2025
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt
                    className={`font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Applications
                  </dt>
                  <dd
                    className={`${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    78 applied
                  </dd>
                </div>
              </dl>
            </div>

            {/* Application Form */}
            {isApplying && !isApplied && (
              <div className="space-y-4">
                <label className="block">
                  <span
                    className={`font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Why would you like to join our team?
                  </span>
                  <textarea
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    className={`mt-2 block w-full rounded-lg border px-3 py-2 sm:text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-indigo-400 focus:ring-indigo-400"
                        : "bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                    } placeholder-gray-500`}
                    rows={4}
                    placeholder="Share your motivation and why you'd be a great fit..."
                  />
                </label>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {motivation.length}/500 characters (minimum 50)
                </p>
              </div>
            )}

            {/* Apply Button */}
            {!isApplied && (
              <button
                onClick={handleApply}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-[0.98] ${
                  isDarkMode
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                <Mail size={18} />
                <span>{isApplying ? "Submit Application" : "Apply Now"}</span>
              </button>
            )}

            {isApplied && (
              <div
                className={`text-center py-2 px-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  You have already applied for this position
                </p>
              </div>
            )}

            {/* Share Button */}
            <button
              onClick={handleShare}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              <Share2 size={18} />
              <span>Share This Job</span>
            </button>

            {/* Apply Notice */}
            <p
              className={`text-xs text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              By applying, you agree to our terms and conditions. Your
              application will be processed according to our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ApplySection.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    requirements: PropTypes.arrayOf(PropTypes.string).isRequired,
    posted: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    remote: PropTypes.bool.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default ApplySection;
