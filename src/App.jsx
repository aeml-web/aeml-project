import React, { useLayoutEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import KegiatanPages from "./components/KegiatanPage/KegiatanPages";
import ScrollNavigation from "./components/About/ScrollNavigation";
import GabungPage from "./components/Gabung/GabungPage";
import NewsDetailPage from "./components/KegiatanPage/NewsDetailComponent";
import PublikasiPage from "./components/Publikasi/PublikasiPage";
import PublikasiDetail from "./components/Publikasi/PublikasiDetail";

import "./index.css";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const Wrapper = ({ children }) => {
  const location = useLocation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Handle page transitions and scroll to top
  useLayoutEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    setIsPageLoaded(false);

    // Set page loaded state
    const pageTimer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 300);

    return () => {
      clearTimeout(pageTimer);
    };
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="page-wrapper"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <main className="container">{children}</main>
          {isPageLoaded && <Footer />}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kegiatan" element={<KegiatanPages />} />
          <Route path="/about" element={<ScrollNavigation />} />
          <Route path="/gabung" element={<GabungPage />} />
          <Route path="/publikasi" element={<PublikasiPage />} />
          <Route path="/kegiatan/:id" element={<NewsDetailPage />} />
          <Route path="/publikasi/:id" element={<PublikasiDetail />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
