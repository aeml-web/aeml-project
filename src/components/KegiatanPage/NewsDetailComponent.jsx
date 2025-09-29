import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./NewsDetail.module.css";
import { getArticleById } from "../../helpers/apiService"; // adjust path if needed
import ReadAnother from "./ReadAnother";

const NewsDetailComponent = () => {
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
                {formatDate(article.createdAt)}
              </span>
              <span className={styles.articleCategory}>{article.tags}</span>
            </div>
            <div className={styles.line}></div>
          </div>

          <div className={styles.articleContent}>
            {article.body ? (
              <div dangerouslySetInnerHTML={{ __html: article.body }} />
            ) : (
              <p>Tidak ada konten</p>
            )}
          </div>
        </div>
      </div>
      <ReadAnother excludeId={id} />
    </div>
  );
};

export default NewsDetailComponent;
