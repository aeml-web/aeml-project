import React, { useEffect, useRef, useState } from "react";
import styles from "./Gabung.module.css";
import orbit from "../../assets/orbit.png";
import battery from "../../assets/baterry.png";
import ev from "../../assets/ev.png";
import ride from "../../assets/ride.png";
import finance from "../../assets/finance.png";
import energi from "../../assets/energy.png";
import swap from "../../assets/swap.png";
import banner from "../../assets/banner.png";
import "animate.css";

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

  const ecosystemItems = [
    {
      image: battery,
      title: "Battery",
      angle: 0,
    },
    {
      image: swap,
      title: "Charging & Battery Swapping",
      angle: 60,
    },
    {
      image: ev,
      title: "EV Manufacturer",
      angle: 120,
    },
    {
      image: ride,
      title: "Ride Hailing & Fleet Operator",
      angle: 180,
    },
    {
      image: finance,
      title: "Financier & Market Developer",
      angle: 240,
    },
    {
      image: energi,
      title: "Energy",
      angle: 300,
    },
  ];

  return (
    <div
      id="pelajari-section"
      className={`${styles.containerFeature} ${
        showContent ? "animate__animated animate__fadeInUp animate__slow" : ""
      }`}
      ref={sectionRef}
    >
      <div className={styles.imageIcon}>
        <img src={banner} className={styles.imageBanner}></img>
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
