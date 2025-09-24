import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewsGrid.module.css";

const NewsGrid = ({ items }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(items.length / itemsPerPage);

  // slice items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handleCardClick = (itemId) => {
    navigate(`/kegiatan/${itemId}`);
  };

  return (
    <div className={styles.containerNews}>
      <div className={styles.header}>
        <h1 className={styles.titleNews}>Kegiatan AEML</h1>
        <div className={styles.tag}>
          <div className={styles.tagItem}>
            <h4 className={styles.textTag}>Active Tag</h4>
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
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.regularGrid}>
        {currentItems.map((item) => (
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

        {[...Array(totalPages)].map((_, i) => (
          <h4
            key={i}
            className={`${styles.total} ${
              currentPage === i + 1 ? styles.activePage : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1} dari {totalPages}
          </h4>
        ))}

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
};

export default NewsGrid;
