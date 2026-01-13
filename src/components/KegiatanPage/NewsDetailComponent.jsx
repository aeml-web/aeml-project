import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./NewsDetail.module.css";
import { getArticleById } from "../../helpers/apiService";
import ReadAnother from "./ReadAnother";
import { motion } from "framer-motion";

const NewsDetailComponent = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const result = await getArticleById(id);
      setArticle(result);
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

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

  // Translate tag
  const translateTag = (tagKey) => {
    if (!tagKey) return "";

    const translationMap = {
      BERITA: "news",
      ARTIKEL: "articles",
      OPINI: "opinion",
      PENGUMUMAN: "announcements",
      KEGIATAN: "activities",
    };

    const key = tagKey.toUpperCase();
    return t(`activities.${translationMap[key]}`) || tagKey;
  };

  if (loading) {
    return <div className={styles.loading}>{t("home.load")}</div>;
  }

  if (!article) {
    return (
      <div className={styles.error}>
        {currentLang === "id"
          ? "Artikel tidak ditemukan."
          : "Article not found."}
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-9"
    >
      <div className={styles.newsDetailContainer}>
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            {article.images && article.images.length > 0 && (
              <div className={styles.heroImageContainer}>
                <img
                  src={article.images[0]}
                  alt={article.title}
                  className={styles.heroImage}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}

            <div className={styles.articleHeader}>
              <h1 className={styles.articleTitle}>{article.title}</h1>
              <div className={styles.articleMeta}>
                <span className={styles.articleDate}>
                  {formatDate(article.createdAt || article.date)}
                </span>
                <span className={styles.articleCategory}>
                  {translateTag(article.tags)}
                </span>
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.articleContent}>
              {article.body ? (
                <div dangerouslySetInnerHTML={{ __html: article.body }} />
              ) : (
                <p>
                  {currentLang === "id"
                    ? "Tidak ada konten"
                    : "No content available"}
                </p>
              )}
            </div>
          </div>
        </div>
        <ReadAnother excludeId={id} />
      </div>
    </motion.div>
  );
};

export default NewsDetailComponent;
