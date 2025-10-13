import React, { useState } from "react";
import Header from "./Header";
import Content from "./Content";
import { motion } from "framer-motion";

function PublikasiPage() {
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
        <div>
          <Header />
          <Content />
        </div>
      </>
    </motion.div>
  );
}

export default PublikasiPage;
