import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./NewsDetail.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
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
      try {
        setLoading(true);

        // Query Firestore untuk mengambil artikel berdasarkan ID
        const q = query(
          collection(db, "AemlPrograms"),
          where("id", "==", parseInt(id)),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();

          // PENTING: Convert Timestamp ke string SEBELUM set state
          let formattedDate = "";
          let formattedDateEN = "";
          if (data.createdAt) {
            const date = data.createdAt.toDate();

            // Format Indonesian
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
            formattedDate = `${date.getDate()} ${monthsID[date.getMonth()]} ${date.getFullYear()}`;

            // Format English
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
            formattedDateEN = `${monthsEN[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
          }

          const articleData = {
            id: data.id || doc.id,
            title: data.title || "Untitled",
            subtitle: data.subtitle || "",
            dateID: formattedDate, // Sudah dalam format string
            dateEN: formattedDateEN, // Sudah dalam format string
            images: data.images || [],
            tags: data.tags || "",
            body: data.body || null,
            linkDownload: data.linkDownload || "",
            type: data.type || "",
          };

          setArticle(articleData);
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

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
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="space-y-9"
      >
        <div className={styles.loading}>{t("home.load")}</div>
      </motion.div>
    );
  }

  if (!article) {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="space-y-9"
      >
        <div className={styles.error}>
          <h2>
            {currentLang === "id"
              ? "Artikel tidak ditemukan."
              : "Article not found."}
          </h2>
          <button
            onClick={() => navigate("/kegiatan")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#0C4FD3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {currentLang === "id"
              ? "Kembali ke Kegiatan"
              : "Back to Activities"}
          </button>
        </div>
      </motion.div>
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
                  {/* Gunakan string yang sudah di-format, sesuai bahasa */}
                  {currentLang === "id" ? article.dateID : article.dateEN}
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
