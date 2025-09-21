import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import KegiatanPages from "./components/KegiatanPage/KegiatanPages";
// import PublikasiPage from "./pages/PublikasiPage";
import "./index.css";
import ScrollNavigation from "./components/About/ScrollNavigation";
import About from "./components/About/About";
import GabungPage from "./components/Gabung/GabungPage";
import NewsDetailPage from "./components/KegiatanPage/NewsDetailComponent";
import PublikasiPage from "./components/Publikasi/PublikasiPage";

const articles = [
  {
    id: 1,
    title: "Sample Article Title 1",
    date: "2024-01-15",
    image: "/images/article1.jpg",
  },
  {
    id: 2,
    title: "Sample Article Title 2",
    date: "2024-01-16",
    image: "/images/article2.jpg",
  },
  // ... more articles
];

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kegiatan" element={<KegiatanPages />} />
          {/* <Route path="/publikasi" element={ />} /> */}
          <Route path="/about" element={<ScrollNavigation />} />
          <Route path="/gabung" element={<GabungPage />} />
          <Route path="/publikasi" element={<PublikasiPage />} />

          {/* News Detail Page */}
          <Route
            path="/kegiatan/:id"
            element={<NewsDetailPage allArticles={articles} />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
