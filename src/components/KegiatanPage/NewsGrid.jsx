import React, { useState } from "react";
import styles from "./NewsGrid.module.css";

const NewsGrid = ({ items }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  // slice items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.containerNews}>
      <div className={styles.header}>
        <h1 className={styles.titleNews}>Kegiatan AEML</h1>
      </div>

      {/* Grid */}
      <div className={styles.regularGrid}>
        {currentItems.map((item) => (
          <div key={item.id} className={styles.regularCard}>
            <div className={styles.regularImageContainer}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.regularImage}
              />
            </div>
            <div className={styles.regularContent}>
              <h3 className={styles.regularTitle}>{item.title}</h3>
              <p className={styles.regularDate}>{item.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ←
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`${styles.pageBtn} ${
              currentPage === i + 1 ? styles.activePage : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={styles.pageBtn}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default NewsGrid;
