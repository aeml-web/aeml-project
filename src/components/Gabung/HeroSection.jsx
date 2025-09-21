// HeroSection.jsx
import React from "react";
import styles from "./Gabung.module.css";
import bg from "../../assets/bggabung.png";

const HeroSection = () => {
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
          <button className={styles.primaryBtn}>Pelajari</button>
          <button className={styles.secondaryBtn}>Isi form</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
