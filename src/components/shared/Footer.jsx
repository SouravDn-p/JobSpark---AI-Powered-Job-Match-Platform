import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Sparkles,
  User,
  Search,
  FileText,
  Building,
  Heart,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import { FiLinkedin } from "react-icons/fi";

// Job categories
const jobCategories = [
  { name: "Technology", path: "/jobs/technology" },
  { name: "Healthcare", path: "/jobs/healthcare" },
  { name: "Finance", path: "/jobs/finance" },
];

// Social media links
const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "https://facebook.com/jobspark" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/jobspark" },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    url: "https://linkedin.com/company/jobspark",
  },
];

export default function Footer() {
  const { isDarkMode } = useAuth();
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState("");

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setFormStatus("Subscribed!");
      setEmail("");
      setTimeout(() => setFormStatus(""), 2000);
    } else {
      setFormStatus("Enter email");
    }
  };

  return (
    <footer
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-700"
      } py-8 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Services Section */}
          <nav className="animate__animated animate__fadeIn">
            <h6
              className={`flex items-center text-base font-semibold ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              } mb-2`}
            >
              <Sparkles className="h-5 w-5 mr-1" />
              Services
            </h6>
            <Link
              to="/recommendations"
              className="flex items-center py-1 text-sm hover:text-blue-500 transition-colors"
            >
              <Heart className="h-4 w-4 mr-1" />
              AI Recommendations
            </Link>
            <Link
              to="/profile"
              className="flex items-center py-1 text-sm hover:text-blue-500 transition-colors"
            >
              <User className="h-4 w-4 mr-1" />
              Profile
            </Link>
            <Link
              to="/jobs"
              className="flex items-center py-1 text-sm hover:text-blue-500 transition-colors"
            >
              <Search className="h-4 w-4 mr-1" />
              Job Listings
            </Link>
          </nav>

          {/* Company Section */}
          <nav className="animate__animated animate__fadeIn animate__delay-1s">
            <h6
              className={`flex items-center text-base font-semibold ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              } mb-2`}
            >
              <Building className="h-5 w-5 mr-1" />
              Company
            </h6>
            <Link
              to="/about"
              className="block py-1 text-sm hover:text-blue-500 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-1 text-sm hover:text-blue-500 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/careers"
              className="block py-1 text-sm hover:text-blue-500 transition-colors"
            >
              Careers
            </Link>
          </nav>

          {/* Legal Section */}
          <nav className="animate__animated animate__fadeIn animate__delay-2s">
            <h6
              className={`flex items-center text-base font-semibold ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              } mb-2`}
            >
              <FileText className="h-5 w-5 mr-1" />
              Legal
            </h6>
            <Link
              to="/terms"
              className="block py-1 text-sm hover:text-blue-500 transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="block py-1 text-sm hover:text-blue-500 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/cookies"
              className="block py-1 text-sm hover:text-blue-500 transition-colors"
            >
              Cookies
            </Link>
          </nav>

          {/* Job Categories Section */}
          <nav className="animate__animated animate__fadeIn animate__delay-3s">
            <h6
              className={`flex items-center text-base font-semibold ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              } mb-2`}
            >
              <Briefcase className="h-5 w-5 mr-1" />
              Jobs
            </h6>
            {jobCategories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="block py-1 text-sm hover:text-blue-500 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Newsletter and Contact */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Newsletter */}
          <div className="animate__animated animate__zoomIn">
            <h6
              className={`text-base font-semibold ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              } mb-2`}
            >
              Newsletter
            </h6>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={`flex-grow px-3 py-1 text-sm rounded-l-lg border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-200"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {formStatus && (
              <p
                className={`mt-1 text-xs ${
                  formStatus.includes("Subscribed")
                    ? "text-green-500"
                    : "text-red-500"
                } animate__animated animate__fadeIn`}
              >
                {formStatus}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="animate__animated animate__fadeInUp">
            <h6
              className={`text-base font-semibold ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              } mb-2`}
            >
              Contact
            </h6>
            <p className="flex items-center text-sm py-1">
              <Mail className="h-4 w-4 mr-1" />
              support@jobspark.com
            </p>
            <p className="flex items-center text-sm py-1">
              <Phone className="h-4 w-4 mr-1" />
              +1 (800) 555-JOBS
            </p>
            <p className="flex items-center text-sm py-1">
              <MapPin className="h-4 w-4 mr-1" />
              San Francisco, CA
            </p>
          </div>
        </div>

        {/* Social Media and Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 animate__animated animate__bounceIn">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1 rounded-full ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </a>
            ))}
          </div>
          <p
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            } mt-2 sm:mt-0 animate__animated animate__fadeIn`}
          >
            © {new Date().getFullYear()} JobSpark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
