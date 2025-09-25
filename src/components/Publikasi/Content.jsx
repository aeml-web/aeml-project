import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./publikasi.module.css";
import { getPublications } from "../../helpers/apiService";
import { Download } from "lucide-react";

export default function Content() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Pilih kategori");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/publikasi/${id}`);
  };

  const handleDownloadClick = (e, pub) => {
    e.stopPropagation();
    if (pub.downloadUrl) {
      window.open(pub.downloadUrl, "_blank");
    } else {
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

  // Pagination logic
  const totalPages = Math.ceil(publications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPublications = publications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className={styles.container}>
      <div className={styles.containerContentPublikasi}>
        <div className={styles.containerContent}>
          {currentPublications.map((pub) => (
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
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
              <div className={styles.meta}>
                <span
                  className={`${styles.badge} ${
                    pub.type === "Research"
                      ? styles.research
                      : styles.publication
                  }`}
                >
                  {pub.type}
                </span>
                <h3 className={styles.title}>{pub.title}</h3>
                <div className={styles.bottomCard}>
                  <p className={styles.date}>
                    {" "}
                    {new Date(pub.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <button
                    onClick={(e) => handleDownloadClick(e, pub)}
                    className={styles.downloadButton}
                  >
                    <Download size={14} style={{ marginRight: "8px" }} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination (UI unchanged, just wired up) */}
      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          <svg
            width="12"
            height="19"
            viewBox="0 0 12 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.24081 0.830078L11.3359 2.9252L4.5305 9.7455L11.3359 16.5658L9.24081 18.6609L0.325391 9.7455L9.24081 0.830078Z"
              fill="#B3B3B3"
            />
          </svg>
        </button>

        <h4 className={styles.total}>
          {currentPage} dari {totalPages}
        </h4>

        <button
          className={styles.pageBtn}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <svg
            width="12"
            height="19"
            viewBox="0 0 12 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.75919 0.830078L0.664062 2.9252L7.4695 9.7455L0.664062 16.5658L2.75919 18.6609L11.6746 9.7455L2.75919 0.830078Z"
              fill="#181818"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
