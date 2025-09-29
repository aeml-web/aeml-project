// ScrollNavigation.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./about.module.css";
import visi1 from "../../assets/visi1.png";
import visi2 from "../../assets/visi2.png";
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

import airlangga from "../../assets/airlangga.png";
import anin from "../../assets/anin.png";
import pandu from "../../assets/pandu.png";
import fototentang from "../../assets/fototentang.png";
import coverpub from "../../assets/publication_cover.png";
import homepage from "../../assets/headernew.png";
import rian from "../../assets/rian.webp";
import anugrah from "../../assets/anugrah.webp";

import defaultPhoto from "../../assets/default.png";

import pertaminaLogo from "../../assets/logos/pertamina-logo.png";
import tbsLogo from "../../assets/logos/tbs-logo.png";
import plnLogo from "../../assets/logos/pln-logo.png";
import electrumLogo from "../../assets/logos/electrum-logo.png";
import ibcLogo from "../../assets/logos/ibc-logo.png";
import vktrLogo from "../../assets/logos/vktr-logo.png";
import voltaLogo from "../../assets/logos/volta-logo.png";
import casionLogo from "../../assets/logos/casion-logo.png";
import grabLogo from "../../assets/logos/grab-logo.png";
import gotoLogo from "../../assets/logos/goto-logo.png";
import dbsLogo from "../../assets/logos/dbs-logo.png";
import gesitsLogo from "../../assets/logos/gesits-logo.png";
import alvaLogo from "../../assets/logos/alva-logo.png";
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
    label: "Perusahaan Anggota AEML",
    icon: "🏢",
    showTitle: true,
    showSidebar: true,
  },
  {
    id: "mitra-pemerintahan",
    label: "Mitra Pemerintahan AEML",
    icon: "🏛️",
    showTitle: true,
    showSidebar: true,
  },
  {
    id: "mitra-pembangunan",
    label: "Mitra Pembangunan AEML",
    icon: "🔧",
    showTitle: true,
    showSidebar: true,
  },
];

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState("visi");
  const [showTitle, setShowTitle] = useState(false);
  const sectionsRef = useRef({});
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  const [animatedElements, setAnimatedElements] = useState(new Set());
  const observerRef = useRef(null);

  const menuItems = aboutMenuItems;

  const logos = [
    {
      name: "ALVA",
      image: alvaLogo,
      alt: "ALVA Logo",
    },
    { name: "PERTAMINA", style: "pertamina", image: pertaminaLogo },
    { name: "TBS", style: "tbs", image: tbsLogo },
    { name: "PLN", style: "pln", image: plnLogo },
    { name: "electrum", style: "electrum", image: electrumLogo },
    { name: "IBC", style: "ibc", image: ibcLogo },
    { name: "VKTR", style: "vktr", image: vktrLogo },
    { name: "VOLTA", style: "volta", image: voltaLogo },
    { name: "GASION", style: "gasion", image: casionLogo },
    { name: "Grab", style: "grab", image: grabLogo },
    { name: "goto", style: "goto", image: gotoLogo },
    { name: "DBS", style: "dbs", image: dbsLogo },
    { name: "GESITS", style: "gesits", image: gesitsLogo },
  ];

  const lead = [
    {
      id: "1",
      name: "Airlangga Hartarto",
      title: "Chairman of Board of Patrons",
      description: "Chairman of Board of Patrons",
      image: airlangga,
    },
    {
      id: "2",
      name: "Agus Gumiwang Kartasasmita",
      title: "Member of Board of Patrons",
      description: "Member of Board of Patrons",
      image: defaultPhoto,
    },
    {
      id: "3",
      name: "John Anis",
      title: "Member of Board of Patrons",
      description: "Member of Board of Patrons",
      image: defaultPhoto,
    },
    {
      id: "4",
      name: "Darmawan Prasodjo",
      title: "Member of Board of Patrons",
      description: "Member of Board of Patrons",
      image: defaultPhoto,
    },
    {
      id: "5",
      name: "Muhammad Rachmat K.",
      title: "Member of Board of Patrons",
      description:
        "Deputy for Basic Infrastructure Coordination, Coordinating Ministry for Infrastructure and Regional Development of the Republic of Indonesia",
      image: defaultPhoto,
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
      name: "M. Anjani Pudu M.",
      title: "Member of Board of Supervisors",
      description: "President Director of PT. Indika Energy Tbk",
      image: defaultPhoto,
    },
    {
      id: "3",
      name: "Diaz Faisal Malik H.",
      title: "Member of Board of Supervisors",
      description:
        "Deputy Minister of Environment of the Republic of Indonesia",
      image: defaultPhoto,
    },
    {
      id: "4",
      name: "Shirley Santoso",
      title: "Member of Board of Supervisors",
      description: "Chief Executive Officer of Kasaemy",
      image: defaultPhoto,
    },
    {
      id: "5",
      name: "Fabilly Tumwa",
      title: "Member of Board of Supervisors",
      description:
        "Executive Director of Institute for Essential Services Reform (IESR)",
      image: defaultPhoto,
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
      name: "Rizqidden Zakaria",
      title: "Vice Chairman for Technical and Safety",
      description:
        "Head of Battery Infrastructure of PT. Energi Kreasi Batama (Electrum)",
      image: defaultPhoto,
    },
    {
      id: "3",
      name: "Putu Yudha",
      title: "Vice Chairman for Partnerships",
      description: "Chief Marketing Officer of PT. Ilectra Motor Group (ILMG)",
      image: defaultPhoto,
    },
    {
      id: "4",
      name: "Heru Rachmadiardi",
      title: "Vice Chairman for Infrastructure and Electric Vehicle Mobility",
      description:
        "Executive Vice President of PT Perusahaan Listrik Negara (Persero)",
      image: defaultPhoto,
    },
    {
      id: "5",
      name: "Herry Haryman",
      title: "Vice Chairman for Market Development",
      description:
        "Executive Director Institutional Banking Group of PT. Bank DBS Indonesia",
      image: defaultPhoto,
    },
    {
      id: "6",
      name: "Thomson Opuraman",
      title: "Treasurer",
      description: "Co-founder of Smart Motor Indonesia",
      image: defaultPhoto,
    },
    {
      id: "7",
      name: "Rian Ernest Tandjaja",
      title: "Secretary General",
      description: "A professional in law and policy",
      image: rian,
    },
    {
      id: "8",
      name: "Dhany Rachman",
      title: "Vice Section 1",
      description: "Government Relations",
      image: defaultPhoto,
    },
    {
      id: "10",
      name: "Anugraha Dismariedi",
      title: "Director Executive Secretariat",
      description: "A professional in management",
      image: anugrah,
    },
    {
      id: "9",
      name: "Valdano Pandu Ruru",
      title: "Vice Section 2",
      description: "Legal Advisor",
      image: defaultPhoto,
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

  const photos = [fototentang, coverpub, homepage];

  // Fungsi untuk scroll ke section
  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId];
    const container = contentRef.current;

    if (element && container) {
      const containerTop = container.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;

      const scrollOffset = elementTop - containerTop + container.scrollTop;

      container.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });

      setActiveSection(sectionId);

      // Update URL hash tanpa reload page
      if (window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, null, `#${sectionId}`);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowTitle(true);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animType = element.getAttribute("data-anim");
            const delay = element.getAttribute("data-delay") || "0s";

            // Apply delay and animation
            element.style.animationDelay = delay;
            element.classList.add(styles[animType]);

            observerRef.current.unobserve(element);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-anim]");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);
  // Handle scroll spy
  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const handleScroll = () => {
      const containerTop = contentEl.getBoundingClientRect().top;

      let currentSection = null;

      for (const item of menuItems) {
        const element = sectionsRef.current[item.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top - containerTop;

          if (elementTop <= 120) {
            // 120px buffer biar lebih natural
            currentSection = item.id;
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    contentEl.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => contentEl.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  const location = useLocation();

  useEffect(() => {
    // Cek apakah ada hash di URL dan halaman sudah loaded
    if (location.hash) {
      const timer = setTimeout(() => {
        const contentContainer = document.getElementById("content");
        if (contentContainer) {
          // Gunakan kalkulasi manual yang sama seperti handleDropdownClick
          const rect = contentContainer.getBoundingClientRect();
          const containerTop = window.pageYOffset + rect.top;
          const containerHeight = rect.height;
          const windowHeight = window.innerHeight;

          // Scroll ke posisi tengah tapi dinaikkan sedikit
          const offset = 100; // Sama seperti di handleDropdownClick
          const scrollTo =
            containerTop + containerHeight / 2 - windowHeight / 2 - offset;

          window.scrollTo({
            top: scrollTo,
            behavior: "smooth",
          });

          // Setelah scroll ke content, lanjutkan ke section jika ada
          setTimeout(() => {
            if (window.navigateToAboutSection) {
              const sectionId = location.hash.replace("#", "");
              window.navigateToAboutSection(sectionId);
            }
          }, 300);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location]);

  // Handle hash navigation dari URL atau navbar
  useEffect(() => {
    // Fungsi untuk scroll ke section berdasarkan hash
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove # dari hash
      if (hash && sectionsRef.current[hash]) {
        // Delay sedikit untuk memastikan komponen sudah render
        setTimeout(() => scrollToSection(hash), 100);
      }
    };

    // Check hash saat komponen mount
    handleHashChange();

    // Listen untuk perubahan hash
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Expose function untuk external navigation
  useEffect(() => {
    // Fungsi global untuk navigasi dari luar komponen
    window.navigateToAboutSection = (sectionId) => {
      if (menuItems.find((item) => item.id === sectionId)) {
        scrollToSection(sectionId);
      }
    };

    // Fungsi untuk mendapatkan daftar section yang tersedia
    window.getAboutSections = () => {
      return menuItems.map((item) => ({
        id: item.id,
        label: item.label,
      }));
    };

    return () => {
      delete window.navigateToAboutSection;
      delete window.getAboutSections;
    };
  }, [menuItems]);

  const renderSectionContent = (item) => {
    switch (item.id) {
      case "visi":
        return (
          <div className={styles.header}>
            <h1 className={styles.mainTitle}>Visi AEML</h1>
            <div className={styles.visi}>
              <div className={styles.leftVisi}>
                <img src={visi2} className={styles.iconVisi}></img>
                <p className={styles.text}>
                  Mendukung adopsi kendaraan listrik dan mendorong terciptanya
                  ekosistem kendaraan listrik yang berdaya saing global
                </p>
              </div>
              <div className={styles.rightVisi}>
                <img src={visi1} className={styles.iconVisi}></img>
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
                <br></br>
                <br></br>
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

      case "misi":
        return (
          <div className={styles.header}>
            <h1 className={styles.mainTitle}>Misi AEML</h1>
            <div className={styles.misi}>
              <p className={styles.text}>
                Misi kami untuk mendorong terciptanya mobilitas listrik di
                Indonesia didasarkan pada panggilan untuk melindungi lingkungan
                dengan mengurangi polusi di mana masyarakat tinggal, bekerja,
                belajar, juga bermain.
                <br></br>
                <br></br>
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
              <img src={profil} className={styles.photoWay}></img>
              <p className={styles.text}>
                Asosiasi Ekosistem Mobilitas Listrik (AEML) didirikan pada tahun
                2022 sebagai respons atas kebutuhan mendesak untuk mempercepat
                adopsi kendaraan listrik di Indonesia serta membangun ekosistem
                mobilitas listrik yang terintegrasi. <br></br> <br></br>Sejak
                awal terbentuk, AEML hadir sebagai wadah kolaborasi yang
                menyatukan beragam pemangku kepentingan—mulai dari produsen
                kendaraan, penyedia baterai, penyelenggara infrastruktur
                pengisian dan tukar baterai, perusahaan transportasi berbasis
                aplikasi, hingga lembaga keuangan. <br></br>
                <br></br>
                Berawal dari lima perusahaan perintis, kini AEML telah
                berkembang menjadi asosiasi dengan dua puluh anggota, dan jumlah
                ini terus bertambah. <br></br> <br></br>Dengan status sebagai
                anggota di dua Komite Teknis Badan Standardisasi Nasional (BSN)
                serta Anggota Luar Biasa Kamar Dagang dan Industri Indonesia
                (KADIN), AEML juga menjalin kerja sama erat dengan berbagai
                kementerian, pusat kajian, dan lembaga riset. <br></br>{" "}
                <br></br>Komitmen kami jelas: menjadi katalis dalam mendorong
                regulasi yang kondusif, memperkuat rantai pasok nasional, serta
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
                  spaceBetween={20}
                  slidesPerView={3.6}
                  loop={false}
                  navigation={true}
                  modules={[Navigation]}
                >
                  {lead.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.containerPhotos}>
                        <div className={styles.containerImage}>
                          <img
                            src={src.image}
                            alt={`Event ${index + 1}`}
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
                  spaceBetween={20}
                  slidesPerView={3.6}
                  loop={false}
                  navigation={true}
                  modules={[Navigation]}
                >
                  {leadSupervisor.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.containerPhotos}>
                        <div className={styles.containerImage}>
                          <img
                            src={src.image}
                            alt={`Event ${index + 1}`}
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
                <h1 className={styles.titleBoard}>Board of Executives </h1>
                <Swiper
                  spaceBetween={20}
                  slidesPerView={3.6}
                  slidesOffsetAfter={20} // kasih jarak sesuai spaceBetween
                  centeredSlides={false}
                  loop={false}
                  navigation={true}
                  modules={[Navigation]}
                  observer={true}
                  observeParents={true}
                  onSwiper={(swiper) => {
                    // Multiple update untuk memastikan
                    setTimeout(() => swiper.update(), 0);
                    setTimeout(() => swiper.update(), 50);
                    setTimeout(() => swiper.update(), 100);
                  }}
                >
                  {leadExecutive.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.containerPhotos}>
                        <div className={styles.containerImage}>
                          <img
                            src={src.image}
                            alt={`Event ${index + 1}`}
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
              <br></br>
              <br></br>
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
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={styles.text}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <div className={styles.features}>
              {[1, 2, 3].map((card) => (
                <div key={card} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <span className={styles.featureNumber}>{card}</span>
                  </div>
                  <h4 className={styles.featureTitle}>Feature {card}</h4>
                  <p className={styles.featureDesc}>
                    Brief description of this feature or benefit.
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.aboutPage}>
      <div className={styles.aboutContainer}>
        <h1
          data-anim="slideInUp"
          data-delay="0.3s"
          className={styles.titleAbout}
        >
          Memajukan ekosistem mobilitas listrik di Indonesia sehingga berkelas
          dunia.
        </h1>
        <Swiper
          spaceBetween={30} // Add some space between slides
          slidesPerView="auto"
          loop={true}
          navigation={true}
          centeredSlides={true} // Center the slide
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
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarContent}>
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
                      <span className={styles.label}>{item.label}</span>
                    </button>
                  )
              )}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div id="content" className={styles.content} ref={contentRef}>
          {/* Header */}
          {/* Sections */}
          {menuItems.map((item) => (
            <section
              key={item.id}
              id={item.id} // Tambahkan ID untuk setiap section
              ref={(el) => (sectionsRef.current[item.id] = el)}
              className={styles.section}
            >
              <div className={styles.sectionCard}>
                {item.showTitle && (
                  <h2 className={styles.sectionTitle}>{item.label}</h2>
                )}{" "}
                {renderSectionContent(item)}
              </div>
            </section>
          ))}

          {/* Footer spacer */}
          <div className={styles.footer}></div>
        </div>
      </div>
    </div>
  );
};

export default ScrollNavigation;
