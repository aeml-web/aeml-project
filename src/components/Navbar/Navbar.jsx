import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../../assets/logoaemlfix.png";
import logobrowse from "../../assets/image-rils.png";
import { aboutMenuItems } from "../About/ScrollNavigation"; // Sesuaikan dengan struktur folder Anda

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleDropdownClick = (sectionId) => {
    // Tutup dropdown
    setIsDropdownOpen(false);

    // Scroll ke tengah container "content" tapi agak dinaikkan dikit
    const contentContainer = document.getElementById("content");
    if (contentContainer) {
      const rect = contentContainer.getBoundingClientRect();
      const containerTop = window.pageYOffset + rect.top;
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Scroll ke posisi tengah tapi dinaikkan 100px (sesuaikan nilai ini)
      const offset = 100; // Ubah nilai ini untuk mengatur seberapa naik
      const scrollTo =
        containerTop + containerHeight / 2 - windowHeight / 2 - offset;

      window.scrollTo({
        top: scrollTo,
        behavior: "smooth",
      });
    }

    // Jika sedang di halaman about, langsung scroll ke section
    if (location.pathname === "/about") {
      setTimeout(() => {
        if (window.navigateToAboutSection) {
          window.navigateToAboutSection(sectionId);
        }
      }, 500);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.containerMargin}>
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
              Tentang AEML
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

            {/* Dropdown Menu - Updated with section links */}
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {aboutMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/about#${item.id}`}
                    className={styles.dropdownItem}
                    onClick={() => handleDropdownClick(item.id)}
                  >
                    {/* <span className={styles.dropdownIcon}>{item.icon}</span> */}
                    {item.label}
                  </Link>
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
              Kegiatan
            </Link>
          </li>
          <li>
            <Link
              to="/publikasi"
              className={`${
                location.pathname === "/publikasi" ? styles.active : ""
              }`}
            >
              Publikasi
            </Link>
          </li>
        </ul>

        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="AEML Logo" className={styles.img} />
          </Link>
        </div>

        <div className={styles.end}>
          <button className={styles.buttonInfomolis}>
            <img src={logobrowse} alt="" className={styles.icon} />
            Infomolis.id
          </button>
          <Link to="/gabung">
            <button className={styles.buttonLang}>Gabung AEML</button>
          </Link>
          <button className={styles.buttonId}>
            ID
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.06 0.530273L4 3.58361L0.94 0.530273L0 1.47027L4 5.47027L8 1.47027L7.06 0.530273Z"
                fill="#181818"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
