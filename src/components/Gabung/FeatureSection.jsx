import React, { useEffect, useRef, useState } from "react";
import styles from "./Gabung.module.css";
import "animate.css";
import IconCircle from "./IconCircle";

const FeatureSection = () => {
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowContent(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 50% of section is visible (lebih dalam)
        rootMargin: "-100px 0px", // Butuh scroll lebih dalam lagi
      }
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

  return (
    <div
      id="pelajari-section"
      className={`${styles.containerFeature} ${
        showContent ? "animate__animated animate__fadeInUp animate__slow" : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.imageIcon}>
        <IconCircle />
      </div>

      <div className={styles.textDesc}>
        <p>
          Asosiasi Ekosistem Mobilitas Listrik (AEML) merupakan forum bagi para
          pelopor kendaraan listrik untuk mengkatalisasi pengembangan ekosistem
          mobilitas listrik kelas dunia di Indonesia. <br></br> <br></br> Kami
          adalah badan industri, thought leaders, dan advokat kebijakan publik
          untuk ekosistem kendaraan listrik di Indonesia.
        </p>
      </div>
    </div>
  );
};

export default FeatureSection;
