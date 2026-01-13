import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    id: {
      translation: {
        // Header / Navbar
        nav: {
          about: "Tentang AEML",
          activities: "Kegiatan",
          publications: "Publikasi",
          join: "Gabung AEML",
        },

        // Homepage
        home: {
          title: "Asosiasi Ekosistem <br/> Mobilitas Listrik",
          tagline:
            "Katalis pengembangan ekosistem mobilitas listrik kelas dunia di Indonesia",
          btnAbout: "Tentang AEML",
          btnActivities: "Kegiatan",
          ecosystemMessage:
            "Untuk ekosistem <br/> yang lebih sehat <br/> dan maju.",
          description:
            "AEML adalah forum kolaboratif yang mempertemukan para pemangku kepentingan utama dalam pengembangan kendaraan listrik di Indonesia.",
          memberCount: "anggota perusahaan",
          foundedYear: "2022 awal berdiri",
          memberCompanies: "Perusahaan Anggota AEML",
          closerLook: "Mengenal AEML lebih dekat",
          publicPartners: "Mitra Pemerintahan AEML",
          devPartners: "Mitra Pembangunan AEML",
          readMore: "Baca selengkapnya",
          load: "Memuat kegiatan…",
          failedLoad: "Gagal memuat kegiatan. Silakan coba lagi nanti.",
          empty: "Belum ada kegiatan tersedia.",
          learnMore: "Pelajari Selengkapnya",
        },

        // Activities Page
        activities: {
          title: "Kegiatan",
          news: "Berita",
          articles: "Artikel",
          opinion: "Opini",
          announcements: "Pengumuman",
          activities: "Kegiatan",
        },

        // About AEML Page
        about: {
          title: "Tentang AEML",
          visionMission: "Visi dan Misi",
          journey: "Perjalanan Bersama",
          structure: "Struktur AEML",
          memberCompanies: "Perusahaan Anggota AEML",
          publicPartners: "Mitra Pemerintahan AEML",
          devPartners: "Mitra Pembangunan AEML",
          titleSlogan:
            "Memajukan ekosistem mobilitas listrik di Indonesia sehingga berkelas dunia.",
          // About Content
          associationName: "Asosiasi Ekosistem Mobilitas Listrik",
          aboutDescription:
            "Asosiasi Ekosistem Mobilitas Listrik (AEML) merupakan forum bagi para pelopor kendaraan listrik untuk mengkatalisasi pengembangan ekosistem mobilitas listrik kelas dunia di Indonesia. Kami adalah badan industri, thought leaders, dan advokat kebijakan publik untuk ekosistem kendaraan listrik di Indonesia.",
          aboutDescription2:
            "Dalam mengembangkan ekosistem kendaraan listrik, AEML melibatkan segenap pihak dari manufaktur kendaraan listrik, penyedia baterai, pelaku usaha di sektor energi, infrastruktur kendaraan listrik, institusi keuangan dan pengembang pasar.",

          // Vision
          visionTitle: "Visi AEML",
          visionText:
            "Mendukung adopsi kendaraan listrik dan mendorong terciptanya ekosistem kendaraan listrik yang berdaya saing global",
          visionText2:
            "Memberikan suara kepada anggota dan membina kemitraan yang membangun rantai nilai domestik yang kuat, serta kolaborasi dengan semua pemangku kepentingan.",

          // Mission
          missionTitle: "Misi AEML",
          missionText:
            "Misi kami untuk mendorong terciptanya mobilitas listrik di Indonesia didasarkan pada panggilan untuk melindungi lingkungan dengan mengurangi polusi di mana masyarakat tinggal, bekerja, belajar, juga bermain.",
          missionText2:
            "Dengan berkontribusi pada inisiatif Pemerintah Republik Indonesia dalam mengatasi perubahan iklim, kami juga secara langsung mendukung kemandirian energi bangsa. Dengan demikian, kami akan mencapai visi kami untuk mendukung adopsi kendaraan listrik dan mendorong terciptanya ekosistem mobilitas listrik yang berdaya saing global.",

          // Journey
          journeyTitle: "Perjalanan Bersama",
          journeyText1:
            "Asosiasi Ekosistem Mobilitas Listrik (AEML) didirikan pada tahun 2022 sebagai respons atas kebutuhan mendesak untuk mempercepat adopsi kendaraan listrik di Indonesia serta membangun ekosistem mobilitas listrik yang terintegrasi.",
          journeyText2:
            "Sejak awal terbentuk, AEML hadir sebagai wadah kolaborasi yang menyatukan beragam pemangku kepentingan—mulai dari produsen kendaraan, penyedia baterai, penyelenggara infrastruktur pengisian dan tukar baterai, perusahaan transportasi berbasis aplikasi, hingga lembaga keuangan.",
          journeyText3:
            "Berawal dari lima perusahaan perintis, kini AEML telah berkembang menjadi asosiasi dengan dua puluh anggota, dan jumlah ini terus bertambah.",
          journeyText4:
            "Dengan status sebagai anggota di dua Komite Teknis Badan Standardisasi Nasional (BSN) serta Anggota Luar Biasa Kamar Dagang dan Industri Indonesia (KADIN), AEML juga menjalin kerja sama erat dengan berbagai kementerian, pusat kajian, dan lembaga riset.",
          journeyCommitment:
            "Komitmen kami jelas: menjadi katalis dalam mendorong regulasi yang kondusif, memperkuat rantai pasok nasional, serta mempercepat transisi menuju mobilitas berkelanjutan di Indonesia.",
        },

        // Join AEML Page
        join: {
          title: "Gabung AEML",
          fillForm: "Isi form",
          learn: "Pelajari",
          heroTitle: "Bergabung dengan",
          heroTitle2: "Asosiasi Mobilitas Ekosistem Listrik",

          heroDescription:
            "Gabung ke dalam ekosistem yang mendukung percepatan pengembangan ekosistem mobilitas listrik di Indonesia hingga mandunia.",
          aboutAEML:
            "Asosiasi Ekosistem Mobilitas Listrik (AEML) merupakan forum bagi para pelopor kendaraan listrik untuk mengkatalisasi pengembangan ekosistem mobilitas listrik kelas dunia di Indonesia.",
          aboutAEML2:
            "Kami adalah badan industri, thought leaders, dan advokat kebijakan publik untuk ekosistem kendaraan listrik di Indonesia.",

          // Sectors
          sectorsTitle: "Sektor AEML",
          sectorsDescription:
            "Gabung ke dalam ekosistem yang mendukung percepatan pengembangan ekosistem mobilitas listrik di Indonesia hingga mandunia.",

          // Form
          requirements: "Persyaratan",
          becomePartOf: "Bergabung bersama AEML",
          formNotice:
            "Kami akan segera menghubungi anda setelah form pendaftaran telah kami terima.",
          companyName: "Nama perusahaan atau lembaga",
          companySector: "Sektor perusahaan",
          motivation: "Alasan bergabung",
          phoneNumber: "Nomor Telepon",
          selectSector: "Pilih sektor perusahaan disini...",
          motivationPlaceholder: "Alasan bergabung AEML...",
        },

        // Publications Page
        publications: {
          title: "Publikasi",
          description: "Edaran, riset, dan booklet dari AEML.",
          reports: "Laporan",
          circulars: "Edaran",
          downloadNotice:
            "Mohon mengisi data diri terlebih dahulu untuk mengunduh publikasi ini.",
          load: "Memuat publikasi…",
          failedLoad: "Gagal memuat publikasi. Silakan coba lagi nanti.",
          empty: "Belum ada publikasi tersedia.",
          readPublication: "Baca Publikasi",
          regulations: "Peraturan",
        },

        sharing: {
          hashtag: "#SharingEML",
          subtitle: "Jaring pendapat publik untuk AEML",
          question: "Apa jenis kendaraan listrik yang kamu gunakan saat ini?",
          placeholder: "Ketik jawaban kamu disini...",
          submit: "Submit",
        },
      },
    },

    en: {
      translation: {
        // Header / Navbar
        nav: {
          about: "About AEML",
          activities: "Activities",
          publications: "Publications",
          join: "Become a Member of AEML",
        },

        // Homepage
        home: {
          title: "Electric Mobility <br/> Ecosystem Association",
          tagline:
            "A catalyst for the development of a world-class electric mobility ecosystem in Indonesia",
          btnAbout: "About AEML",
          btnActivities: "Activities",
          ecosystemMessage:
            "Towards a healthier <br/> and more <br/> advanced ecosystem.",
          description:
            "AEML is a collaborative forum that brings together key stakeholders in advancing electric vehicle development in Indonesia.",
          memberCount: "corporate members",
          foundedYear: "Founded",
          memberCompanies: "AEML Member Companies",
          closerLook: "A Closer Look at AEML",
          publicPartners: "AEML Public Sector Partners",
          devPartners: "AEML Development Partners",
          readMore: "Read more",
          load: "Loading activities…",
          failedLoad: "Failed to load activities. Please try again later.",
          empty: "No activities available yet.",
          learnMore: "Learn More",
        },

        // Activities Page
        activities: {
          title: "Activities",
          news: "News",
          articles: "Articles",
          opinion: "Opinion",
          announcements: "Announcements",
          activities: "Activities",
        },

        // About AEML Page
        about: {
          title: "About AEML",
          visionMission: "Vision and Mission",
          journey: "Our Journey Together",
          structure: "AEML Organizational Structure",
          memberCompanies: "AEML member companies",
          publicPartners: "AEML Public Sector Partners",
          devPartners: "AEML Development Partners",
          titleSlogan:
            "Advancing Indonesia's electric mobility ecosystem to world-class standards.",

          // About Content
          associationName: "Electric Mobility Ecosystem Association",
          aboutDescription:
            "The Electric Mobility Ecosystem Association (AEML) serves as a forum for electric vehicle pioneers to catalyze the development of a world-class electric mobility ecosystem in Indonesia. We act as an industry body, thought leader, and public policy advocate for Indonesia's electric vehicle ecosystem.",
          aboutDescription2:
            "In advancing the electric mobility ecosystem, AEML engages a broad range of stakeholders, including electric vehicle manufacturers, battery providers, energy sector players, EV infrastructure developers, financial institutions, and market developers.",

          // Vision
          visionTitle: "Our Vision",
          visionText:
            "Supporting the adoption of electric vehicles and fostering the development of a globally competitive electric vehicle ecosystem.",
          visionText2:
            "Providing a collective voice for members and fostering partnerships that build a strong domestic value chain, while promoting collaboration with all stakeholders.",

          // Mission
          missionTitle: "Our Mission",
          missionText:
            "Our mission to advance electric mobility in Indonesia is driven by a commitment to protect the environment by reducing pollution in the places where people live, work, learn, and play.",
          missionText2:
            "By contributing to the initiatives of the Government of the Republic of Indonesia to address climate change, we also directly support national energy independence. In doing so, we strive to realize our vision of supporting the adoption of electric vehicles and fostering the development of a globally competitive electric mobility ecosystem.",

          // Journey
          journeyTitle: "Our Journey Together",
          journeyText1:
            "The Electric Mobility Ecosystem Association (AEML) was established in 2022 in response to the urgent need to accelerate the adoption of electric vehicles in Indonesia and to build an integrated electric mobility ecosystem.",
          journeyText2:
            "Since its inception, AEML has served as a collaborative platform that brings together a wide range of stakeholders—ranging from vehicle manufacturers and battery providers to charging and battery swapping infrastructure operators, app-based transportation companies, and financial institutions.",
          journeyText3:
            "Starting with five pioneering companies, AEML has grown into an association of twenty member companies, and this number continues to expand.",
          journeyText4:
            "As a member of two Technical Committees of the National Standardization Agency of Indonesia (BSN) and an Extraordinary Member of the Indonesian Chamber of Commerce and Industry (KADIN), AEML also works closely with various ministries, policy think tanks, and research institutions.",
          journeyCommitment:
            "Our commitment is clear: to act as a catalyst in promoting enabling regulations, strengthening the national supply chain, and accelerating Indonesia's transition toward sustainable mobility.",
        },

        // Join AEML Page
        join: {
          title: "Become a Member of AEML",
          fillForm: "Fill in the form",
          learn: "Learn",

          heroTitle: "Become a Member of the",
          heroTitle2: "Electric Mobility Ecosystem Association",
          heroDescription:
            "Join an ecosystem that supports the acceleration of Indonesia's electric mobility ecosystem development toward a world-class electric mobility ecosystem.",
          aboutAEML:
            "The Electric Mobility Ecosystem Association (AEML) is a forum for electric vehicle pioneers to catalyze the development of a world-class electric mobility ecosystem in Indonesia.",
          aboutAEML2:
            "We are an industry body, thought leaders, and public policy advocates for Indonesia's electric vehicle ecosystem.",

          // Sectors
          sectorsTitle: "AEML Industry Sectors",
          sectorsDescription:
            "Join an ecosystem that supports the acceleration of Indonesia's electric mobility ecosystem development toward a world-class electric mobility ecosystem.",

          // Form
          requirements: "Membership Requirements",
          becomePartOf: "Become Part of AEML",
          formNotice:
            "Our team will reach out to you after your registration form has been received.",
          companyName: "Name of Company or Organization",
          companySector: "Company Sector",
          motivation: "Motivation for Joining",
          phoneNumber: "Phone Number",
          selectSector: "Select company sector here...",
          motivationPlaceholder: "Reason for joining AEML...",
        },

        // Publications Page
        publications: {
          title: "Publications",
          description:
            "Circulars, research outputs, and booklets issued by AEML.",
          reports: "Reports",
          circulars: "Circulars",
          downloadNotice:
            "Please fill in your details to download this publication.",
          load: "Loading publications…",
          failedLoad: "Failed to load publications. Please try again later.",
          empty: "No publications available yet.",
          readPublication: "Read Publication",
          regulations: "Regulations",
        },
        sharing: {
          hashtag: "#SharingEML",
          subtitle: "Public opinion gathering for AEML",
          question: "What type of electric vehicle do you currently use?",
          placeholder: "Type your answer here...",
          submit: "Submit",
        },
      },
    },
  },
  lng: localStorage.getItem("lang") || "id",
  fallbackLng: "id",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
