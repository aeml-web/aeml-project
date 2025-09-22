import React, { useState, useEffect } from "react";
import styles from "./read.module.css";
import styleGrid from "./read.module.css";
import { getPublications } from "../../helpers/apiService";

const ReadAnother = () => {
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
          <h2 className={styles.publicationsTitle}>Baca juga:</h2>
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
          <h2 className={styles.publicationsTitle}>Baca juga:</h2>
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
          <h2 className={styles.publicationsTitle}>Baca juga:</h2>
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
        <h2 className={styles.publicationsTitle}>Baca juga:</h2>
      </div>

      <div className={styleGrid.regularGrid}>
        {publications.map((item) => (
          <div
            key={item.id}
            className={styleGrid.regularCard}
            onClick={() => handleCardClick(item.id)}
            style={{ cursor: "pointer" }}
          >
            <div className={styleGrid.regularImageContainer}>
              <img
                src={item.image}
                alt={item.title}
                className={styleGrid.regularImage}
              />
            </div>
            <div className={styleGrid.regularContent}>
              <h3 className={styleGrid.regularTitle}>{item.title}</h3>
              <p className={styleGrid.regularDate}>13 Juli 2025</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadAnother;
