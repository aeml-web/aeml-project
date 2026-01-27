import React, { useState, useEffect } from "react";
import KegiatanHero from "./KegiatanHero";
import styles from "./KegiatanPages.module.css";
import NewsGrid from "./NewsGrid";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion } from "framer-motion";

const KegiatanPages = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        // Query Firestore untuk mengambil dokumen dengan type "kegiatan"
        const q = query(
          collection(db, "AemlPrograms"),
          where("type", "==", "kegiatan"),
        );

        const querySnapshot = await getDocs(q);

        const activitiesData = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();

            // Format tanggal
            let formattedDate = "";
            if (data.createdAt) {
              const date = data.createdAt.toDate();
              formattedDate = date.toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            }

            return {
              id: data.id || doc.id,
              title: data.title || "Untitled",
              subtitle: data.subtitle || "",
              preview: data.subtitle || "",
              date: formattedDate,
              image:
                data.images && data.images.length > 0
                  ? data.images[0]
                  : "https://picsum.photos/id/1011/800/500",
              tags: data.tags || "",
              linkDownload: data.linkDownload || "",
              body: data.body || null,
              type: data.type || "",
              isDeleted: data.isDeleted || false,
              isShowed: data.isShowed !== false,
              createdAt: data.createdAt || null,
            };
          })
          // Filter di client-side
          .filter((item) => !item.isDeleted && item.isShowed)
          // Sort berdasarkan createdAt
          .sort((a, b) => {
            if (!a.createdAt || !b.createdAt) return 0;
            return b.createdAt.toDate() - a.createdAt.toDate();
          });

        setActivities(activitiesData);
      } catch (err) {
        setError("Failed to load activities");
        console.error("Error loading activities:", err);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  // Helper function to get the newest activities
  const getNewestActivities = (items, count = 3) => {
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
            <p>Gagal memuat kegiatan.</p>
          </div>
        </div>
      );
    }

    return <div className={styles.content}></div>;
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-9"
    >
      <div className={styles.kegiatanPages}>
        <KegiatanHero
          activities={activities}
          newestActivities={getNewestActivities(activities)}
          loading={loading}
          error={error}
        />

        {renderContent()}

        <NewsGrid items={activities} loading={loading} />
      </div>
    </motion.div>
  );
};

export default KegiatanPages;
