import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./publikasi.module.css";
import { getPublications } from "../../helpers/apiService";
import { Download } from "lucide-react";
import tagsData from "../../assets/tagsPlaceholder.json";

export default function Content() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    currentLang === "id" ? "Semua Kategori" : "All Categories"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Translate categories using i18n
  const translateCategory = (category) => {
    const categoryKey = category.toLowerCase();
    const categoryMap = {
      edaran: t("publications.circulars"),
      laporan: t("publications.reports"),
      peraturan: t("publications.regulations"),
    };
    return categoryMap[categoryKey] || category;
  };

  // Get categories with translation
  const categories = [
    currentLang === "id" ? "Semua Kategori" : "All Categories",
    t("publications.circulars"),
    t("publications.reports"),
    t("publications.regulations"),
  ];

  const navigate = useNavigate();

  // Update selected category when language changes
  useEffect(() => {
    if (
      selectedCategory === "Semua Kategori" ||
      selectedCategory === "All Categories"
    ) {
      setSelectedCategory(
        currentLang === "id" ? "Semua Kategori" : "All Categories"
      );
    }
  }, [currentLang]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Filter publications
  const filterPublications = () => {
    let filtered = [...publications];

    // Filter by category
    const allCategoriesText =
      currentLang === "id" ? "Semua Kategori" : "All Categories";
    if (selectedCategory !== allCategoriesText) {
      filtered = filtered.filter((pub) => {
        let matches = false;

        if (pub.tags && typeof pub.tags === "string" && pub.tags !== "null") {
          const pubTagLower = pub.tags.toLowerCase();
          const selectedCategoryLower = selectedCategory.toLowerCase();

          // Direct match
          if (pubTagLower === selectedCategoryLower) {
            matches = true;
          }

          // Check against original Indonesian tags
          if (!matches) {
            const reverseCategoryMap = {
              circulars: "edaran",
              reports: "laporan",
              regulations: "peraturan",
            };
            const mappedCategory =
              reverseCategoryMap[selectedCategoryLower] ||
              selectedCategoryLower;
            if (pubTagLower === mappedCategory) {
              matches = true;
            }
          }

          // Check tagsData
          if (!matches) {
            Object.entries(tagsData.PUBLICATION_TAGS).forEach(
              ([key, value]) => {
                if (
                  pubTagLower === key.toLowerCase() ||
                  pubTagLower === value.toLowerCase()
                ) {
                  const translatedValue =
                    translateCategory(value).toLowerCase();
                  if (translatedValue === selectedCategoryLower) {
                    matches = true;
                  }
                }
              }
            );
          }
        }

        return matches;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (pub) =>
          pub.title &&
          pub.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPublications(filtered);
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = () => {
    filterPublications();
  };

  // Real-time filtering
  useEffect(() => {
    filterPublications();
  }, [searchQuery, selectedCategory, publications]);

  const handleCardClick = (id) => {
    navigate(`/publikasi/${id}`);
  };

  const handleDownloadClick = (e, pub) => {
    e.stopPropagation();

    if (pub.linkDownload) {
      window.open(pub.linkDownload, "_blank");
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
        setFilteredPublications(data);
      } catch (err) {
        setError("Failed to load publications. Please try again later.");
        console.error("Error fetching publications:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, []);

  // Format date based on language
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return dateString;
      }

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
        return `${monthsID[date.getMonth()]} ${date.getFullYear()}`;
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
        return `${monthsEN[date.getMonth()]} ${date.getFullYear()}`;
      }
    } catch (e) {
      return dateString;
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPublications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{t("home.load")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{t("home.failedLoad")}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryBtn}
          >
            {currentLang === "id" ? "Coba Lagi" : "Retry"}
          </button>
        </div>
      </div>
    );
  }

  if (!publications || publications.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          {currentLang === "id"
            ? "Tidak ada publikasi yang ditemukan."
            : "No publications found."}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerContentPublikasi}>
        <div className={styles.navigation}>
          <div className={styles.searchFilterContainer}>
            {/* Category Dropdown */}
            <div className={styles.categoryDropdown}>
              <button
                className={styles.categoryButton}
                onClick={toggleDropdown}
              >
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
                placeholder={
                  currentLang === "id"
                    ? "Cari publikasi"
                    : "Search publications"
                }
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
          {currentItems.length > 0 ? (
            currentItems.map((pub) => (
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
                  {pub.tags && pub.tags !== "null" && pub.tags !== null && (
                    <span
                      className={`${styles.badge} ${
                        pub.type === "Research"
                          ? styles.research
                          : styles.publication
                      }`}
                    >
                      {translateCategory(pub.tags)}
                    </span>
                  )}
                  <h3 className={styles.title}>{pub.title}</h3>
                  <div className={styles.bottomCard}>
                    <p className={styles.date}>{formatDate(pub.createdAt)}</p>
                    <button
                      onClick={(e) => handleCardClick(pub.id)}
                      className={styles.downloadButton}
                    >
                      <Download size={14} style={{ marginRight: "8px" }} />
                      {currentLang === "id" ? "Unduh" : "Download"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              {currentLang === "id"
                ? `Tidak ada publikasi yang ditemukan${
                    searchQuery ? ` untuk "${searchQuery}"` : ""
                  }${
                    selectedCategory !== "Semua Kategori"
                      ? ` dalam kategori "${selectedCategory}"`
                      : ""
                  }`
                : `No publications found${
                    searchQuery ? ` for "${searchQuery}"` : ""
                  }${
                    selectedCategory !== "All Categories"
                      ? ` in category "${selectedCategory}"`
                      : ""
                  }`}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={handlePrevPage}
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
                fill={currentPage === 1 ? "#B3B3B3" : "#181818"}
              />
            </svg>
          </button>

          <h4 className={styles.total}>
            {currentPage} {currentLang === "id" ? "dari" : "of"} {totalPages}
          </h4>

          <button
            className={styles.pageBtn}
            onClick={handleNextPage}
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
                fill={currentPage === totalPages ? "#B3B3B3" : "#181818"}
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
