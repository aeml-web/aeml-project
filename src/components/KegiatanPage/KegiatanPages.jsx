import React, { useState, useEffect } from "react";
import KegiatanHero from "./KegiatanHero";
import styles from "./KegiatanPages.module.css";
import NewsGrid from "./NewsGrid";
import { getArticles } from "../../helpers/apiService";

const KegiatanPages = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data in case API fails
  const sampleActivities = [
    {
      id: 1,
      title: "Judul 1",
      date: "5 Juli 2023",
      image: "https://picsum.photos/id/1011/400/300",
    },
    {
      id: 2,
      title: "Judul 2",
      date: "5 Juli 2023",
      image: "https://picsum.photos/id/1015/400/300",
    },
    {
      id: 3,
      title: "Judul 3",
      date: "5 Juli 2023",
      image: "https://picsum.photos/id/1016/400/300",
    },
    {
      id: 4,
      title: "Judul 4",
      date: "5 Juli 2023",
      image: "https://picsum.photos/id/1025/400/300",
    },
    {
      id: 5,
      title: "Judul 5",
      date: "5 Juli 2023",
      image: "https://picsum.photos/id/1027/400/300",
    },
    {
      id: 6,
      title: "Judul 6",
      date: "5 Juli 2023",
      image: "https://picsum.photos/id/1031/400/300",
    },
    {
      id: 7,
      title: "Judul 7",
      date: "5 Juli 2023",
      image: "https://picsum.photos/id/1033/400/300",
    },
    {
      id: 8,
      title: "Judul 8",
      date: "5 Juli 2023",
      image: "https://picsum.photos/id/1035/400/300",
    },
    {
      id: 9,
      title: "Judul 9",
      date: "5 Juli 2023",
      image: "https://picsum.photos/id/1037/400/300",
    },
  ];

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        const articlesData = await getArticles();
        console.log("Fetched articles data:", articlesData);
        // Transform articles data to match the expected format for NewsGrid
        const transformedActivities = articlesData.map((article) => ({
          id: article.id,
          title: article.title,
          date: article.date,
          image: article.image,
          preview: article.preview,
          body: article.body,
          type: article.type,
          linkDownload: article.linkDownload,
          tags: article.tags,
        }));

        setActivities(transformedActivities);
      } catch (err) {
        setError("Failed to load activities");
        console.error("Error loading activities:", err);
        // Use fallback data if API fails
        setActivities(sampleActivities);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  // Get the data to pass to components
  const currentActivities =
    activities.length > 0 ? activities : sampleActivities;

  // Helper function to get the newest activities (you might want to sort by date)
  const getNewestActivities = (items, count = 3) => {
    // If your data has proper date format, you can sort by date
    // For now, we'll just take the first few items
    return items.slice(0, count);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Kegiatan AEML</h2>
          <div className={styles.loadingContainer}>
            <p>Memuat kegiatan...</p>
          </div>
        </div>
      );
    }

    if (error && activities.length === 0) {
      return (
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Kegiatan AEML</h2>
          <div className={styles.errorContainer}>
            <p>Gagal memuat kegiatan. Menampilkan data contoh.</p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.content}>
        {error && (
          <div className={styles.warningMessage}>
            <p>⚠️ Menggunakan data fallback karena gagal memuat dari server</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.kegiatanPages}>
      <KegiatanHero
        activities={currentActivities}
        newestActivities={getNewestActivities(currentActivities)}
        loading={loading}
        error={error}
      />

      {renderContent()}

      <NewsGrid items={currentActivities} loading={loading} />
    </div>
  );
};

export default KegiatanPages;
