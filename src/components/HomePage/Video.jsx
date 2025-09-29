import React, { useState, useEffect, useRef } from "react";
import styles from "./homepage.module.css";
import energi from "../../assets/event-video.mp4";
import thumbnail from "../../assets/thumbnail.png";
import "animate.css";
import { useNavigate } from "react-router-dom";

const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div
      className={`${styles.videoSection} ${
        isVisible ? "animate__animated animate__fadeInUp animate__slow" : ""
      }`}
      ref={sectionRef}
    >
      {/* Background decorative circles
      <div className={styles.backgroundShapes}>
        <div className={styles.circleLeft}></div>
        <div className={styles.circleRight}></div>
        <div className={styles.circleTopRight}></div>
      </div> */}

      <div className={styles.videoContainer}>
        <h2 className={styles.videoTitle}>Mengenal AEML lebih dekat</h2>

        <div className={styles.videoWrapper}>
          {!isPlaying ? (
            <div className={styles.videoThumbnail} onClick={handlePlayClick}>
              <img
                src={thumbnail}
                alt="Video thumbnail"
                className={styles.thumbnailImage}
              />
              <div className={styles.playButton}>
                <svg viewBox="0 0 24 24" className={styles.playIcon}>
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </div>
            </div>
          ) : (
            <div className={styles.videoPlayer}>
              <video
                controls
                autoPlay
                className={styles.video}
                poster="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop"
              >
                <source src={energi} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        <button
          className={styles.learnMoreButton}
          onClick={() => navigate("/about")}
        >
          Pelajari selengkapnya
          <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Video;
