import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

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
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  const isAboutPage = location.pathname === "/about";

  // Inisialisasi Locomotive hanya kalau bukan /about
  useEffect(() => {
    if (isAboutPage || !scrollRef.current) return;

    locomotiveScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: "is-inview",
      smoothMobile: false,
      resetNativeScroll: true,
    });

    setTimeout(() => {
      locomotiveScrollRef.current?.update();
    }, 500);

    const handleResize = () => {
      locomotiveScrollRef.current?.update();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      locomotiveScrollRef.current?.destroy();
    };
  }, [location.pathname, isAboutPage]);

  useLayoutEffect(() => {
    if (isAboutPage) return; // biarin native scroll

    setIsPageLoaded(false);

    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(0, {
        duration: 0,
        disableLerp: true,
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    const timer = setTimeout(() => {
      setIsPageLoaded(true);
      locomotiveScrollRef.current?.update();
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, isAboutPage]);

  return (
    <>
      <Navbar />
      {isAboutPage ? (
        // ✅ Scroll native untuk /about
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className="container"
            style={{
              minHeight: "100vh",
              overflowY: "auto", // ⬅️ tambahin ini
              height: "100vh", // ⬅️ pastikan penuh layar
              WebkitOverflowScrolling: "touch", // biar smooth di iOS
            }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {children}
            <Footer /> {/* taruh di sini biar ikut scroll native */}
          </motion.main>
        </AnimatePresence>
      ) : (
        <div ref={scrollRef} data-scroll-container>
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
        </div>
      )}
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
