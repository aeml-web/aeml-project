import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./homepage.module.css";
import "animate.css";
import { useTranslation, Trans } from "react-i18next";

export default function HeaderHome() {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const { t, i18n } = useTranslation();

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
            <Trans i18nKey="home.title">
              Asosiasi Ekosistem <br /> Mobilitas Listrik
            </Trans>{" "}
          </h1>
          <p
            className={`${styles.heroSubtitle} ${
              showSubtitle
                ? "animate__animated animate__fadeIn animate__slower"
                : ""
            }`}
          >
            {t("home.tagline")}
          </p>
        </div>
      </div>

      {/* Bagian tombol */}
      <div className={styles.heroButtons}>
        <button
          className={styles.btnPrimary}
          onClick={() => navigate("/about")}
        >
          {t("home.btnAbout")}
        </button>
        <button
          className={styles.btnSecondary}
          onClick={() => navigate("/kegiatan")}
        >
          <span> {t("home.btnActivities")}</span>
        </button>
      </div>
    </div>
  );
}
