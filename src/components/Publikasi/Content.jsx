import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For React Router v6
// Alternative imports for different routing solutions:
// import { useRouter } from "next/router"; // For Next.js
// import { navigate } from "gatsby"; // For Gatsby
import styles from "./publikasi.module.css";
import { getPublications } from "../../helpers/apiService"; // adjust path if needed

export default function Content() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // React Router v6
  const navigate = useNavigate();

  // Alternative for Next.js:
  // const router = useRouter();

  const handleCardClick = (id) => {
    // React Router v6
    navigate(`/publikasi/${id}`);

    // Alternative approaches:
    // Next.js: router.push(`/publications/${id}`);
    // Gatsby: navigate(`/publications/${id}`);
    // Vanilla: window.location.href = `/publications/${id}`;
  };

  const handleDownloadClick = (e, pub) => {
    e.stopPropagation(); // Prevent card click when download button is clicked

    // Handle download logic here
    if (pub.downloadUrl) {
      window.open(pub.downloadUrl, "_blank");
    } else {
      // If you have a download API endpoint
      window.open(`/api/publications/${pub.id}/download`, "_blank");
    }
  };

  useEffect(() => {
    const loadPublications = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPublications();
        setPublications(data);
      } catch (err) {
        setError("Failed to load publications. Please try again later.");
        console.error("Error fetching publications:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading publications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryBtn}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!publications || publications.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No publications found.</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {publications.map((pub) => (
        <div
          key={pub.id}
          className={`${styles.card} ${styles.clickable}`}
          onClick={() => handleCardClick(pub.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCardClick(pub.id);
            }
          }}
        >
          <img
            src={pub.image}
            alt={pub.title}
            className={styles.image}
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg"; // Fallback image
            }}
          />
          <div className={styles.meta}>
            <span
              className={`${styles.badge} ${
                pub.type === "Research" ? styles.research : styles.publication
              }`}
            >
              {pub.type}
            </span>
            <h3 className={styles.title}>{pub.title}</h3>
            {pub.subtitle && <p className={styles.subtitle}>{pub.subtitle}</p>}
            <div className={styles.bottomCard}>
              <p className={styles.date}>{pub.date}</p>
              <button
                className={styles.downloadBtn}
                onClick={(e) => handleDownloadClick(e, pub)}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
