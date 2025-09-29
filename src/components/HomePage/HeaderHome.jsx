import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./homepage.module.css";
import "animate.css";

export default function HeaderHome() {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // Show title immediately
    setShowTitle(true);

    // Show subtitle after delay
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 800); // Adjust this delay (in milliseconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1
            className={`${styles.heroTitle} ${
              showTitle
                ? "animate__animated animate__fadeInLeft animate__slow"
                : ""
            }`}
          >
            Asosiasi Ekosistem <br /> Mobilitas Listrik
          </h1>
          <p
            className={`${styles.heroSubtitle} ${
              showSubtitle
                ? "animate__animated animate__fadeIn animate__slower"
                : ""
            }`}
          >
            Katalis pengembangan ekosistem mobilitas listrik kelas dunia di
            Indonesia.
          </p>
        </div>
      </div>

      {/* Bagian tombol */}
      <div className={styles.heroButtons}>
        <button
          className={styles.btnPrimary}
          onClick={() => navigate("/about")}
        >
          Tentang AEML
        </button>
        <button
          className={styles.btnSecondary}
          onClick={() => navigate("/kegiatan")}
        >
          <span>Kegiatan</span>
        </button>
      </div>
    </div>
  );
}
