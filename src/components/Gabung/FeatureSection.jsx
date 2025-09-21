import React from "react";
import styles from "./Gabung.module.css";
import orbit from "../../assets/orbit.png";
import battery from "../../assets/baterry.png";
import ev from "../../assets/ev.png";
import ride from "../../assets/ride.png";
import finance from "../../assets/finance.png";
import energi from "../../assets/energy.png";
import swap from "../../assets/swap.png";
import banner from "../../assets/banner.png";

const FeatureSection = () => {
  const ecosystemItems = [
    {
      image: battery,
      title: "Battery",
      angle: 0,
    },
    {
      image: swap,
      title: "Charging & Battery Swapping",
      angle: 60, // 360/6 = 60 degrees untuk 6 items
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
      title: "Energy", // Perbaiki title yang duplikat
      angle: 300,
    },
  ];

  return (
    <div className={styles.containerFeature}>
      <div className={styles.imageIcon}>
        <img src={banner} className={styles.imageBanner}></img>
      </div>
      {/* <div className={styles.ecosystemWrapper}>
        <div className={styles.centralLogo}>
          <img
            src={orbit}
            alt="Electric Mobility Ecosystem Logo"
            className={styles.mainLogo}
          />
        </div>

        {ecosystemItems.map((item, index) => (
          <div
            key={index}
            className={styles.iconOrbitContainer}
            style={{
              width: `${item.orbitRadius}rem`,
              height: `${item.orbitRadius}rem`,
              animationDuration: `${item.speed}s`,
            }}
          >
            <div
              className={styles.iconOrbitWrapper}
              style={{
                left: `${50 + 50 * Math.cos((item.angle * Math.PI) / 180)}%`,
                top: `${50 + 50 * Math.sin((item.angle * Math.PI) / 180)}%`,
                animationDuration: `${item.speed}s`,
              }}
            >
              <div className={styles.iconCard}>
                <div className={styles.iconContent}>
                  <div className={styles.iconElement}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.iconImage}
                    />
                  </div>
                  <h3 className={styles.iconTitle}>{item.title}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.particlesContainer}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className={styles.orbitalRing1}></div>
        <div className={styles.orbitalRing2}></div>

        <div className={styles.titleSection}></div>
      </div> */}
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
