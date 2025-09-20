import React from "react";
import styles from "./KegiatanHero.module.css";

const KegiatanHero = () => {
  return (
    <section className={styles.kegiatanHero}>
      {/* Left: Gradient + Text */}
      <div className={styles.heroContent}>
        <div className={styles.breadcrumbInfo}>
          <span className={styles.dateBadge}>13 Desember 2024</span>
          <span className={styles.categoryBadge}>Kegiatan</span>
        </div>

        <h1 className={styles.heroTitle}>
          Judul Artikel Di Sini Maks. 3 Baris, tidak lebih dari 3 baris.
        </h1>

        <button className={styles.heroCta}>Baca selengkapnya →</button>
      </div>

      {/* Right: Image */}
      <div className={styles.heroImageCol}>
        <img
          src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="AEML Activities"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
};

export default KegiatanHero;
