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

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
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
  );
}

export default HomePage;
