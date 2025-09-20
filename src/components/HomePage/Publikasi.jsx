import React, { useState, useEffect } from "react";
import styles from "./homepage.module.css";
import { getPublications } from "../../helpers/apiService";

const Publikasi = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        setLoading(true);
        setError(null);
        const publicationsData = await getPublications();
        setPublications(publicationsData);
      } catch (err) {
        setError("Failed to load publications");
        console.error("Error loading publications:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, []);

  const handleReadPublication = (publication) => {
    if (publication.linkDownload) {
      // Open download link in new tab
      window.open(publication.linkDownload, "_blank");
    } else {
      // If no download link, could navigate to detail page or show message
      console.log("No download link available for:", publication.title);
    }
  };

  if (loading) {
    return (
      <div className={styles.publicationsSection}>
        <div className={styles.publicationsHeader}>
          <h2 className={styles.publicationsTitle}>Publikasi</h2>
        </div>
        <div className={styles.loadingContainer}>
          <p>Memuat publikasi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.publicationsSection}>
        <div className={styles.publicationsHeader}>
          <h2 className={styles.publicationsTitle}>Publikasi</h2>
        </div>
        <div className={styles.errorContainer}>
          <p>Gagal memuat publikasi. Silakan coba lagi nanti.</p>
        </div>
      </div>
    );
  }

  if (!publications.length) {
    return (
      <div className={styles.publicationsSection}>
        <div className={styles.publicationsHeader}>
          <h2 className={styles.publicationsTitle}>Publikasi</h2>
        </div>
        <div className={styles.emptyContainer}>
          <p>Belum ada publikasi tersedia.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.publicationsSection}>
      <div className={styles.publicationsHeader}>
        <h2 className={styles.publicationsTitle}>Publikasi</h2>
        <a href="#" className={styles.viewAllLink}>
          Baca selengkapnya →
        </a>
      </div>

      <div className={styles.publicationsGrid}>
        {publications.map((pub) => (
          <div key={pub.id} className={styles.publicationCard}>
            <div className={styles.cardContain}>
              <div className={styles.cardImage}>
                <img
                  src={pub.image}
                  alt={pub.title}
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/id/${
                      1011 + pub.id
                    }/800/500`;
                  }}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{pub.title}</h3>
                {pub.subtitle && (
                  <p className={styles.cardSubtitle}>{pub.subtitle}</p>
                )}
              </div>
            </div>
            <button
              className={styles.btnRead}
              onClick={() => handleReadPublication(pub)}
              disabled={!pub.linkDownload}
              title={
                pub.linkDownload
                  ? "Klik untuk membaca publikasi"
                  : "Publikasi tidak tersedia"
              }
            >
              {pub.readText || "Baca Publikasi"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publikasi;
