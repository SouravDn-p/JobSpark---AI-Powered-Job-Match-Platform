"use client";

import { useState } from "react";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  FileText,
  Calendar,
  Clock,
  Globe,
  Plus,
  X,
  Save,
  CheckCircle2,
} from "lucide-react";

// Helper function to conditionally join class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export default function AddJobPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    posted: new Date().toISOString().split("T")[0],
    type: "Full-time",
    remote: false,
    skills: [""],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle array field changes
  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  // Add new item to array field
  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  // Remove item from array field
  const removeArrayItem = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newArray.length ? newArray : [""],
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out empty array items
    const cleanedData = {
      ...formData,
      responsibilities: formData.responsibilities.filter((item) => item.trim()),
      requirements: formData.requirements.filter((item) => item.trim()),
      skills: formData.skills.filter((item) => item.trim()),
    };

    console.log("Job data submitted:", cleanedData);

    // Show success message
    setFormSubmitted(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        responsibilities: [""],
        requirements: [""],
        posted: new Date().toISOString().split("T")[0],
        type: "Full-time",
        remote: false,
        skills: [""],
      });
    }, 2000);
  };

  // Check if dark mode is enabled
  useState(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Add New Job Listing
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Create a new job posting by filling out the form below. All fields
          marked with an asterisk (*) are required.
        </p>
      </div>

      {/* Success Message */}
      {formSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-8 rounded-xl shadow-xl border border-purple-200 dark:border-purple-900/50 max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Job Added Successfully!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your job listing has been successfully created.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
        <form
          onSubmit={handleSubmit}
          className="relative p-6 md:p-8 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  placeholder="e.g. Frontend Developer"
                />
              </div>
            </div>

            {/* Company */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  placeholder="e.g. Tech Innovations Inc."
                />
              </div>
            </div>

            {/* Location */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
            </div>

            {/* Salary */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Salary Range <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  placeholder="e.g. $95,000 - $120,000"
                />
              </div>
            </div>

            {/* Job Type */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Posted Date */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Posted Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="posted"
                  value={formData.posted}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Remote Option */}
            <div className="col-span-1 md:col-span-2 flex items-center">
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="remote"
                  id="remote"
                  checked={formData.remote}
                  onChange={handleChange}
                  className="absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer checked:right-0 checked:border-purple-500 transition-all duration-200 peer"
                />
                <label
                  htmlFor="remote"
                  className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer peer-checked:bg-purple-500"
                ></label>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <label
                  htmlFor="remote"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  Remote Position
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  placeholder="Describe the job position..."
                ></textarea>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Responsibilities <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {formData.responsibilities.map((item, index) => (
                  <div
                    key={`resp-${index}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(
                          "responsibilities",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      placeholder={`Responsibility ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("responsibilities", index)}
                      disabled={formData.responsibilities.length === 1 && !item}
                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("responsibilities")}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Responsibility</span>
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Requirements <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {formData.requirements.map((item, index) => (
                  <div key={`req-${index}`} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("requirements", index, e.target.value)
                      }
                      className="flex-1 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      placeholder={`Requirement ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("requirements", index)}
                      disabled={formData.requirements.length === 1 && !item}
                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("requirements")}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Requirement</span>
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Skills <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {formData.skills.map((item, index) => (
                  <div
                    key={`skill-${index}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("skills", index, e.target.value)
                      }
                      className="flex-1 px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                      placeholder={`Skill ${
                        index + 1
                      } (e.g. React, TypeScript)`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("skills", index)}
                      disabled={formData.skills.length === 1 && !item}
                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("skills")}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Skill</span>
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Job Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
