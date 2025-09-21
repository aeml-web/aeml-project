// SectorsSection.jsx
import React from "react";
import styles from "./Gabung.module.css";
import battery from "../../assets/battery.png";
import charging from "../../assets/charging.png";
import energy from "../../assets/energy-banner.png";
import ev from "../../assets/ev-manufacture.png";
import finance from "../../assets/finance-banner.png";
import ride from "../../assets/ride-hiling.png";

const SectorsSection = () => {
  const sectors = [
    {
      title: "Battery",
      description:
        "Sektor Charging and Battery swapping berisi penyediaan stasiun baik berupa Maksimal 2 kolom singkat saja",
      image: battery,
      className: styles.battery,
    },
    {
      title: "Charging & Battery Swapping",
      description: "Investment and market development solutions",
      image: charging,
      className: styles.charging,
    },
    {
      title: "Energy",
      description: "Clean energy solutions and renewable power generation",
      image: energy,
      className: styles.energy,
    },
    {
      title: "EV Manufacturer",
      description: "Electric vehicle production and manufacturing",
      image: ev,
      className: styles.evManufacturer,
    },
    {
      title: "Ride Hailing & Fleet Operator",
      description: "Transportation services and fleet management",
      image: ride,
      className: styles.rideHailing,
    },
    {
      title: "Financial & Market Developer",
      description: "Investment and market development solutions",
      image: finance,
      className: styles.financial,
    },
  ];

  return (
    <section className={styles.sectors}>
      <div className={styles.containerSector}>
        <div className={styles.sectorHeader}>
          <h2 className={styles.sectorTitle}>Sektor AEML</h2>
          <p className={styles.sectorSubtitle}>
            Gabung ke dalam ekosistem yang mendukung percepatan pengembangan
            ekosistem mobilitas listrik di Indonesia hingga mandunia.
          </p>
        </div>

        <div className={styles.sectorsGrid}>
          {sectors.map((sector, index) => (
            <div
              key={index}
              className={`${styles.sectorCard} ${styles[sector.className]}`}
            >
              <div className={styles.sectorImage}>
                <img src={sector.image} alt={sector.title} />
                <div className={styles.sectorOverlay}>
                  <h3 className={styles.sectorCardTitle}>{sector.title}</h3>
                  <h5 className={styles.hoverTitle}>{sector.description}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsSection;
