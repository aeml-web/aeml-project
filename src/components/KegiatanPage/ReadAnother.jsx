import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./read.module.css";
import styleGrid from "./read.module.css";
import { getArticles } from "../../helpers/apiService";

const ReadAnother = ({ excludeId }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPublications = async () => {
      try {
        setLoading(true);
        setError(null);
        const publicationsData = await getArticles();

        // Filter out the one that's currently opened
        const filtered = publicationsData.filter(
          (item) => String(item.id) !== String(excludeId)
        );

        // Limit to maximum 3 articles
        setPublications(filtered.slice(0, 3));
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

  // Format date based on language
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // If date is already formatted (contains month names), return as is
    if (
      typeof dateString === "string" &&
      (dateString.includes("Januari") ||
        dateString.includes("January") ||
        dateString.includes("Juli") ||
        dateString.includes("July"))
    ) {
      return dateString;
    }

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString;
      }

      if (currentLang === "id") {
        const monthsID = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];
        return `${date.getDate()} ${
          monthsID[date.getMonth()]
        } ${date.getFullYear()}`;
      } else {
        const monthsEN = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return `${
          monthsEN[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
      }
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className={styles.publicationsSection}>
        <div className={styles.publicationsHeader}>
          <h2 className={styles.publicationsTitle}>
            {currentLang === "id" ? "Baca juga:" : "Read also:"}
          </h2>
        </div>
        <div className={styles.loadingContainer}>
          <p>{t("home.load")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.publicationsSection}>
        <div className={styles.publicationsHeader}>
          <h2 className={styles.publicationsTitle}>
            {currentLang === "id" ? "Baca juga:" : "Read also:"}
          </h2>
        </div>
        <div className={styles.errorContainer}>
          <p>{t("home.failedLoad")}</p>
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
        <h2 className={styles.publicationsTitle}>
          {currentLang === "id" ? "Baca juga:" : "Read also:"}
        </h2>
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
              <p className={styleGrid.regularDate}>{formatDate(item.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadAnother;
