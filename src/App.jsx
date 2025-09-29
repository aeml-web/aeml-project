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
import About from "./components/About/About";
import GabungPage from "./components/Gabung/GabungPage";
import NewsDetailPage from "./components/KegiatanPage/NewsDetailComponent";
import PublikasiPage from "./components/Publikasi/PublikasiPage";
import PublikasiDetail from "./components/Publikasi/PublikasiDetail";
import "./index.css";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Elegant easing curve
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Wrapper = ({ children }) => {
  const location = useLocation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useLayoutEffect(() => {
    setIsPageLoaded(false);

    // Smooth scroll to top with custom easing
    const scrollToTop = () => {
      const duration = 600;
      const start = window.pageYOffset;
      const startTime = performance.now();

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const scroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutCubic(progress);

        window.scrollTo(0, start * (1 - easeProgress));

        if (progress < 1) {
          requestAnimationFrame(scroll);
        }
      };

      requestAnimationFrame(scroll);
    };

    scrollToTop();

    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="container"
          style={{ minHeight: "100vh" }}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {isPageLoaded && <Footer />}
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
