import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./publikasi.module.css";
import cover from "../../assets/publikasiphoto.png";

export default function Header() {
  const { t } = useTranslation();

  return (
    <div className={styles.headerParent}>
      <div className={styles.banner}>
        <img
          src={cover}
          alt="Banner EV Charging"
          className={styles.bannerImage}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.titlePub}>{t("publications.title")}</h2>
        <p className={styles.desc}>{t("publications.description")}</p>
      </div>
    </div>
  );
}
