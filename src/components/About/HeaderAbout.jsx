import styles from "./about.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";

export default function HeaderAbout() {
  const { t, i18n } = useTranslation();

  console.log("HeaderAbout language:", i18n.language);
  console.log("Translation test:", t("home.title"));

  return (
    <div className={styles.aboutContainer}>
      <p style={{ background: "yellow", padding: "10px" }}>
        Current Lang: {i18n.language} | Title: {t("home.title")}
      </p>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t("home.title")} </h1>
          <p className={styles.heroSubtitle}>{t("home.tagline")}</p>
        </div>
      </div>

      {/* Bagian tombol */}
      <div className={styles.heroButtons}>
        <button className={styles.btnPrimary}>Tentang AEML</button>
        <button className={styles.btnSecondary}>Kegiatan</button>
      </div>
    </div>
  );
}
