// HeroSection.jsx
import React from "react";
import styles from "./Gabung.module.css";
import bg from "../../assets/gabung/AEML_BG_GABUNG.jpg";
import { useTranslation, Trans } from "react-i18next";

const HeroSection = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { t, i18n } = useTranslation();

  return (
    <section className={styles.hero}>
      <img
        src={bg}
        alt="Electric vehicles landscape"
        className={styles.backgroundImage}
      />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {t("join.heroTitle")}
          <br />
          <span className={styles.titleHighlight}>{t("join.heroTitle2")}</span>
        </h1>
        <p className={styles.heroSubtitle}>{t("join.heroDescription")}</p>
        <div className={styles.heroButtons}>
          <button
            className={styles.primaryBtn}
            onClick={() => scrollToSection("pelajari-section")}
          >
            {t("join.learn")}
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => scrollToSection("form-section")}
          >
            {t("join.fillForm")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
