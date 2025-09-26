import React, { useState } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeatureSection";
import SectorsSection from "./SectorSection";
import RequirementsSection from "./RequirementsSection";
import HeaderAbout from "../About/HeaderAbout";
import Header from "./Header";
import styles from "./Gabung.module.css";
import Gabung from "./Gabung";

function GabungPage() {
  return (
    <>
      <div className={styles.containerAll}>
        <HeroSection />
        <FeaturesSection />
        <SectorsSection />
        <RequirementsSection />
        <Gabung />
      </div>
    </>
  );
}

export default GabungPage;
