import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./KegiatanHero.module.css";

const KegiatanHero = ({
  activities = [],
  newestActivities = [],
  loading = false,
  error = null,
}) => {
  const navigate = useNavigate();

  // Get the newest/featured activity (first item from newestActivities or activities)
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

  // Default fallback data if no activity is available
  const defaultActivity = {
    title: "Judul Artikel Di Sini Maks. 3 Baris, tidak lebih dari 3 baris.",
    date: "13 Desember 2024",
    image:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    preview: "",
  };

  const displayActivity = featuredActivity || defaultActivity;

  // Format date if needed (assuming date comes in a specific format)
  const formatDate = (dateString) => {
    if (!dateString) return "13 Desember 2024";

    // If date is already in the desired format, return as is
    if (
      (typeof dateString === "string" && dateString.includes("Juli")) ||
      dateString.includes("Desember")
    ) {
      return dateString;
    }

    // Otherwise, try to format it
    try {
      const date = new Date(dateString);
      const months = [
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
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    } catch (e) {
      return dateString;
    }
  };

  // Truncate title if it's too long (optional)
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
              <span className={styles.dateBadge}>Memuat...</span>
              <span className={styles.categoryBadge}>Kegiatan</span>
            </div>
            <h1 className={styles.heroTitle}>Memuat kegiatan terbaru...</h1>
            <button className={styles.heroCta} disabled>
              Memuat →
            </button>
          </div>
          <div className={styles.heroImageCol}>
            <div className={styles.heroImagePlaceholder}>
              <p>Memuat gambar...</p>
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
            <span className={styles.categoryBadge}>Kegiatan</span>
            {error && <span className={styles.errorBadge}>Fallback Data</span>}
          </div>

          <h1 className={styles.heroTitle}>
            {truncateTitle(displayActivity.title)}
          </h1>

          {displayActivity.preview && (
            <p className={styles.heroPreview}>{displayActivity.preview}</p>
          )}

          <button
            className={styles.heroCta}
            onClick={handleReadMore}
            disabled={!featuredActivity || !featuredActivity.id}
          >
            Baca selengkapnya →
          </button>
        </div>

        {/* Right: Image */}
        <div className={styles.heroImageCol}>
          <img
            src={displayActivity.image || defaultActivity.image}
            alt={displayActivity.title || "AEML Activities"}
            className={styles.heroImage}
            onError={(e) => {
              // Fallback image if the original fails to load
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
