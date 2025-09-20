import { useNavigate } from "react-router-dom";
import styles from "./homepage.module.css";

export default function HeaderHome() {
  const navigate = useNavigate();

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Asosiasi Ekosistem <br /> Mobilitas Listrik
          </h1>
          <p className={styles.heroSubtitle}>
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
          Kegiatan
        </button>
      </div>
    </div>
  );
}
