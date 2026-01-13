import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./homepage.module.css";
import { getPublications } from "../../helpers/apiService";
import { useTranslation, Trans } from "react-i18next";

const Publikasi = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const { t, i18n } = useTranslation();

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

  // Intersection Observer untuk animasi scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // Trigger ketika 10% element terlihat
      rootMargin: "0px 0px -50px 0px", // Trigger sedikit sebelum element masuk viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(entry.target);
          if (index !== -1 && !visibleCards.includes(index)) {
            setVisibleCards((prev) => [...prev, index]);
          }
        }
      });
    }, observerOptions);

    // Observe semua card
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [publications, visibleCards]);

  const handleGoToDetail = (id) => {
    navigate(`/publikasi/${id}`);
  };

  if (loading) {
    return (
      <div className={styles.publicationsSection}>
        <div className={styles.publicationsHeader}>
          <h2 className={styles.publicationsTitle}>
            {t("publications.title")}
          </h2>
        </div>
        <div className={styles.loadingContainer}>
          <p>{t("publications.load")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.publicationsSection}>
        <div className={styles.publicationsHeader}>
          <h2 className={styles.publicationsTitle}>
            {t("publications.title")}
          </h2>
        </div>
        <div className={styles.errorContainer}>
          <p>{t("publications.failedLoad")}</p>
        </div>
      </div>
    );
  }

  if (!publications.length) {
    return (
      <div className={styles.publicationsSection}>
        <div className={styles.publicationsHeader}>
          <h2 className={styles.publicationsTitle}>
            {t("publications.title")}
          </h2>
        </div>
        <div className={styles.emptyContainer}>
          <p>{t("publications.empty")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.publicationsSection}>
      <div className={styles.publicationsHeader}>
        <h2 className={styles.publicationsTitle}>{t("publications.title")}</h2>
        <a href="/publikasi" className={styles.viewAllLink}>
          <span>{t("home.readMore")}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "8px" }}
          >
            <path
              d="M12.5003 4.16699L11.3253 5.34199L15.142 9.16699H1.66699V10.8337H15.142L11.317 14.6587L12.5003 15.8337L18.3337 10.0003L12.5003 4.16699Z"
              fill="#0C4FD3"
            />
          </svg>
        </a>
      </div>

      <div className={styles.publicationsGrid}>
        {publications.slice(0, 3).map((pub, index) => (
          <div
            key={pub.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`${styles.publicationCard} ${
              visibleCards.includes(index) ? styles.fadeInUp : styles.hidden
            }`}
            style={{
              transitionDelay: `${index * 150}ms`, // Staggered animation
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleGoToDetail(pub.id);
            }}
          >
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
              </div>
            </div>

            <button
              className={styles.btnRead}
              onClick={(e) => {
                e.stopPropagation();
                handleGoToDetail(pub.id);
              }}
              title="Klik untuk membaca detail publikasi"
            >
              {t("publications.readPublication")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publikasi;
