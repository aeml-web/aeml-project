import React from "react";
import styles from "./Tentang.module.css";
import banner from "../../assets/banner.png";

const Tentang = () => {
  const categories = [
    { icon: "⚡", title: "Energy", angle: 0 },
    { icon: "🔋", title: "Battery", angle: 72 },
    { icon: "🔌", title: "Charging &\nBattery Swapping", angle: 144 },
    { icon: "🏍️", title: "EV Manufacturer", angle: 216 },
    { icon: "📱", title: "Ride Hailing &\nFleet Operator", angle: 288 },
    { icon: "📊", title: "Financier &\nMarket Developer", angle: 360 },
  ];

  return (
    <section className={styles.sektorSection}>
      <div className={styles.contentWrapper}>
        {/* Left side - Animated categories */}
        <div className={styles.sektorContainer}>
          {/* Center logo */}
          <div className={styles.centerLogo}>
            <img src={banner} alt="AEML" className={styles.logo} />
          </div>

          {/* Orbiting categories */}
          <div className={styles.orbitContainer}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={styles.categoryItem}
                style={{
                  transform: `rotate(${category.angle}deg) translate(250px) rotate(-${category.angle}deg)`,
                }}
              >
                <div className={styles.categoryIcon}>
                  {/* Replace with your actual icons */}
                  <span style={{ fontSize: "2rem" }}>{category.icon}</span>
                </div>
                <p className={styles.categoryText}>{category.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Text content */}
        <div className={styles.textContent}>
          <p className={styles.description}>
            Asosiasi Ekosistem Mobilitas Listrik (AEML) merupakan forum bagi
            para pelopor kendaraan listrik untuk mengkatalisasi pengembangan
            ekosistem mobilitas listrik kelas dunia di Indonesia.
          </p>
          <p className={styles.description}>
            Kami adalah badan industri, thought leaders, dan advokat kebijakan
            publik untuk ekosistem kendaraan listrik di Indonesia.
          </p>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Sektor AEML</h2>
    </section>
  );
};

export default Tentang;
