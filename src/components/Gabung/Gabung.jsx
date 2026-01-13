import React, { useState } from "react";
import styles from "./Gabung.module.css";
import { submitContactForm } from "../../helpers/apiService"; // Adjust the path to your apiService.js
import { useTranslation, Trans } from "react-i18next";

const Gabung = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sector: "",
    reason: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.sector &&
    formData.reason;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the API service
      await submitContactForm(formData);

      console.log("Form submitted successfully:", formData);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        sector: "",
        reason: "",
      });

      alert("Form berhasil dikirim! Kami akan segera menghubungi Anda.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="form-section" className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <div className={styles.textSection}>
          <h1 className={styles.mainTitle}>{t("join.becomePartOf")}</h1>
          <p className={styles.subtitleGabung}>{t("join.formNotice")}</p>
        </div>

        <div className={styles.formSection}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                {t("join.companyName")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.formInput}
                placeholder={t("join.companyName")}
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.formInput}
                placeholder="youremail@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.formLabel}>
                {t("join.phoneNumber")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={styles.formInput}
                placeholder="08xxx"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sector" className={styles.formLabel}>
                {t("join.companySector")}{" "}
              </label>
              <select
                id="sector"
                name="sector"
                className={styles.formSelect}
                value={formData.sector}
                onChange={handleChange}
                required
                disabled={isLoading}
              >
                <option value=""> {t("join.selectSector")}</option>
                <option value="Battery">Battery</option>
                <option value="Charging">Charging & Battery Swapping</option>
                <option value="Energy">Energy</option>
                <option value="ev">EV Manufacturer</option>
                <option value="Riding">Ride Hailing & Fleet Operator</option>
                <option value="financial">Financial & Market Developer</option>
                {/* <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Lainnya">Lainnya</option> */}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="reason" className={styles.formLabel}>
                {t("join.motivation")}
              </label>
              <textarea
                type="text"
                id="reason"
                name="reason"
                className={styles.formInputBig}
                placeholder={t("join.motivationPlaceholder")}
                value={formData.reason}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={`${styles.submitButton} ${
                isLoading ? styles.loading : ""
              } ${!isFormValid ? styles.disabled : ""}`}
              disabled={isLoading || !isFormValid}
            >
              <span>{isLoading ? "Mengirim..." : "Submit"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Gabung;
