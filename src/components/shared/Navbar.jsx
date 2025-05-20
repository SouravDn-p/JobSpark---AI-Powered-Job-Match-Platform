import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Briefcase,
  LogOut,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Search,
  Bell,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

// Helper function to conditionally join class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Navbar = () => {
  const location = useLocation();
  const { user, signOutUser, toggleUser, theme, toggleTheme, isMobile } =
    useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setIsMenuOpen(false);
      setIsUserDropdownOpen(false);
    } catch (err) {
      console.error("Sign-Out error:", err.message);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isUserDropdownOpen) setIsUserDropdownOpen(false);
    if (isNotificationDropdownOpen) setIsNotificationDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    if (isNotificationDropdownOpen) setIsNotificationDropdownOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    if (isUserDropdownOpen) setIsUserDropdownOpen(false);
  };

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
    setIsNotificationDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen || isNotificationDropdownOpen) {
        if (!event.target.closest(".dropdown-container")) {
          setIsUserDropdownOpen(false);
          setIsNotificationDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen, isNotificationDropdownOpen]);

  const NavItem = ({ to, children, className }) => {
    const isActive = location.pathname === to;

    return (
      <NavLink
        to={to}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
          "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600",
          "dark:hover:from-gray-800 dark:hover:to-gray-700 dark:hover:text-blue-400",
          isActive
            ? "text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-sm"
            : "text-gray-600 dark:text-gray-300",
          className
        )}
      >
        {children}
      </NavLink>
    );
  };

  // Custom button component
  const Button = ({
    children,
    onClick,
    className,
    type = "button",
    disabled = false,
  }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
      >
        {children}
      </button>
    );
  };

  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <Briefcase
                className="h-8 w-8 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:opacity-0"
                aria-hidden="true"
              />
              <Sparkles
                className="h-8 w-8 text-purple-600 dark:text-purple-400 absolute top-0 left-0 opacity-0 transition-all duration-300 group-hover:opacity-100 animate-pulse"
                aria-hidden="true"
              />
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JobSpark
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavItem to="/jobs">
              <Search className="h-4 w-4" />
              Job Listings
            </NavItem>

            {user ? (
              <>
                <NavItem to="/recommendations">
                  <Sparkles className="h-4 w-4" />
                  Recommendations
                </NavItem>

                {/* Notifications Dropdown */}
                <div className="relative dropdown-container">
                  <Button
                    onClick={toggleNotificationDropdown}
                    className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>

                  {isNotificationDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                      <div className="p-2 font-medium border-b border-gray-200 dark:border-gray-700">
                        Notifications
                      </div>
                      <div className="p-4 text-sm text-center text-gray-500 dark:text-gray-400">
                        No new notifications
                      </div>
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative dropdown-container">
                  <Button
                    onClick={toggleUserDropdown}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200"
                    aria-expanded={isUserDropdownOpen}
                    aria-label="User menu"
                  >
                    <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-400 to-purple-500">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL || "/placeholder.svg"}
                          alt={user.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/32";
                          }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span>{user.name}</span>
                  </Button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                      <NavLink
                        to="/profilePage"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </NavLink>
                      <NavLink
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Briefcase className="h-4 w-4" />
                        Dashboard
                      </NavLink>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavItem to="/login">Login</NavItem>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              className="p-2 ml-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun
                  className="h-5 w-5 text-yellow-400 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              ) : (
                <Moon
                  className="h-5 w-5 text-blue-600 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle - Mobile */}
            <Button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun
                  className="h-5 w-5 text-yellow-400 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              ) : (
                <Moon
                  className="h-5 w-5 text-blue-600 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              )}
            </Button>

            {/* For demo purposes - toggle user */}
            {!isMobile && (
              <Button
                onClick={toggleUser}
                className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {user ? "Logout" : "Login"}
              </Button>
            )}

            <Button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <NavItem to="/jobs" className="w-full">
            <Search className="h-4 w-4" />
            Job Listings
          </NavItem>

          {user ? (
            <>
              <NavItem to="/recommendations" className="w-full">
                <Sparkles className="h-4 w-4" />
                Recommendations
              </NavItem>
              <NavItem to="/profilePage" className="w-full">
                <User className="h-4 w-4" />
                profilePage
              </NavItem>
              <NavItem to="/dashboard" className="w-full">
                <Briefcase className="h-4 w-4" />
                Dashboard
              </NavItem>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" className="w-full">
                Login
              </NavItem>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Keyframes for animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
