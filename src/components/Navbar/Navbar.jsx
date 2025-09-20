import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // ✅ import react-router-dom
import styles from "./navbar.module.css";
import logo from "../../assets/aemllogo.png";
import logobrowse from "../../assets/image-rils.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // ✅ get current path for active state

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

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.containerMargin}>
        <ul className={styles.navLinks}>
          <li>
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
              >
                <path
                  d="M7.06 0.530273L4 3.58361L0.94 0.530273L0 1.47027L4 5.47027L8 1.47027L7.06 0.530273Z"
                  fill="#181818"
                />
              </svg>
            </Link>
          </li>
          <li>
            {/* Replace with a route instead of hash anchor if you have pages */}
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
            {" "}
            {/* ✅ Logo clickable to homepage */}
            <img src={logo} alt="AEML Logo" className={styles.img} />
          </Link>
        </div>

        <div className={styles.end}>
          <button className={styles.button}>
            <img src={logobrowse} alt="" className={styles.icon} />
            Infomolis.id
          </button>
          <Link to="/join">
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
