import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./navbar.module.css";
import logo from "../../assets/logoaemlfix.png";
import logobrowse from "../../assets/image-rils.png";
import { getAboutMenuItems } from "../About/ScrollNavigation";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get current language display (ID or EN)
  const currentLang = i18n.language === "id" ? "ID" : "EN";

  // Get translated menu items - TAMBAHKAN INI
  const aboutMenuItems = getAboutMenuItems(t);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setOpen(!open);

  // Change language using i18next
  const changeLang = (lang) => {
    const langCode = lang === "ID" ? "id" : "en";
    i18n.changeLanguage(langCode);
    localStorage.setItem("lang", langCode);
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDropdownClick = (e, sectionId) => {
    e.preventDefault();

    // Close dropdown
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);

    // Function to scroll to section
    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = -700;
        const offsetPosition = element.offsetTop - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    // If already on about page, scroll directly
    if (location.pathname === "/about") {
      setTimeout(scrollToSection, 100);
    } else {
      // Navigate first, then scroll
      navigate("/about");
      setTimeout(scrollToSection, 500);
    }
  };

  return (
    <>
      <nav
        className={`${styles.navbar} 
        ${location.pathname === "/" ? styles.homepage : styles.otherpage} 
        ${isScrolled && location.pathname === "/" ? styles.scrolled : ""}
      `}
      >
        <div className={styles.containerMargin}>
          {/* Desktop Navigation */}
          <ul className={styles.navLinks}>
            <li
              className={styles.dropdownContainer}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                to="/about"
                className={`${styles.navLink} ${
                  location.pathname === "/about" ? styles.active : ""
                }`}
              >
                {t("nav.about")}
                <svg
                  width="8"
                  height="6"
                  viewBox="0 0 8 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.dropdownArrow} ${
                    isDropdownOpen ? styles.arrowRotated : ""
                  }`}
                >
                  <path
                    d="M7.06 0.530273L4 3.58361L0.94 0.530273L0 1.47027L4 5.47027L8 1.47027L7.06 0.530273Z"
                    fill="#181818"
                  />
                </svg>
              </Link>

              {/* Desktop Dropdown Menu */}
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {aboutMenuItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={styles.dropdownItem}
                      onClick={(e) => handleDropdownClick(e, item.id)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
            <li>
              <Link
                to="/kegiatan"
                className={`${
                  location.pathname === "/kegiatan" ? styles.active : ""
                }`}
              >
                {t("nav.activities")}
              </Link>
            </li>
            <li>
              <Link
                to="/publikasi"
                className={`${
                  location.pathname === "/publikasi" ? styles.active : ""
                }`}
              >
                {t("nav.publications")}
              </Link>
            </li>
          </ul>

          {/* Logo - Always Visible */}
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="AEML Logo" className={styles.img} />
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className={styles.end}>
            <button
              className={styles.buttonInfomolis}
              onClick={() => window.open("https://infomolis.id", "_blank")}
            >
              <img src={logobrowse} alt="" className={styles.icon} />
              Infomolis.id
            </button>
            <Link to="/gabung">
              <button className={styles.buttonLang}>
                <span>{t("nav.join")}</span>
              </button>
            </Link>
            <div ref={dropdownRef} className={styles.langDropdownWrapper}>
              <button onClick={toggleDropdown} className={styles.buttonId}>
                {currentLang}
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.langDropdownIcon} ${
                    open ? styles.langDropdownRotate : ""
                  }`}
                >
                  <path
                    d="M9 1L5 5L1 1"
                    stroke="#181818"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {open && (
                <div className={styles.langDropdownMenu}>
                  <button
                    onClick={() => changeLang("ID")}
                    className={`${styles.langDropdownItem} ${
                      currentLang === "ID" ? styles.langActive : ""
                    }`}
                  >
                    ID
                  </button>
                  <button
                    onClick={() => changeLang("EN")}
                    className={`${styles.langDropdownItem} ${
                      currentLang === "EN" ? styles.langActive : ""
                    }`}
                  >
                    EN
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`${styles.hamburgerIcon} ${
                isMobileMenuOpen ? styles.open : ""
              }`}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <ul className={styles.mobileNavLinks}>
          {/* Mobile Dropdown for Tentang AEML */}
          <li className={styles.mobileDropdownContainer}>
            <button
              className={styles.mobileDropdownTrigger}
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            >
              {t("nav.about")}
              <svg
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.dropdownArrow} ${
                  isMobileDropdownOpen ? styles.arrowRotated : ""
                }`}
              >
                <path
                  d="M7.06 0.530273L4 3.58361L0.94 0.530273L0 1.47027L4 5.47027L8 1.47027L7.06 0.530273Z"
                  fill="#181818"
                />
              </svg>
            </button>
            {isMobileDropdownOpen && (
              <div className={styles.mobileDropdownMenu}>
                {aboutMenuItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleDropdownClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </li>

          {/* Mobile Navigation Links */}
          <li>
            <Link to="/kegiatan" onClick={() => setIsMobileMenuOpen(false)}>
              {t("nav.activities")}
            </Link>
          </li>
          <li>
            <Link to="/publikasi" onClick={() => setIsMobileMenuOpen(false)}>
              {t("nav.publications")}
            </Link>
          </li>
        </ul>

        {/* Mobile Buttons */}
        <div className={styles.mobileButtons}>
          <button
            className={styles.buttonInfomolis}
            onClick={() => {
              window.open("https://infomolis.id", "_blank");
              setIsMobileMenuOpen(false);
            }}
          >
            <img src={logobrowse} alt="" className={styles.icon} />
            Infomolis.id
          </button>

          <Link to="/gabung" onClick={() => setIsMobileMenuOpen(false)}>
            <button className={styles.buttonLang}>
              <span>{t("nav.join")}</span>
            </button>
          </Link>

          {/* Mobile Language Selector */}
          <div className={styles.langDropdownWrapper}>
            <button onClick={toggleDropdown} className={styles.buttonId}>
              {currentLang}
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.langDropdownIcon} ${
                  open ? styles.langDropdownRotate : ""
                }`}
              >
                <path
                  d="M9 1L5 5L1 1"
                  stroke="#181818"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {open && (
              <div className={styles.langDropdownMenu}>
                <button
                  onClick={() => changeLang("ID")}
                  className={`${styles.langDropdownItem} ${
                    currentLang === "ID" ? styles.langActive : ""
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => changeLang("EN")}
                  className={`${styles.langDropdownItem} ${
                    currentLang === "EN" ? styles.langActive : ""
                  }`}
                >
                  EN
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
