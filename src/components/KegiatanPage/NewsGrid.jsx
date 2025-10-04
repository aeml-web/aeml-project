import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewsGrid.module.css";
import tagsData from "../../assets/tagsPlaceholder.json";

const NewsGrid = ({ items }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);
  const navigate = useNavigate();
  const tagsScrollRef = useRef(null);

  // Convert tags object to array for easier mapping
  const availableTags = tagsData?.KEGIATAN_TAGS
    ? Object.entries(tagsData.KEGIATAN_TAGS).map(([key, value]) => ({
        id: key, // e.g. "ARTIKEL"
        name: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        value: key.toUpperCase(),
      }))
    : [];

  // Filter items when tag changes
  useEffect(() => {
    if (!selectedTag) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => {
        if (!item.tags) return false;
        const itemTagUpper = item.tags.toUpperCase();
        const matches = itemTagUpper === selectedTag;
        return matches;
      });
      setFilteredItems(filtered);
    }
    setCurrentPage(1);
  }, [selectedTag, items]);
  // Calculate total pages based on filtered items
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Slice items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCardClick = (itemId) => {
    navigate(`/kegiatan/${itemId}`);
  };

  const handleTagClick = (tagValue, index) => {
    if (selectedTag === tagValue) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tagValue);

      // auto-scroll logic stays the same
      if (tagsScrollRef.current) {
        const tagWidth = 140;
        const containerWidth = tagsScrollRef.current.offsetWidth;
        const visibleTags = Math.floor(containerWidth / tagWidth);

        if (
          (index + 1) % visibleTags === 0 &&
          index < availableTags.length - 1
        ) {
          const scrollAmount = tagWidth * visibleTags;
          tagsScrollRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }
  };

  const clearTag = () => {
    setSelectedTag(null);
  };

  return (
    <div className={styles.containerNews}>
      <div className={styles.header}>
        {/* Title and Tags in same row */}
        <div className={styles.headerTop}>
          <h1 className={styles.titleNews}>Kegiatan AEML</h1>

          {/* Tags Filter - Limited width with auto-scroll */}
          <div className={styles.tagsScrollContainer} ref={tagsScrollRef}>
            <div className={styles.tagsContainer}>
              {availableTags.map((tag, index) => (
                <div
                  key={tag.id}
                  className={`${styles.tagItem} ${
                    selectedTag === tag.id
                      ? styles.tagActive
                      : styles.tagInactive
                  }`}
                  onClick={() => handleTagClick(tag.id, index)}
                >
                  <h4 className={styles.textTag}>{tag.name}</h4>
                  {selectedTag === tag.id && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.66683 1.27398L8.72683 0.333984L5.00016 4.06065L1.2735 0.333984L0.333496 1.27398L4.06016 5.00065L0.333496 8.72732L1.2735 9.66732L5.00016 5.94065L8.72683 9.66732L9.66683 8.72732L5.94016 5.00065L9.66683 1.27398Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      {selectedTag && (
        <div className={styles.resultsInfo}>
          <p>
            Showing {filteredItems.length} results for "
            {availableTags.find((t) => t.id === selectedTag)?.name}"
          </p>
        </div>
      )}

      {/* Grid */}
      <div className={styles.regularGrid}>
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.id}
              className={styles.regularCard}
              onClick={() => handleCardClick(item.id)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.regularImageContainer}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.regularImage}
                />
              </div>
              <div className={styles.regularContent}>
                <h3 className={styles.regularTitle}>{item.title}</h3>
                <div className={styles.contentbottom}>
                  <p className={styles.regularDate}>{item.date}</p>
                  {/* Display item tags */}
                  {item.tags && (
                    <div className={styles.itemTags}>
                      <span className={styles.itemTag}>
                        {tagsData.KEGIATAN_TAGS[item.tags.toUpperCase()] ||
                          item.tags.charAt(0).toUpperCase() +
                            item.tags.slice(1).toLowerCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No items found for the selected tags.</p>
          </div>
        )}
      </div>

      {/* Pagination - only show if there are results */}
      {filteredItems.length > 0 && totalPages >= 1 && (
        <div className={styles.pagination}>
          {/* Prev button */}
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

          {/* Current page info */}
          <h4 className={styles.total}>
            {currentPage} dari {totalPages}
          </h4>

          {/* Next button */}
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
      )}
    </div>
  );
};

export default NewsGrid;
