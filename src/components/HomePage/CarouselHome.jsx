import { useRef } from "react";
import styles from "./homepage.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import foto1 from "../../assets/foto1.png";
import foto2 from "../../assets/foto3new.png";
import foto4 from "../../assets/amelpic.jpg";
import foto5 from "../../assets/fotoasset1.jpg";

const photos = [foto1, foto4, foto2, foto5];

export default function CarouselHome() {
  const swiperRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoScroll = (direction) => {
    stopAutoScroll();

    if (swiperRef.current) {
      // langsung gerak sekali pas hover
      if (direction === "next") {
        swiperRef.current.slideNext();
      } else {
        swiperRef.current.slidePrev();
      }
    }

    // lanjut auto scroll tiap 2 detik
    intervalRef.current = setInterval(() => {
      if (swiperRef.current) {
        if (direction === "next") {
          swiperRef.current.slideNext();
        } else {
          swiperRef.current.slidePrev();
        }
      }
    }, 300);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className={styles.containerCarousel}>
      {/* Left content */}
      <div className={styles.left}>
        <h2 className={styles.titleCarousel}>
          Untuk ekosistem <br /> yang lebih sehat <br /> dan maju.
        </h2>
        <p className={styles.description}>
          AEML adalah forum kolaboratif yang mempertemukan para pemangku
          kepentingan utama dalam pengembangan kendaraan listrik di Indonesia.
        </p>

        <div className={styles.stats}>
          <div className={styles.card}>
            <h3>20</h3>
            <p>anggota perusahaan</p>
          </div>
          <div className={styles.card}>
            <h3>2022</h3>
            <p>awal berdiri</p>
          </div>
        </div>
      </div>

      {/* Right carousel */}
      <div className={styles.right}>
        {/* Left hover zone */}
        <div
          className={styles.hoverZoneLeft}
          onMouseEnter={() => startAutoScroll("prev")}
          onMouseLeave={stopAutoScroll}
        />

        {/* Right hover zone */}
        <div
          className={styles.hoverZoneRight}
          onMouseEnter={() => startAutoScroll("next")}
          onMouseLeave={stopAutoScroll}
        />

        <Swiper
          spaceBetween={20}
          slidesPerView={2.5}
          loop={true}
          modules={[Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {photos.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Event ${index + 1}`}
                className={`${styles.carouselImage} ${
                  index % 2 !== 0 ? styles.oddImage : styles.evenImage
                }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
