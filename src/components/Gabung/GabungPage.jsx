import React, { useState } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeatureSection";
import SectorsSection from "./SectorSection";
import RequirementsSection from "./RequirementsSection";
import HeaderAbout from "../About/HeaderAbout";
import Header from "./Header";
import styles from "./Gabung.module.css";
import Gabung from "./Gabung";
import IconCircle from "./IconCircle";
import { motion } from "framer-motion";

function GabungPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-9"
    >
      <>
        <div className={styles.containerAll}>
          <HeroSection />
          <FeaturesSection />
          <SectorsSection />
          {/* <RequirementsSection /> */}
          <Gabung />
        </div>
      </>
    </motion.div>
  );
}

export default GabungPage;
