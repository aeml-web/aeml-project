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

  const categories = [
    "Semua Kategori",
    "Artikel",
    "Berita",
    "Laporan",
    "Panduan",
    "Penelitian",
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    console.log(
      "Searching for:",
      searchQuery,
      "in category:",
      selectedCategory
    );
  };

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/publikasi/${id}`);
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
      <div className={styles.containerContentPublikasi}>
        <div className={styles.navigation}>
          <div className={styles.searchFilterContainer}>
            {/* Category Dropdown */}
            <div
              className={styles.categoryDropdown}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className={styles.categoryButton}>
                {selectedCategory}
                <svg
                  width="8"
                  height="6"
                  viewBox="0 0 8 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.dropdownArrow} ${
                    isDropdownOpen ? styles.rotated : ""
                  }`}
                >
                  <path
                    d="M7.06 0.530273L4 3.58361L0.94 0.530273L0 1.47027L4 5.47027L8 1.47027L7.06 0.530273Z"
                    fill="#9ca3af"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className={`${styles.dropdownItem} ${
                        selectedCategory === category ? styles.active : ""
                      }`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Cari publikasi"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className={styles.searchButton} onClick={handleSearch}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.50326 7.50326H7.97659L7.78992 7.32326C8.44326 6.56326 8.83659 5.57659 8.83659 4.50326C8.83659 2.10992 6.89659 0.169922 4.50326 0.169922C2.10992 0.169922 0.169922 2.10992 0.169922 4.50326C0.169922 6.89659 2.10992 8.83659 4.50326 8.83659C5.57659 8.83659 6.56326 8.44326 7.32326 7.78992L7.50326 7.97659V8.50326L10.8366 11.8299L11.8299 10.8366L8.50326 7.50326ZM4.50326 7.50326C2.84326 7.50326 1.50326 6.16326 1.50326 4.50326C1.50326 2.84326 2.84326 1.50326 4.50326 1.50326C6.16326 1.50326 7.50326 2.84326 7.50326 4.50326C7.50326 6.16326 6.16326 7.50326 4.50326 7.50326Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.containerContent}>
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
                    pub.type === "Research"
                      ? styles.research
                      : styles.publication
                  }`}
                >
                  {pub.type}
                </span>
                <h3 className={styles.title}>{pub.title}</h3>
                <div className={styles.bottomCard}>
                  <p className={styles.date}>{pub.date}</p>
                  <button
                    onClick={handleDownloadClick}
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
      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          // onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          // disabled={currentPage === 1}
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

        {/* {[...Array(totalPages)].map((_, i) => ( */}
        <h4 className={styles.total}> 1 dari 5 </h4>

        <button
          className={styles.pageBtn}
          // onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          // disabled={currentPage === totalPages}
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
