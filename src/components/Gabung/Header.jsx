// HeroSection.jsx
import React from "react";
import styles from "./Gabung.module.css";

const Header = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <img
          src="/api/placeholder/1200/600"
          alt="Electric vehicles landscape"
          className={styles.backgroundImage}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.vehicleShowcase}>
        <div className={styles.vehicle}>
          <img src="/api/placeholder/200/100" alt="Electric car" />
        </div>
        <div className={styles.vehicle}>
          <img src="/api/placeholder/150/100" alt="Electric motorcycle" />
        </div>
        <div className={styles.vehicle}>
          <img src="/api/placeholder/150/100" alt="Electric scooter" />
        </div>
        <div className={styles.vehicle}>
          <img src="/api/placeholder/200/100" alt="Electric car blue" />
        </div>
        <div className={styles.vehicle}>
          <img src="/api/placeholder/250/120" alt="Electric bus" />
        </div>
        <div className={styles.chargingStation}>
          <img src="/api/placeholder/100/120" alt="Charging station" />
        </div>
      </div>

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

export default Header;
