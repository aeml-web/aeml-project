import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./KegiatanHero.module.css";

const KegiatanHero = ({
  activities = [],
  newestActivities = [],
  loading = false,
  error = null,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Get current language
  const currentLang = i18n.language;

  // Get the newest/featured activity
  const featuredActivity =
    newestActivities.length > 0
      ? newestActivities[0]
      : activities.length > 0
      ? activities[0]
      : null;

  // Handle navigation to detail page
  const handleReadMore = () => {
    if (featuredActivity && featuredActivity.id) {
      navigate(`/kegiatan/${featuredActivity.id}`);
    }
  };

  // Default fallback data
  const defaultActivity = {
    title: t("home.load"),
    date: currentLang === "id" ? "13 Desember 2024" : "December 13, 2024",
    image:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    preview: "",
  };

  const displayActivity = featuredActivity || defaultActivity;

  // Format date based on language
  const formatDate = (dateString) => {
    if (!dateString)
      return currentLang === "id" ? "13 Desember 2024" : "December 13, 2024";

    try {
      const date = new Date(dateString);

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

  // Truncate title if it's too long
  const truncateTitle = (title, maxLength = 80) => {
    if (!title) return defaultActivity.title;
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  const renderHeroContent = () => {
    if (loading) {
      return (
        <div className={styles.kegiatanHeroChild}>
          <div className={styles.heroContent}>
            <div className={styles.breadcrumbInfo}>
              <span className={styles.dateBadge}>{t("home.load")}</span>
              <span className={styles.categoryBadge}>
                {t("activities.activities")}
              </span>
            </div>
            <h1 className={styles.heroTitle}>{t("home.load")}</h1>
            <button className={styles.heroCta} disabled>
              {t("home.load")} →
            </button>
          </div>
          <div className={styles.heroImageCol}>
            <div className={styles.heroImagePlaceholder}>
              <p>{t("home.load")}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.kegiatanHeroChild}>
        {/* Left: Gradient + Text */}
        <div className={styles.heroContent}>
          <div className={styles.breadcrumbInfo}>
            <span className={styles.dateBadge}>
              {formatDate(displayActivity.date)}
            </span>
            <span className={styles.categoryBadge}>
              {t("activities.activities")}
            </span>
            {error && <span className={styles.errorBadge}>Fallback Data</span>}
          </div>

          <h1 className={styles.heroTitle}>
            {truncateTitle(displayActivity.title)}
          </h1>

          <button
            className={styles.heroCta}
            onClick={handleReadMore}
            disabled={!featuredActivity || !featuredActivity.id}
          >
            {currentLang === "id" ? "Baca selengkapnya" : "Read more"}
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
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* Right: Image */}
        <div className={styles.heroImageCol}>
          <img
            src={displayActivity.image || defaultActivity.image}
            alt={displayActivity.title || "AEML Activities"}
            className={styles.heroImage}
            onError={(e) => {
              e.target.src = defaultActivity.image;
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <section className={styles.kegiatanHero}>{renderHeroContent()}</section>
  );
};

export default KegiatanHero;
