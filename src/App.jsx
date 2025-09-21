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
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
