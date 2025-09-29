import React, { useEffect, useRef, useState } from "react";
import styles from "./homepage.module.css";
import govEkonomi from "../../assets/logos-gov/ekonomi.png";
import govInvest from "../../assets/logos-gov/invest.png";
import industri from "../../assets/logos-gov/industri.png";
import energi from "../../assets/logos-gov/energi.png";
import lh from "../../assets/logos-gov/lh.png";
import transportasi from "../../assets/logos-gov/transport.png";
import dki from "../../assets/logos-gov/dki.png";

import image1 from "../../assets/logos-gov/image1.png";
import image2 from "../../assets/logos-gov/image2.png";
import image3 from "../../assets/logos-gov/image3.png";
import image4 from "../../assets/logos-gov/image4.png";
import image5 from "../../assets/logos-gov/image5.png";
import image6 from "../../assets/logos-gov/image6.png";

import "animate.css";

const Mitra = () => {
  const [showFirstSection, setShowFirstSection] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false);
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);

  useEffect(() => {
    const firstObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowFirstSection(true);
            // Trigger second section after delay
            setTimeout(() => {
              setShowSecondSection(true);
            }, 600);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (firstSectionRef.current) {
      firstObserver.observe(firstSectionRef.current);
    }

    return () => {
      if (firstSectionRef.current) {
        firstObserver.unobserve(firstSectionRef.current);
      }
    };
  }, []);

  const governmentPartners = [
    {
      id: 1,
      name: "Coordinating Ministry of Economics Affairs",
      logo: govEkonomi,
      alt: "Coordinating Ministry of Economics Affairs of the Republic of Indonesia",
    },
    {
      id: 2,
      name: "Coordinating Ministry of Investment & Maritime Affairs",
      logo: govInvest,
      alt: "Coordinating Ministry of Investment & Maritime Affairs of the Republic of Indonesia",
    },
    {
      id: 3,
      name: "Ministry of Industry",
      logo: industri,
      alt: "Ministry of Industry of the Republic of Indonesia",
    },
    {
      id: 4,
      name: "Ministry of Energy & Mineral Resources",
      logo: energi,
      alt: "Ministry of Energy & Mineral Resources of the Republic of Indonesia",
    },
    {
      id: 5,
      name: "Ministry of Environment",
      logo: lh,
      alt: "Ministry of Environment of the Republic of Indonesia",
    },
    {
      id: 6,
      name: "Ministry of Transportation",
      logo: transportasi,
      alt: "Ministry of Transportation of the Republic of Indonesia",
    },
    {
      id: 7,
      name: "Jakarta Provincial Government",
      logo: dki,
      alt: "Jakarta Provincial Government",
    },
  ];

  const developmentPartners = [
    {
      id: 1,
      name: "ClimateWorks Foundation",
      logo: image1,
      alt: "ClimateWorks Foundation",
    },
    {
      id: 2,
      name: "IFC International Finance Corporation",
      logo: image2,
      alt: "IFC International Finance Corporation World Bank Group",
    },
    {
      id: 3,
      name: "Clean Air Asia",
      logo: image3,
      alt: "Clean Air Asia",
    },
    {
      id: 4,
      name: "RMI Energy Transformed",
      logo: image4,
      alt: "RMI Energy Transformed",
    },
    {
      id: 5,
      name: "Kearney",
      logo: image5,
      alt: "Kearney",
    },
    {
      id: 6,
      name: "IESR Institute for Essential Services Reform",
      logo: image6,
      alt: "IESR Institute for Essential Services Reform",
    },
  ];

  return (
    <div className={styles.partnersSection}>
      <div
        className={`${styles.partnerCategory} ${
          showFirstSection
            ? "animate__animated animate__fadeInUp animate_slow"
            : ""
        }`}
        ref={firstSectionRef}
      >
        <h2 className={styles.categoryTitle}>Mitra Pemerintahan AEML</h2>
        <div className={styles.partnersGrid}>
          {governmentPartners.map((partner) => (
            <div key={partner.id} className={styles.partnerCard}>
              <div className={styles.logoContainer}>
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  className={styles.partnerLogo}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles.partnerCategory} ${
          showSecondSection
            ? "animate__animated animate__fadeInUp animate_slower"
            : ""
        }`}
        ref={secondSectionRef}
      >
        <h2 className={styles.categoryTitle}>Mitra Pembangunan AEML</h2>
        <div className={styles.partnersGrid}>
          {developmentPartners.map((partner) => (
            <div key={partner.id} className={styles.partnerCard}>
              <img
                src={partner.logo}
                alt={partner.alt}
                className={styles.partnerLogo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mitra;
