import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Moon, Sun, BookOpen } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { getLocalStorage } from "../../utils/localStorage";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const uid = getLocalStorage("uid");
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/home" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">BronxEdu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/home"
              className="nav-link font-medium text-gray-700 hover:text-primary-600"
            >
              Home
            </Link>

            {user?.type === "student" && (
              <Link
                to={`/progress/${uid}`}
                className="nav-link font-medium text-gray-700 hover:text-primary-600"
              >
                Progress
              </Link>
            )}
            <Link
              to="/resources"
              className="nav-link font-medium text-gray-700 hover:text-primary-600"
            >
              Resources
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link
              to="/home"
              className="block py-2 px-3 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/progress"
              className="block py-2 px-3 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Progress
            </Link>

            <button
              onClick={toggleTheme}
              className="flex w-full items-center py-2 px-3 rounded-md hover:bg-gray-100"
            >
              {theme === "light" ? (
                <>
                  <Moon size={20} className="mr-2" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun size={20} className="mr-2" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center py-2 px-3 rounded-md hover:bg-gray-100 text-red-600"
            >
              <LogOut size={20} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
