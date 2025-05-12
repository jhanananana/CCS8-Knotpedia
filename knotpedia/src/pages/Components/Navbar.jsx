import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        setShowDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">

        <Link to="/">
          <img src="/assets/logo.png" className="navbar-logo" alt="Knotpedia Logo" title="Knotpedia Home" />
        </Link>
        <div className="navbar-actions">
          <button className="menu-icon" title="Menu" onClick={() => setMenuOpen(!menuOpen)}>
            <b>☰</b>
          </button>
          <a href="/search"><button className="search-button mobile-only" onClick={() => setShowSearch(!showSearch)} title="Search">
            <img src="/assets/search red.png" alt="Search" />
          </button></a>
        </div>

      </div>
      <ul className={`navbar-links ${menuOpen ? "mobile show" : ""}`}>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>

        <li className={isMobile ? "" : "dropdown"} >
          <div
            className={`dropdown-toggle ${showDropdown || location.pathname.startsWith("/knots/") ? "active" : ""}`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Explore Knots
            <i
              style={{ marginLeft: '5px', fontSize: '10px' }}
              title="Expand"
              className={`fas fa-chevron-down ${showDropdown || location.pathname.startsWith("/knots/") ? "active" : ""}`}
            ></i>
          </div>

          {isMobile ? (
            <div className={`dropdown-submenu ${showDropdown ? "show" : ""}`}>
              <Link to="/knots/all" className={location.pathname === "/knots/all" ? "active" : ""}>
                All Knots
              </Link>
              <Link to="/knots/activities" className={location.pathname === "/knots/activity" ? "active" : ""}>
                Knots by Activity
              </Link>
              <Link to="/knots/types" className={location.pathname === "/knots/type" ? "active" : ""}>
                Knots by Type
              </Link>
              <Link to="/glossary" className={location.pathname === "/glossary" ? "active" : ""}>
                Knots Glossary
              </Link>
            </div>
          ) : (
            <ul className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
              <li>
                <Link to="/knots/all" className={location.pathname === "/knots/all" ? "active" : ""}>
                  All Knots
                </Link>
              </li>
              <li>
                <Link to="/knots/activities" className={location.pathname === "/knots/activity" ? "active" : ""}>
                  Knots by Activity
                </Link>
              </li>
              <li>
                <Link to="/knots/types" className={location.pathname === "/knots/type" ? "active" : ""}>
                  Knots by Type
                </Link>
              </li>
              <li>
                <Link to="/glossary" className={location.pathname === "/glossary" ? "active" : ""}>
                  Knots Glossary
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""} title="Contact Us">
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""} title="About Us">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/sitemap" className={location.pathname === "/sitemap" ? "active" : ""} title="Site Map">
            Site Map
          </Link>
        </li>
        <li>
          <Link to="/preferences" className={location.pathname === "/preferences" ? "active" : ""} title="Preferences">
            Preferences
          </Link>
        </li>

        <li>
          {!menuOpen && (
            <div className="navbar-right">
              <a href="/search">
                <button className="search-button" onClick={() => setShowSearch(!showSearch)}>
                  <img src="/assets/search red.png" alt="Search" title="Search" />
                </button>
              </a>
            </div>
          )}
        </li>
      </ul>
    </nav>

  );
};

export default Navbar;
