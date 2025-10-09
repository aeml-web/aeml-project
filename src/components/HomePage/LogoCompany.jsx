// AEMLAnimatedLogos.jsx
import React, { useState } from "react";
import styles from "./homepage.module.css";

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

const LogoCompany = () => {
  const [hoveredLogo, setHoveredLogo] = useState(null);

  const firstRowLogos = [
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
  ];

  const secondRowLogos = [
    { name: "OKLI", style: "okli", image: okliLogo },
    { name: "OYOXA", style: "oyoxa", image: oyoxaLogo },
    { name: "PERTAMINA", style: "pertamina", image: pertaminaLogo },
    { name: "PLN", style: "pln", image: plnLogo },
    { name: "SMOOT", style: "smoot", image: smootLogo },
    { name: "TBS", style: "tbs", image: tbsLogo },
    { name: "UTOMO", style: "utomo", image: utomoLogo },
    { name: "VIAR", style: "viar", image: viarLogo },
    { name: "VKTR", style: "vktr", image: vktrLogo },
    { name: "VOLTA", style: "volta", image: voltaLogo },
  ];

  const renderLogoTrack = (logos, direction) => (
    <div className={styles.logoRow}>
      <div
        className={`${styles.logoTrack} ${
          direction === "left" ? styles.moveLeft : styles.moveRight
        }`}
      >
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className={styles.logoItem}
            onMouseEnter={() => setHoveredLogo(`${logo.name}-${index}`)}
            onMouseLeave={() => setHoveredLogo(null)}
          >
            <img src={logo.image} alt={logo.alt} className={styles.logoImage} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.titleLogo}>Perusahaan anggota AEML</h1>

        {/* First row - moving left */}
        {renderLogoTrack(firstRowLogos, "left")}

        {/* Second row - moving right */}
        {renderLogoTrack(secondRowLogos, "right")}
      </div>
    </div>
  );
};

export default LogoCompany;
