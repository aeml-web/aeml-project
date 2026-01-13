import React, { useEffect, useRef, useState } from "react";
import styles from "./Gabung.module.css";
import "animate.css";
import IconCircle from "./IconCircle";
import { useTranslation, Trans } from "react-i18next";

const FeatureSection = () => {
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef(null);
  const { t, i18n } = useTranslation();

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
          {t("join.aboutAEML")}
          <br></br> <br></br> {t("join.aboutAEML2")}
        </p>
      </div>
    </div>
  );
};

export default FeatureSection;
