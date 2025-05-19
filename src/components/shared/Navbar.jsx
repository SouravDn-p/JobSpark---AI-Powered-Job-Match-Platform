import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Briefcase, LogOut, User } from "lucide-react";
import { AuthContexts } from "../../components/providers/AuthProviders";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContexts);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/");
        setIsMenuOpen(false);
      })
      .catch((err) => console.error("Sign-Out error:", err.message));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavItem = ({ to, children, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
        hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-800 dark:hover:text-blue-300
        ${
          isActive
            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700"
            : "text-gray-600 dark:text-gray-300"
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <Briefcase
              className="h-8 w-8 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              JobSpark
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavItem to="/jobs">Job Listings</NavItem>
            {user ? (
              <>
                <NavItem to="/recommendations">Recommendations</NavItem>
                <NavItem to="/profile">
                  <User className="h-4 w-4" />
                  {user?.name || "Profile"}
                </NavItem>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavItem to="/login">Login</NavItem>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <NavItem to="/jobs" onClick={() => setIsMenuOpen(false)}>
            Job Listings
          </NavItem>
          {user ? (
            <>
              <NavItem
                to="/recommendations"
                onClick={() => setIsMenuOpen(false)}
              >
                Recommendations
              </NavItem>
              <NavItem to="/profile" onClick={() => setIsMenuOpen(false)}>
                <User className="h-4 w-4" />
                {user?.name || "Profile"}
              </NavItem>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </NavItem>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
