import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./read.module.css";
import styleGrid from "./read.module.css";
import { getPublications } from "../../helpers/apiService";

const ReadAnother = ({ excludeId }) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPublications = async () => {
      try {
        setLoading(true);
        setError(null);
        const publicationsData = await getPublications();

        // Filter out the one that's currently opened
        const filtered = publicationsData.filter(
          (item) => String(item.id) !== String(excludeId)
        );

        setPublications(filtered);
      } catch (err) {
        setError("Failed to load publications");
        console.error("Error loading publications:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, [excludeId]);

  const handleCardClick = (itemId) => {
    navigate(`/kegiatan/${itemId}`);
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
    return null; // hide section if no other publications
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
              <p className={styleGrid.regularDate}>
                {new Date(item.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadAnother;
