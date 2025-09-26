import styles from "./homepage.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import foto1 from "../../assets/foto1.png";
import foto2 from "../../assets/foto2new.png";
import foto4 from "../../assets/amelpic.jpg";
import foto5 from "../../assets/fotoasset1.jpg";

const photos = [foto1, foto4, foto2, foto5];

export default function CarouselHome() {
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
        <Swiper spaceBetween={20} slidesPerView={2.5} loop={true}>
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
