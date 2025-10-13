import { style } from "framer-motion/client";
import Feedback from "../Feedback/Feedback";
import CarouselHome from "./CarouselHome";
import FeedbackHome from "./FeedbackHome";
import HeaderHome from "./HeaderHome";
import LogoCompany from "./LogoCompany";
import Mitra from "./Mitra";
import NewsItem from "./NewsItem";
import Publikasi from "./Publikasi";
import Video from "./Video";
import React, { useState } from "react";
import styles from "./homepage.module.css";
import { motion } from "framer-motion";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

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
      className="space-y-8"
    >
      <div className={styles.containerHome}>
        <HeaderHome />
        <CarouselHome />
        <LogoCompany />
        <NewsItem />
        <Publikasi />
        <Video />
        <Mitra />
        <FeedbackHome />
        {/* <Feedback
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />{" "} */}
      </div>
    </motion.div>
  );
}

export default HomePage;
