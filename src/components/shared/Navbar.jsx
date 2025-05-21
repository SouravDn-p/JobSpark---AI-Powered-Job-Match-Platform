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
import logo from "../../assets/logo.jpg";

// Helper function to conditionally join class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Navbar = () => {
  const location = useLocation();
  const { user, signOutUser, toggleUser, toggleTheme, isMobile, isDarkMode } =
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

  const toggleMode = () => {
    toggleTheme();
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
          isDarkMode
            ? "text-gray-200 hover:bg-blue-900/50 hover:text-blue-300"
            : "text-gray-800 hover:bg-blue-100/50 hover:text-blue-600",
          isActive
            ? isDarkMode
              ? "text-blue-300 bg-blue-900/50"
              : "text-blue-600 bg-blue-100/50"
            : "",
          className
        )}
      >
        {children}
      </NavLink>
    );
  };

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
    <nav
      className={cn(
        // Sticky positioning
        "sticky top-0 z-50",
        // Glassy effect: semi-transparent background with blur
        isDarkMode
          ? "bg-gray-900/70 backdrop-blur-md border-gray-800/50"
          : "bg-gray-300 backdrop-blur-md border-gray-200/50",
        "border-b"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img
                src={logo}
                className={cn(
                  "h-8 w-8 rounded-2xl transition-all duration-300",
                  isDarkMode
                    ? "ring-2 ring-blue-400/50"
                    : "ring-2 ring-blue-600/50"
                )}
                aria-hidden="true"
                alt="JobSpark logo"
              />
            </div>
            <span
              className={cn(
                "ml-2 text-xl font-bold",
                isDarkMode
                  ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              )}
            >
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
                    className={cn(
                      "p-2 rounded-full",
                      isDarkMode
                        ? "text-gray-200 hover:bg-blue-900/50"
                        : "text-gray-800 hover:bg-blue-100/50"
                    )}
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>

                  {isNotificationDropdownOpen && (
                    <div
                      className={cn(
                        "absolute right-0 mt-2 w-64 rounded-lg shadow-lg py-2 z-50 border",
                        // Glassy effect for dropdown
                        isDarkMode
                          ? "bg-gray-900/70 backdrop-blur-md border-gray-800/50"
                          : "bg-white/70 backdrop-blur-md border-gray-200/50"
                      )}
                    >
                      <div
                        className={cn(
                          "p-2 font-medium border-b",
                          isDarkMode
                            ? "border-gray-700/50"
                            : "border-gray-200/50"
                        )}
                      >
                        Notifications
                      </div>
                      <div
                        className={cn(
                          "p-4 text-sm text-center",
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        )}
                      >
                        No new notifications
                      </div>
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative dropdown-container">
                  <Button
                    onClick={toggleUserDropdown}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isDarkMode
                        ? "text-gray-200 hover:bg-blue-900/50"
                        : "text-gray-800 hover:bg-blue-100/50"
                    )}
                    aria-expanded={isUserDropdownOpen}
                    aria-label="User menu"
                  >
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full overflow-hidden border-2",
                        isDarkMode
                          ? "border-blue-900/50 bg-gradient-to-br from-blue-400 to-purple-500"
                          : "border-blue-200/50 bg-gradient-to-br from-blue-400 to-purple-500"
                      )}
                    >
                      {user.photoURL ? (
                        <img
                          src={user.photoURL || "/placeholder.svg"}
                          alt={user.name}
                          className="h-full w-full object-cover"
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
                    <div
                      className={cn(
                        "absolute right-0 mt-2 w-56 rounded-lg shadow-lg py-2 z-50 border",
                        // Glassy effect for dropdown
                        isDarkMode
                          ? "bg-gray-900/70 backdrop-blur-md border-gray-800/50"
                          : "bg-white/70 backdrop-blur-md border-gray-200/50"
                      )}
                    >
                      <NavLink
                        to="/profilePage"
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 text-sm",
                          isDarkMode
                            ? "text-gray-200 hover:bg-blue-900/50"
                            : "text-gray-800 hover:bg-blue-100/50"
                        )}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </NavLink>
                      <NavLink
                        to="/dashboard"
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 text-sm",
                          isDarkMode
                            ? "text-gray-200 hover:bg-blue-900/50"
                            : "text-gray-800 hover:bg-blue-100/50"
                        )}
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Briefcase className="h-4 w-4" />
                        Dashboard
                      </NavLink>
                      <div
                        className={cn(
                          "border-t my-1",
                          isDarkMode
                            ? "border-gray-700/50"
                            : "border-gray-200/50"
                        )}
                      ></div>
                      <button
                        onClick={handleSignOut}
                        className={cn(
                          "flex w-full items-center gap-2 px-4 py-2 text-sm",
                          isDarkMode
                            ? "text-gray-200 hover:bg-blue-900/50"
                            : "text-gray-800 hover:bg-blue-100/50"
                        )}
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
                  to="/register"
                  className={cn(
                    "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white",
                    "bg-gradient-to-r from-blue-600 to-purple-600",
                    "hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  )}
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <Button
              onClick={toggleMode}
              className={cn(
                "p-2 ml-2 rounded-full",
                isDarkMode
                  ? "text-gray-200 hover:bg-blue-900/50"
                  : "text-gray-800 hover:bg-blue-100/50"
              )}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
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
              onClick={toggleMode}
              className={cn(
                "p-2 rounded-full",
                isDarkMode
                  ? "text-gray-200 hover:bg-blue-900/50"
                  : "text-gray-800 hover:bg-blue-100/50"
              )}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
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
                className={cn(
                  "px-3 py-1 text-xs border rounded-md",
                  isDarkMode
                    ? "border-gray-700/50 text-gray-200 hover:bg-blue-900/50"
                    : "border-gray-300/50 text-gray-800 hover:bg-blue-100/50"
                )}
              >
                {user ? "Logout" : "Login"}
              </Button>
            )}

            <Button
              onClick={toggleMenu}
              className={cn(
                "p-2 rounded-lg",
                isDarkMode
                  ? "text-gray-200 hover:bg-blue-900/50"
                  : "text-gray-800 hover:bg-blue-100/50"
              )}
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
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
          // Glassy effect for mobile menu
          isDarkMode
            ? "bg-gray-900/70 backdrop-blur-md border-gray-800/50"
            : "bg-white/70 backdrop-blur-md border-gray-200/50",
          "border-t"
        )}
      >
        <div
          className={cn(
            "px-4 pt-2 pb-4 space-y-2",
            isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
          )}
        >
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
                Profile
              </NavItem>
              <NavItem to="/dashboard" className="w-full">
                <Briefcase className="h-4 w-4" />
                Dashboard
              </NavItem>
              <button
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isDarkMode
                    ? "text-gray-200 hover:bg-blue-900/50 hover:text-blue-300"
                    : "text-gray-800 hover:bg-blue-100/50 hover:text-blue-600"
                )}
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
                to="/register"
                className={cn(
                  "block w-full text-center px-4 py-2 rounded-lg text-sm font-medium text-white",
                  "bg-gradient-to-r from-blue-600 to-purple-600",
                  "hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                )}
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
        /* Fallback for browsers without backdrop-filter support */
        @supports not (backdrop-filter: blur(8px)) {
          .backdrop-blur-md {
            background: ${isDarkMode
              ? "rgba(17, 24, 39, 0.9)"
              : "rgba(255, 255, 255, 0.9)"};
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
