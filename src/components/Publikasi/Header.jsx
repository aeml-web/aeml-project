import React from "react";
import styles from "./publikasi.module.css";
import cover from "../../assets/bgpublikasi.png";

export default function Header() {
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
        <h2 className={styles.title}>Publikasi</h2>
        <p className={styles.desc}>Edaran, riset, dan booklet dari AEML.</p>
      </div>
    </div>
  );
}
