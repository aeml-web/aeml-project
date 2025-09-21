// RequirementsSection.jsx
import React from "react";
import styles from "./Gabung.module.css";

const RequirementsSection = () => {
  const leftRequirements = [
    "syarat 1: Bisa dan dunia",
    "syarat 2: dapat dan dunia",
    "syarat 3: jaga bisa dan detail",
    "syarat 4: syarat lorem dolor sit amet",
    "syarat 5",
    "syarat 6",
  ];

  const rightRequirements = [
    "dokumen yang harus disediakan",
    "dokumen 2",
    "dokumen 3",
  ];

  return (
    <section className={styles.requirements}>
      <div className={styles.container}>
        <div className={styles.requirementsCard}>
          <h2 className={styles.title}>Persyaratan</h2>

          <div className={styles.requirementsGrid}>
            <div className={styles.leftColumn}>
              <ul className={styles.requirementsList}>
                {leftRequirements.map((requirement, index) => (
                  <li key={index} className={styles.requirementItem}>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.rightColumn}>
              <ul className={styles.requirementsList}>
                {rightRequirements.map((requirement, index) => (
                  <li key={index} className={styles.requirementItem}>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;
