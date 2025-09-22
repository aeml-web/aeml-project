import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./NewsDetail.module.css";
import { getArticleById } from "../../helpers/apiService"; // adjust path if needed

const NewsDetailPage = () => {
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

  const handleBackClick = () => {
    navigate("/kegiatan");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading article...</div>;
  }

  if (!article) {
    return <div className={styles.error}>Artikel tidak ditemukan.</div>;
  }

  return (
    <div className={styles.newsDetailContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.navigation}>
          <div className={styles.navLeft}>
            <button className={styles.backButton} onClick={handleBackClick}>
              ← Kembali ke Kegiatan
            </button>
          </div>
          <div className={styles.navCenter}>
            <img src="/logo.png" alt="AEML Logo" className={styles.logo} />
          </div>
          <div className={styles.navRight}>
            <button className={styles.navBtn}>Share</button>
            {article.linkDownload && (
              <a
                href={article.linkDownload}
                className={styles.navBtnPrimary}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Hero Image */}
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

          {/* Article Header */}
          <div className={styles.articleHeader}>
            <h1 className={styles.articleTitle}>{article.title}</h1>
            <div className={styles.articleMeta}>
              <span className={styles.articleDate}>
                {formatDate(article.createdAt)}
              </span>
              <span className={styles.articleCategory}>{article.type}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className={styles.articleContent}>
            {article.subtitle && (
              <p>
                <strong>{article.subtitle}</strong>
              </p>
            )}
            {article.body?.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Debug Info */}
      <div
        style={{
          padding: "1rem",
          textAlign: "center",
          fontSize: "0.875rem",
          color: "#6c757d",
        }}
      >
        <small>Article ID from route: {id}</small>
      </div>
    </div>
  );
};

export default NewsDetailPage;
