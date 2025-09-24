import React, { useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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

const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

function App() {
  return (
    <Router>
      <Wrapper>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kegiatan" element={<KegiatanPages />} />
            <Route path="/about" element={<ScrollNavigation />} />
            <Route path="/gabung" element={<GabungPage />} />
            <Route path="/publikasi" element={<PublikasiPage />} />
            <Route path="/kegiatan/:id" element={<NewsDetailPage />} />
            <Route path="/publikasi/:id" element={<PublikasiDetail />} />
          </Routes>
        </main>
        <Footer />
      </Wrapper>
    </Router>
  );
}

export default App;
