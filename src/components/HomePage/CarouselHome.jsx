import { useRef, useState } from "react";
import styles from "./homepage.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // ✅ Add this

import foto1 from "../../assets/foto1.png";
import foto2 from "../../assets/foto3new.png";
import foto4 from "../../assets/amelpic.jpg";
import foto5 from "../../assets/fotoasset1.jpg";

const photos = [foto1, foto4, foto2, foto5];

export default function CarouselHome() {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorDirection, setCursorDirection] = useState("");

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
      <div ref={containerRef} className={styles.right}>
        <Swiper
          spaceBetween={20}
          slidesPerView={2.5}
          slidesOffsetBefore={0}
          centeredSlides={false}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          observer={true}
          observeParents={true}
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
