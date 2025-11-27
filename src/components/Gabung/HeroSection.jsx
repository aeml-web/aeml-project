// HeroSection.jsx
import React from "react";
import styles from "./Gabung.module.css";
import bg from "../../assets/gabung/AEML_BG_GABUNG.jpg";

const HeroSection = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero}>
      <img
        src={bg}
        alt="Electric vehicles landscape"
        className={styles.backgroundImage}
      />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Bergabung dengan
          <br />
          <span className={styles.titleHighlight}>
            Asosiasi Mobilitas Ekosistem Listrik
          </span>
        </h1>
        <p className={styles.heroSubtitle}>
          Gabung ke dalam ekosistem yang mendukung percepatan pengembangan
          ekosistem mobilitas listrik di Indonesia hingga mandunia.
        </p>
        <div className={styles.heroButtons}>
          <button
            className={styles.primaryBtn}
            onClick={() => scrollToSection("pelajari-section")}
          >
            Pelajari
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => scrollToSection("form-section")}
          >
            Isi form
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
