import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./homepage.module.css";
import { getArticles } from "../../helpers/apiService";

const NewsItem = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const articles = await getArticles();
        setNewsItems(articles);
      } catch (err) {
        setError("Failed to load articles");
        console.error("Error loading articles:", err);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleCardClick = (itemId) => {
    navigate(`/kegiatan/${itemId}`);
  };

  if (loading) {
    return (
      <div className={styles.containerNews}>
        <div className={styles.header}>
          <h1 className={styles.titleNews}>Kegiatan</h1>
        </div>
        <div className={styles.loadingContainer}>
          <p>Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.containerNews}>
        <div className={styles.header}>
          <h1 className={styles.titleNews}>Kegiatan</h1>
        </div>
        <div className={styles.errorContainer}>
          <p>Gagal memuat artikel. Silakan coba lagi nanti.</p>
        </div>
      </div>
    );
  }

  if (!newsItems.length) {
    return (
      <div className={styles.containerNews}>
        <div className={styles.header}>
          <h1 className={styles.titleNews}>Kegiatan</h1>
        </div>
        <div className={styles.emptyContainer}>
          <p>Belum ada artikel tersedia.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.containerNews}>
      <div className={styles.header}>
        <h1 className={styles.titleNews}>Kegiatan</h1>
        <a href="/kegiatan" className={styles.readMore}>
          Baca selengkapnya →
        </a>
      </div>

      <div className={styles.newsGrid}>
        {/* Featured Article */}
        <div
          className={styles.featuredArticle}
          onClick={() => handleCardClick(newsItems[0].id)}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.featuredCard}>
            <div className={styles.featuredImageContainer}>
              <img
                src={newsItems[0].image}
                alt={newsItems[0].title}
                className={styles.featuredImage}
                onError={(e) => {
                  e.target.src = "https://picsum.photos/id/1011/800/500";
                }}
              />
            </div>
            <div className={styles.featuredContent}>
              <h2 className={styles.featuredTitle}>{newsItems[0].title}</h2>
              <p className={styles.featuredPreview}>{newsItems[0].preview}</p>
              <p className={styles.featuredDate}>{newsItems[0].date}</p>
            </div>
          </div>
        </div>

        {/* Regular Articles Grid */}
        <div className={styles.regularGrid}>
          {newsItems.slice(1, 5).map((item) => (
            <div
              key={item.id}
              className={styles.regularCard}
              onClick={() => handleCardClick(item.id)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.regularImageContainer}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.regularImage}
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/id/${
                      1015 + item.id
                    }/800/500`;
                  }}
                />
              </div>
              <div className={styles.regularContent}>
                <h3 className={styles.regularTitle}>{item.title}</h3>
                <p className={styles.regularDate}>{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
