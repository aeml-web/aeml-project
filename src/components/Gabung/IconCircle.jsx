import React from "react";
import battery from "../../assets/gabung/baterry.png";
import energy from "../../assets/gabung/energy.png";
import ev from "../../assets/gabung/ev.png";
import finance from "../../assets/gabung/finance.png";
import orbit from "../../assets/gabung/orbit.png";
import ride from "../../assets/gabung/ride.png";
import swap from "../../assets/gabung/swap.png";
import globe from "../../assets/logoamelfix.png";
import styles from "./Tentang.module.css";

const IconCircle = () => {
  // Fungsi untuk menghitung posisi melingkar
  const getCircularPosition = (index, total, radius = 280) => {
    // Mulai dari atas (0 derajat = atas)
    const angle = (index * 360) / total - 90; // -90 untuk mulai dari atas
    const radian = (angle * Math.PI) / 180;

    const x = 50 + (radius * Math.cos(radian)) / 6;
    const y = 50 + (radius * Math.sin(radian)) / 8;

    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: "translate(-50%, -50%)",
    };
  };

  const icons = [
    {
      name: "Battery",
      image: battery,
    },
    {
      name: "Energy",
      image: energy,
    },
    {
      name: "Charging & Battery Swapping",
      image: swap,
    },
    {
      name: "Financier & Market Developer",
      image: finance,
    },
    {
      name: "EV Manufacturer",
      image: ev,
    },
    {
      name: "Ride Hailing & Fleet Operator",
      image: ride,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Center Icon - Globe/Sphere */}
        <div className={styles.centerIcon}>
          <img src={globe} alt="Center Globe" className={styles.centerImage} />
        </div>

        {/* Surrounding Icons - tersebar merata 360 derajat */}
        {icons.map((icon, index) => (
          <div
            key={index}
            className={styles.icon}
            style={getCircularPosition(index, icons.length)}
          >
            <img
              src={icon.image}
              alt={icon.name}
              className={styles.iconImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconCircle;
