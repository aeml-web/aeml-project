// ScrollNavigation.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./about.module.css";
import visi1 from "../../assets/imgvisi2.png";
import visi2 from "../../assets/imgvisi1.png";
import profil from "../../assets/foto-profil.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../global.css";
import "animate.css";

import govEkonomi from "../../assets/logos-gov/ekonomi.png";
import govInvest from "../../assets/logos-gov/invest.png";
import industri from "../../assets/logos-gov/industri.png";
import energi from "../../assets/logos-gov/energi.png";
import lh from "../../assets/logos-gov/lh.png";
import transportasi from "../../assets/logos-gov/transport.png";
import dki from "../../assets/logos-gov/dki.png";

import image1 from "../../assets/logos-gov/image1.png";
import image2 from "../../assets/logos-gov/image2.png";
import image3 from "../../assets/logos-gov/image3.png";
import image4 from "../../assets/logos-gov/image4.png";
import image5 from "../../assets/logos-gov/image5.png";
import image6 from "../../assets/logos-gov/image6.png";

import airlangga from "../../assets/airlangga.jpg";
import anin from "../../assets/anin.png";
import pandu from "../../assets/pandu_photo.jpg";
import fototentang from "../../assets/fototentang.png";
import coverpub from "../../assets/publication_cover.png";
import homepage from "../../assets/headernew.png";

import fotoo1 from "../../assets/aemlabout1.jpeg";
import fotoo2 from "../../assets/aemlabout2.jpeg";
import fotoo3 from "../../assets/aemlabout3.jpeg";
import fotoo4 from "../../assets/aemlabout4.jpeg";
import foto7 from "../../assets/aeml5.jpeg";
import foto3 from "../../assets/aeml3.jpeg";
import foto6 from "../../assets/aeml4.jpeg";
import fotoo5 from "../../assets/fotoo1.jpeg";
import fotoo6 from "../../assets/fotoo2.jpeg";
import fotoo7 from "../../assets/fotoo3.jpeg";
import fotoo8 from "../../assets/fotoo4.jpeg";

import rian from "../../assets/rian.jpg";
import valda from "../../assets/valda.jpg";
import putu from "../../assets/putu.jpg";
import ririn from "../../assets/ririn.jpg";
import rizsa from "../../assets/rizsa.jpg";

import anugrah from "../../assets/anugrah.webp";
import dhery from "../../assets/dhery.jpg";
import anugraha from "../../assets/anugraha.jpg";

import defaultPhoto from "../../assets/default.png";

import alamtriLogo from "../../assets/icon_mitra/alamtri.png";
import alvaLogo from "../../assets/icon_mitra/alva.png";
import casionLogo from "../../assets/icon_mitra/casion.png";
import davigoLogo from "../../assets/icon_mitra/davigo.png";
import dbsLogo from "../../assets/icon_mitra/dbs.png";
import electrumLogo from "../../assets/icon_mitra/electrum.png";
import gesitsLogo from "../../assets/icon_mitra/gesits.png";
import gotoLogo from "../../assets/icon_mitra/goto.png";
import grabLogo from "../../assets/icon_mitra/grab.png";
import ibcLogo from "../../assets/icon_mitra/ibc.png";
import okliLogo from "../../assets/icon_mitra/okli 1.png";
import oyoxaLogo from "../../assets/icon_mitra/oyoxa.png";
import pertaminaLogo from "../../assets/icon_mitra/pertamina.png";
import plnLogo from "../../assets/icon_mitra/pln.png";
import smootLogo from "../../assets/icon_mitra/smoot.png";
import tbsLogo from "../../assets/icon_mitra/tbs.png";
import utomoLogo from "../../assets/icon_mitra/utomo.png";
import viarLogo from "../../assets/icon_mitra/viar.png";
import vktrLogo from "../../assets/icon_mitra/vktr.png";
import voltaLogo from "../../assets/icon_mitra/volta.png";

import agus from "../../assets/agusgumiwang.jpg";
import arsjad from "../../assets/arsjad.jpg";
import darmawan from "../../assets/darmawan.jpg";
import diaz from "../../assets/diaz.jpg";
import fabby from "../../assets/fabby.jpg";
import john from "../../assets/john.jpg";
import rachmat from "../../assets/rachmat.jpg";
import shirley from "../../assets/shirley.jpg";

import { motion } from "framer-motion";

import HeaderAbout from "./HeaderAbout";

import { useLocation } from "react-router-dom";

// Export menu items untuk digunakan di navbar atau komponen lain
export const aboutMenuItems = [
  {
    id: "tentang",
    label: "Tentang AEML",
    icon: "🎯",
    showTitle: false,
    showSidebar: true,
  },
  {
    id: "visi",
    label: "Visi dan Misi",
    icon: "🎯",
    showTitle: false,
    showSidebar: true,
  },
  {
    id: "perjalanan-bersama",
    label: "Perjalanan Bersama",
    icon: "🤝",
    showTitle: true,
    showSidebar: true,
  },
  {
    id: "pimpinan-aeml",
    label: "Struktur AEML",
    icon: "👥",
    showTitle: true,
    showSidebar: true,
  },
  {
    id: "perusahaan-anggota",
    label: "Perusahaan Anggota",
    icon: "🏢",
    showTitle: true,
    showSidebar: true,
  },
  {
    id: "mitra-pemerintahan",
    label: "Mitra Pemerintahan",
    icon: "🏛️",
    showTitle: true,
    showSidebar: true,
  },
  {
    id: "mitra-pembangunan",
    label: "Mitra Pembangunan",
    icon: "🔧",
    showTitle: true,
    showSidebar: true,
  },
];

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState("perusahaan-anggota"); // default aktif
  const sectionsRef = useRef({});

  // Pastikan aboutMenuItems sudah di-import atau didefinisikan
  const menuItems = aboutMenuItems;

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

  const logos = [
    { name: "AlamTri", style: "alamtri", image: alamtriLogo },
    { name: "ALVA", style: "alva", image: alvaLogo },
    { name: "CASION", style: "casion", image: casionLogo },
    { name: "DAVIGO", style: "davigo", image: davigoLogo },
    { name: "DBS", style: "dbs", image: dbsLogo },
    { name: "electrum", style: "electrum", image: electrumLogo },
    { name: "GESITS", style: "gesits", image: gesitsLogo },
    { name: "goto", style: "goto", image: gotoLogo },
    { name: "Grab", style: "grab", image: grabLogo },
    { name: "IBC", style: "ibc", image: ibcLogo },
    { name: "OKLI", style: "okli", image: okliLogo },
    { name: "OYOXA", style: "oyoxa", image: oyoxaLogo },
    { name: "PERTAMINA", style: "pertamina", image: pertaminaLogo },
    { name: "PLN", style: "pln", image: plnLogo },
    { name: "SMOOT", style: "smoot", image: smootLogo },
    { name: "TBS", style: "tbs", image: tbsLogo },
    { name: "UTOMO", style: "utomo", image: utomoLogo },
    { name: "VIAR", style: "viar", image: viarLogo },
    { name: "VOLTA", style: "volta", image: voltaLogo },
    { name: "VKTR", style: "vktr", image: vktrLogo },
  ];

  const lead = [
    {
      id: "1",
      name: "Airlangga Hartarto",
      title: "Chairman of Board of Patrons",
      description:
        "Minister of Coordinating Ministry for Economic Affairs of the Republic of Indonesia",
      image: airlangga,
    },
    {
      id: "2",
      name: "Agus Gumiwang Kartasasmita",
      title: "Member of Board of Patrons",
      description: "Minister of Industry of the Republic of Indonesia",
      image: agus,
    },
    {
      id: "3",
      name: "John Anis",
      title: "Member of Board of Patrons",
      description:
        "President Director of PT. Pertamina Power Indonesia (Pertamina NRE)",
      image: john,
    },
    {
      id: "4",
      name: "Darmawan Prasodjo",
      title: "Member of Board of Patrons",
      description:
        "President Director of PT. Perusahaan Listrik Negara (Persero)",
      image: darmawan,
    },
    {
      id: "5",
      name: "Muhammad Rachmat K.",
      title: "Member of Board of Patrons",
      description:
        "Deputy for Basic Infrastructure Coordination, Coordinating Ministry for Infrastructure and Regional Development of the Republic of Indonesia",
      image: rachmat,
    },
  ];

  const leadSupervisor = [
    {
      id: "1",
      name: "Anindya Novyan Bakrie",
      title: "Chairman of Supervisory Board",
      description:
        "Chairman of Indonesia Chamber of Commerce (KADIN Indonesia)",
      image: anin,
    },
    {
      id: "2",
      name: "M. Arsjad Rasjid Prabu Mangkuningrat",
      title: "Member of Board of Supervisors",
      description: "President Director of PT. Indika Energy Tbk",
      image: arsjad,
    },
    {
      id: "3",
      name: "Diaz Faisal Malik H.",
      title: "Member of Board of Supervisors",
      description:
        "Deputy Minister of Environment of the Republic of Indonesia",
      image: diaz,
    },
    {
      id: "4",
      name: "Shirley Santoso",
      title: "Member of Board of Supervisors",
      description: "Chief Executive Officer of Kearney",
      image: shirley,
    },
    {
      id: "5",
      name: "Fabby Tumiwa",
      title: "Member of Board of Supervisors",
      description:
        "Executive Director of Institute for Essential Services Reform (IESR)",
      image: fabby,
    },
  ];

  const leadExecutive = [
    {
      id: "1",
      name: "Pandu Patria Sjahrir",
      title: "Chairman",
      description:
        "Investor, businessman and a visionary for Electric Vehicle Ecosystem",
      image: pandu,
    },
    {
      id: "2",
      name: "Riszajidien Zakaria",
      title: "Vice Chairman for Technical and Safety",
      description:
        "Head of Battery Infrastructure of PT. Energi Kreasi Batama (Electrum)",
      image: rizsa,
    },
    {
      id: "3",
      name: "Putu Yudha",
      title: "Vice Chairman for Partnerships",
      description: "Chief Marketing Officer of PT. Ilectra Motor Group (ILMG)",
      image: putu,
    },
    {
      id: "4",
      name: "Ririn Rachmawardini",
      title: "Vice Chairwoman for Infrastructure and Electric Vehicle Mobility",
      description:
        "Executive Vice President of PT Perusahaan Listrik Negara (Persero)",
      image: ririn,
    },
    {
      id: "5",
      name: "Heru Hatman",
      title: "Vice Chairman for Market Development",
      description:
        "Executive Director Institutional Banking Group of PT. Bank DBS Indonesia",
      image: defaultPhoto,
    },
    {
      id: "6",
      name: "Thomson Djuraiman",
      title: "Treasurer",
      description: "Co-founder of Smoot Motor Indonesia",
      image: defaultPhoto,
    },
    {
      id: "7",
      name: "Rian Ernest Tanudjaja",
      title: "Secretary General",
      description: "A professional in law and policy",
      image: rian,
    },
    {
      id: "8",
      name: "Dhery Rachman",
      title: "Vice Section 1",
      description: "Government Relations",
      image: dhery,
    },
    {
      id: "9",
      name: "Valdano Paulo Ruru",
      title: "Vice Section 2",
      description: "Legal Advisor",
      image: valda,
    },
    {
      id: "10",
      name: "Anugraha Dezmercoledi",
      title: "Director Executive Secretariat",
      description: "A professional in management",
      image: anugraha,
    },
  ];

  const governmentPartners = [
    {
      id: 1,
      name: "Coordinating Ministry of Economics Affairs",
      logo: govEkonomi,
      alt: "Coordinating Ministry of Economics Affairs of the Republic of Indonesia",
    },
    {
      id: 2,
      name: "Coordinating Ministry of Investment & Maritime Affairs",
      logo: govInvest,
      alt: "Coordinating Ministry of Investment & Maritime Affairs of the Republic of Indonesia",
    },
    {
      id: 3,
      name: "Ministry of Industry",
      logo: industri,
      alt: "Ministry of Industry of the Republic of Indonesia",
    },
    {
      id: 4,
      name: "Ministry of Energy & Mineral Resources",
      logo: energi,
      alt: "Ministry of Energy & Mineral Resources of the Republic of Indonesia",
    },
    {
      id: 5,
      name: "Ministry of Environment",
      logo: lh,
      alt: "Ministry of Environment of the Republic of Indonesia",
    },
    {
      id: 6,
      name: "Ministry of Transportation",
      logo: transportasi,
      alt: "Ministry of Transportation of the Republic of Indonesia",
    },
    {
      id: 7,
      name: "Jakarta Provincial Government",
      logo: dki,
      alt: "Jakarta Provincial Government",
    },
  ];

  const developmentPartners = [
    {
      id: 1,
      name: "ClimateWorks Foundation",
      logo: image1,
      alt: "ClimateWorks Foundation",
    },
    {
      id: 2,
      name: "IFC International Finance Corporation",
      logo: image2,
      alt: "IFC International Finance Corporation World Bank Group",
    },
    {
      id: 3,
      name: "Clean Air Asia",
      logo: image3,
      alt: "Clean Air Asia",
    },
    {
      id: 4,
      name: "RMI Energy Transformed",
      logo: image4,
      alt: "RMI Energy Transformed",
    },
    {
      id: 5,
      name: "Kearney",
      logo: image5,
      alt: "Kearney",
    },
    {
      id: 6,
      name: "IESR Institute for Essential Services Reform",
      logo: image6,
      alt: "IESR Institute for Essential Services Reform",
    },
  ];

  const photos = [
    fotoo1,
    fotoo2,
    fotoo3,
    fotoo4,
    foto3,
    foto6,
    foto7,
    fotoo5,
    fotoo6,
    fotoo7,
    fotoo8,
  ];
  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      const navbarHeight = -680; // ✅ samain dengan top di CSS
      const offsetPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 0; // 150px dari atas viewport
      console.log("scrollY:", scrollPosition);

      let foundSection = null;
      for (const item of menuItems) {
        const el = sectionsRef.current[item.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          console.log(item.id, top, height);
          if (scrollPosition >= top && scrollPosition < top + height) {
            foundSection = item.id;
            break;
          }
        }
      }

      if (foundSection && foundSection !== activeSection) {
        console.log("Aktif berubah:", foundSection);
        setActiveSection(foundSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems, activeSection]);

  const renderSectionContent = (item) => {
    switch (item.id) {
      case "visi":
        return (
          <div className={styles.header}>
            <h1 className={styles.mainTitleVisi}>Visi AEML</h1>
            <div className={styles.visi}>
              <div className={styles.leftVisi}>
                <img src={visi2} className={styles.iconVisi} alt="Visi 2" />
                <p className={styles.text}>
                  Mendukung adopsi kendaraan listrik dan mendorong terciptanya
                  ekosistem kendaraan listrik yang berdaya saing global
                </p>
              </div>
              <div className={styles.rightVisi}>
                <img src={visi1} className={styles.iconVisi} alt="Visi 1" />
                <p className={styles.text}>
                  Memberikan suara kepada anggota dan membina kemitraan yang
                  membangun rantai nilai domestik yang kuat, serta kolaborasi
                  dengan semua pemangku kepentingan.
                </p>
              </div>
            </div>
            <h1 className={styles.mainTitle}>Misi AEML</h1>
            <div className={styles.misi}>
              <p className={styles.text}>
                Misi kami untuk mendorong terciptanya mobilitas listrik di
                Indonesia didasarkan pada panggilan untuk melindungi lingkungan
                dengan mengurangi polusi di mana masyarakat tinggal, bekerja,
                belajar, juga bermain.
                <br />
                <br />
                Dengan berkontribusi pada inisiatif Pemerintah Republik
                Indonesia dalam mengatasi perubahan iklim, kami juga secara
                langsung mendukung kemandirian energi bangsa. Dengan demikian,
                kami akan mencapai visi kami untuk mendukung adopsi kendaraan
                listrik dan mendorong terciptanya ekosistem mobilitas listrik
                yang berdaya saing global.
              </p>
            </div>
          </div>
        );

      case "perjalanan-bersama":
        return (
          <div className={styles.grid}>
            <div className={styles.way}>
              <img src={profil} className={styles.photoWay} alt="Profil" />
              <p className={styles.text}>
                Asosiasi Ekosistem Mobilitas Listrik (AEML) didirikan pada tahun
                2022 sebagai respons atas kebutuhan mendesak untuk mempercepat
                adopsi kendaraan listrik di Indonesia serta membangun ekosistem
                mobilitas listrik yang terintegrasi. <br />
                <br />
                Sejak awal terbentuk, AEML hadir sebagai wadah kolaborasi yang
                menyatukan beragam pemangku kepentingan—mulai dari produsen
                kendaraan, penyedia baterai, penyelenggara infrastruktur
                pengisian dan tukar baterai, perusahaan transportasi berbasis
                aplikasi, hingga lembaga keuangan. <br />
                <br />
                Berawal dari lima perusahaan perintis, kini AEML telah
                berkembang menjadi asosiasi dengan dua puluh anggota, dan jumlah
                ini terus bertambah. <br />
                <br />
                Dengan status sebagai anggota di dua Komite Teknis Badan
                Standardisasi Nasional (BSN) serta Anggota Luar Biasa Kamar
                Dagang dan Industri Indonesia (KADIN), AEML juga menjalin kerja
                sama erat dengan berbagai kementerian, pusat kajian, dan lembaga
                riset. <br />
                <br />
                Komitmen kami jelas: menjadi katalis dalam mendorong regulasi
                yang kondusif, memperkuat rantai pasok nasional, serta
                mempercepat transisi menuju mobilitas berkelanjutan di
                Indonesia.
              </p>
            </div>
          </div>
        );

      case "pimpinan-aeml":
        return (
          <div className={styles.grid}>
            <div className={styles.lead}>
              <div className={styles.section}>
                <h1 className={styles.titleBoard}>Board of Patrons</h1>
                <Swiper
                  className={styles.mySwiper}
                  spaceBetween={20}
                  slidesPerView={3.6}
                  slidesOffsetBefore={0}
                  slidesOffsetAfter={250}
                  centeredSlides={false}
                  loop={false}
                  navigation={true}
                  modules={[Navigation]}
                  observer={true}
                  observeParents={true}
                  onSwiper={(swiper) => {
                    setTimeout(() => swiper.update(), 0);
                    setTimeout(() => swiper.update(), 50);
                    setTimeout(() => swiper.update(), 100);
                  }}
                  breakpoints={{
                    0: {
                      // screens under 768px
                      slidesPerView: 2.8,
                      slidesOffsetAfter: 150,
                    },
                    768: {
                      // screens 768px and up
                      slidesPerView: 3.6,
                      slidesOffsetAfter: 250,
                    },
                  }}
                >
                  {lead.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.containerPhotos}>
                        <div className={styles.containerImage}>
                          <img
                            src={src.image}
                            alt={`${src.name}`}
                            className={styles.carouselImage}
                          />
                          <h4 className={styles.titleHover}>
                            {src.description}
                          </h4>
                        </div>
                        <h2 className={styles.name}>{src.name}</h2>
                        <h4 className={styles.title}>{src.title}</h4>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className={styles.section}>
                <h1 className={styles.titleBoard}>Board of Supervisors</h1>
                <Swiper
                  className={styles.mySwiper}
                  spaceBetween={20}
                  slidesPerView={3.6}
                  slidesOffsetBefore={0} // Add this
                  slidesOffsetAfter={250}
                  centeredSlides={false}
                  loop={false}
                  navigation={true}
                  modules={[Navigation]}
                  observer={true}
                  observeParents={true}
                  onSwiper={(swiper) => {
                    setTimeout(() => swiper.update(), 0);
                    setTimeout(() => swiper.update(), 50);
                    setTimeout(() => swiper.update(), 100);
                  }}
                  breakpoints={{
                    0: {
                      // screens under 768px
                      slidesPerView: 2.8,
                      slidesOffsetAfter: 150,
                    },
                    768: {
                      // screens 768px and up
                      slidesPerView: 3.6,
                      slidesOffsetAfter: 250,
                    },
                  }}
                >
                  {leadSupervisor.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.containerPhotos}>
                        <div className={styles.containerImage}>
                          <img
                            src={src.image}
                            alt={`${src.name}`}
                            className={styles.carouselImage}
                          />
                          <h4 className={styles.titleHover}>
                            {src.description}
                          </h4>
                        </div>
                        <h2 className={styles.name}>{src.name}</h2>
                        <h4 className={styles.title}>{src.title}</h4>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className={styles.section}>
                <h1 className={styles.titleBoard}>Board of Executives</h1>
                <Swiper
                  className={styles.mySwiper}
                  spaceBetween={20}
                  slidesPerView={3.6}
                  slidesOffsetBefore={0}
                  slidesOffsetAfter={250}
                  centeredSlides={false}
                  loop={false}
                  navigation={true}
                  modules={[Navigation]}
                  observer={true}
                  observeParents={true}
                  onSwiper={(swiper) => {
                    setTimeout(() => swiper.update(), 0);
                    setTimeout(() => swiper.update(), 50);
                    setTimeout(() => swiper.update(), 100);
                  }}
                  breakpoints={{
                    0: {
                      // screens under 768px
                      slidesPerView: 2.8,
                      slidesOffsetAfter: 250,
                    },
                    768: {
                      // screens 768px and up
                      slidesPerView: 3.6,
                      slidesOffsetAfter: 250,
                    },
                  }}
                >
                  {leadExecutive.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.containerPhotos}>
                        <div className={styles.containerImage}>
                          <img
                            src={src.image}
                            alt={`${src.name}`}
                            className={styles.carouselImage}
                          />
                          <h4 className={styles.titleHover}>
                            {src.description}
                          </h4>
                        </div>
                        <h2 className={styles.name}>{src.name}</h2>
                        <h4 className={styles.title}>{src.title}</h4>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        );

      case "mitra-pemerintahan":
        return (
          <div className={styles.partnersGridGov}>
            {governmentPartners.map((partner) => (
              <div key={partner.id} className={styles.partnerCard}>
                <div className={styles.logoContainer}>
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    className={styles.govLogo}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "mitra-pembangunan":
        return (
          <div className={styles.partnersGridMitra}>
            {developmentPartners.map((partner) => (
              <div key={partner.id} className={styles.partnerCard}>
                <div className={styles.logoContainer}>
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    className={styles.partnerLogo}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "perusahaan-anggota":
        return (
          <div className={styles.partnersGrid}>
            {logos.map((logo, index) => (
              <div key={index} className={styles.partnerCard}>
                <div className={styles.logoContainer}>
                  <img
                    src={logo.image}
                    alt={logo.alt}
                    className={styles.companyLogo}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "tentang":
        return (
          <header className={styles.header}>
            <h1 className={styles.mainTitle}>
              Asosiasi Ekosistem Mobilitas Listrik
            </h1>
            <p className={styles.description}>
              Asosiasi Ekosistem Mobilitas Listrik (AEML) adalah sebuah forum
              kolaboratif yang mempertemukan para pemangku kepentingan utama
              dalam pengembangan kendaraan listrik di Indonesia, mulai dari
              produsen kendaraan, penyedia baterai, infrastruktur pengisian
              daya, hingga pelaku teknologi digital dan keuangan.
              <br />
              <br />
              AEML berperan sebagai wadah industri, pusat pemikiran, serta
              advokat kebijakan publik yang mendorong terciptanya ekosistem
              mobilitas listrik yang berdaya saing global. Melalui sinergi
              lintas sektor, asosiasi ini berkomitmen untuk mempercepat adopsi
              kendaraan listrik, memperkuat rantai pasok domestik, serta
              mendukung transisi menuju energi bersih dan transportasi
              berkelanjutan di Indonesia.
            </p>
          </header>
        );

      default:
        return (
          <div>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        );
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className={styles.aboutPage}>
        {/* Hero Section */}
        <div className={styles.aboutContainer}>
          <h1
            className={`${styles.titleAbout} animate__animated animate__fadeInUp`}
          >
            Memajukan ekosistem mobilitas listrik di Indonesia sehingga berkelas
            dunia.
          </h1>
          <Swiper
            spaceBetween={30}
            slidesPerView="auto"
            loop={true}
            navigation={true}
            centeredSlides={true}
            modules={[Navigation]}
          >
            {photos.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Event ${index + 1}`}
                  className={styles.carouselImageHead}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Main Content Container */}
        <div className={styles.container}>
          {/* Sticky Sidebar */}
          <aside className={styles.sidebar}>
            <nav className={styles.menu}>
              {menuItems.map(
                (item) =>
                  item.showSidebar && (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`${styles.menuItem} ${
                        activeSection === item.id ? styles.active : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  )
              )}
            </nav>
          </aside>

          {/* Scrollable Content */}
          <main className={styles.content}>
            {menuItems.map((item) => (
              <section
                key={item.id}
                id={item.id}
                ref={(el) => (sectionsRef.current[item.id] = el)}
                className={styles.section}
              >
                <div className={styles.sectionCard}>
                  {item.showTitle && (
                    <h2 className={styles.sectionTitle}>{item.label}</h2>
                  )}
                  {renderSectionContent(item)}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollNavigation;
