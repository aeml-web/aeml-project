import React, { useLayoutEffect } from "react";
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

/* 
🌟 Transition Style: Fade + Rise (like APBI)
- starts slightly lower (y: 60)
- fades in softly
- very smooth cubic easing
- no white flash, because layout persists
*/
const pageVariants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.8, 0.25, 1], // smooth "easeOut"
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
};

const PageWrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="relative flex flex-col min-h-screen bg-white text-gray-900 overflow-hidden">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">{children}</div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kegiatan" element={<KegiatanPages />} />
          <Route path="/about" element={<ScrollNavigation />} />
          <Route path="/gabung" element={<GabungPage />} />
          <Route path="/publikasi" element={<PublikasiPage />} />
          <Route path="/kegiatan/:id" element={<NewsDetailPage />} />
          <Route path="/publikasi/:id" element={<PublikasiDetail />} />
        </Routes>
      </PageWrapper>
    </Router>
  );
}

export default App;
