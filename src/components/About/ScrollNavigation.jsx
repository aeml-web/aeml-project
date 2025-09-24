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

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState("tentang-aeml");
  const sectionsRef = useRef({});
  const contentRef = useRef(null);

  const menuItems = [
    { id: "visi", label: "Visi AEML", icon: "🎯" },
    { id: "misi", label: "Misi AEML", icon: "🎯" },
    { id: "perjalanan-bersama", label: "Perjalanan Bersama", icon: "🤝" },
    { id: "pimpinan-aeml", label: "Struktur AEML", icon: "👥" },
    { id: "perusahaan-anggota", label: "Perusahaan Anggota AEML", icon: "🏢" },
    { id: "mitra-pemerintahan", label: "Mitra Pemerintahan AEML", icon: "🏛️" },
    { id: "mitra-pembangunan", label: "Mitra Pembangunan AEML", icon: "🔧" },
  ];

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
      description:
        "Chairman of Indonesia Chamber of Commerce (KADIN Indonesia)",
      image: airlangga,
    },
    {
      id: "2",
      name: "Agus Gumiwang Kartasasmita",
      title: "Member of Board of Patrons",
      description:
        "Chairman of Indonesia Chamber of Commerce (KADIN Indonesia)",
      image: defaultPhoto,
    },
    {
      id: "1",
      name: "Pandu Sjahrir",
      title: "Lead",
      description: "asdfh kfjfnfjjf dkkeoeow",
      image: defaultPhoto,
    },
    {
      id: "1",
      name: "Pandu Sjahrir",
      title: "Lead",
      description: "asdfh kfjfnfjjf dkkeoeow",
      image: defaultPhoto,
    },
    {
      id: "1",
      name: "Pandu Sjahrir",
      title: "Lead",
      description: "asdfh kfjfnfjjf dkkeoeow",
      image: defaultPhoto,
    },

    {
      id: "1",
      name: "Pandu Sjahrir",
      title: "Lead",
      description: "asdfh kfjfnfjjf dkkeoeow",
      image: defaultPhoto,
    },

    {
      id: "1",
      name: "Pandu Sjahrir",
      title: "Lead",
      description: "asdfh kfjfnfjjf dkkeoeow",
      image: defaultPhoto,
    },

    {
      id: "1",
      name: "Pandu Sjahrir",
      title: "Lead",
      description: "asdfh kfjfnfjjf dkkeoeow",
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

  const photos = [
    "https://picsum.photos/id/1011/800/500",
    "https://picsum.photos/id/1015/800/500",
    "https://picsum.photos/id/1016/800/500",
    "https://picsum.photos/id/1025/800/500",
  ];

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
    }
  };

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

  const renderSectionContent = (item) => {
    switch (item.id) {
      case "visi":
        return (
          <div className={styles.grid}>
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
          </div>
        );

      case "misi":
        return (
          <div className={styles.grid}>
            <div className={styles.visi}>
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
                  {lead.map((src, index) => (
                    <SwiperSlide key={index}>
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
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className={styles.section}>
                <h1 className={styles.titleBoard}>Board of Executives </h1>
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
            {logos.map((partner) => (
              <div key={partner.id} className={styles.partnerCard}>
                <div className={styles.logoContainer}>
                  <img
                    src={partner.image}
                    alt={partner.alt}
                    className={styles.companyLogo}
                  />
                </div>
              </div>
            ))}
          </div>
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
        <h1 className={styles.titleAbout}>
          Memajukan ekosistem mobilitas listrik di Indonesia sehingga berkelas
          dunia.
        </h1>
        <Swiper
          spaceBetween={30} // Add some space between slides
          slidesPerView={1} // Show only 1 slide at a time
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
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`${styles.menuItem} ${
                    activeSection === item.id ? styles.active : ""
                  }`}
                >
                  <span className={styles.label}>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.content} ref={contentRef}>
          {/* Header */}
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

          {/* Sections */}
          {menuItems.map((item) => (
            <section
              key={item.id}
              ref={(el) => (sectionsRef.current[item.id] = el)}
              className={styles.section}
            >
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>{item.label}</h2>
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
