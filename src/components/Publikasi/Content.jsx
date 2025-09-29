import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./publikasi.module.css";
import { getPublications } from "../../helpers/apiService";
import { Download } from "lucide-react";
import tagsData from "../../assets/tagsPlaceholder.json";

export default function Content() {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Adjust as needed

  // Get categories from tags JSON file
  const categories = ["Semua Kategori", ...Object.values(tagsData.TAGS)];

  const navigate = useNavigate();

  // Handle category selection with proper dropdown toggle
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Toggle dropdown on click
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Filter publications based on search query and selected category
  const filterPublications = () => {
    console.log("Filtering with:", { selectedCategory, searchQuery });
    console.log("Available publications:", publications);
    console.log("Tags data:", tagsData.TAGS);

    let filtered = [...publications];

    // Filter by category
    if (selectedCategory !== "Semua Kategori") {
      console.log("Filtering by category:", selectedCategory);

      filtered = filtered.filter((pub) => {
        // Only check tags field (ignore type field for filtering)
        let matches = false;

        if (pub.tags && typeof pub.tags === "string" && pub.tags !== "null") {
          const pubTagLower = pub.tags.toLowerCase();
          const selectedCategoryLower = selectedCategory.toLowerCase();

          // Direct match
          if (pubTagLower === selectedCategoryLower) {
            matches = true;
          }

          // Check if publication tag matches the selected category from tagsData
          if (!matches) {
            Object.entries(tagsData.TAGS).forEach(([key, value]) => {
              if (
                pubTagLower === key.toLowerCase() &&
                value.toLowerCase() === selectedCategoryLower
              ) {
                matches = true;
              }
            });
          }
        }

        console.log(
          `Publication "${pub.title}": tags="${pub.tags}", selectedCategory="${selectedCategory}", matches=${matches}`
        );

        return matches;
      });

      console.log("Filtered results:", filtered);
    }

    // Filter by search query (title search)
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (pub) =>
          pub.title &&
          pub.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPublications(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle search
  const handleSearch = () => {
    filterPublications();
  };

  // Handle real-time search as user types
  useEffect(() => {
    filterPublications();
  }, [searchQuery, selectedCategory, publications]);

  const handleCardClick = (id) => {
    navigate(`/publikasi/${id}`);
  };

  const handleDownloadClick = (e, pub) => {
    e.stopPropagation(); // Prevent card click when download button is clicked

    // Handle download logic here - fixed to use linkDownload
    if (pub.linkDownload) {
      window.open(pub.linkDownload, "_blank");
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
        console.log(222, data);
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPublications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
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
            {/* Category Dropdown - Fixed to be clickable */}
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

            {/* Search Input - Now searches by title */}
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

        {/* Show filtered results count */}
        {/* {(searchQuery || selectedCategory !== "Semua Kategori") && (
          <div className={styles.resultsInfo}>
            Menampilkan {filteredPublications.length} dari {publications.length}{" "}
            publikasi
            {searchQuery && ` untuk "${searchQuery}"`}
            {selectedCategory !== "Semua Kategori" &&
              ` dalam kategori "${selectedCategory}"`}
          </div>
        )} */}

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
                    e.target.src = "/placeholder-image.jpg"; // Fallback image
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
                      {pub.tags}
                    </span>
                  )}
                  <h3 className={styles.title}>{pub.title}</h3>
                  <div className={styles.bottomCard}>
                    <p className={styles.date}>
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
            ))
          ) : (
            <div className={styles.noResults}>
              Tidak ada publikasi yang ditemukan
              {searchQuery && ` untuk "${searchQuery}"`}
              {selectedCategory !== "Semua Kategori" &&
                ` dalam kategori "${selectedCategory}"`}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Pagination - Only show if there are multiple pages */}
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
          {currentPage} dari {totalPages}
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
    </div>
  );
}
