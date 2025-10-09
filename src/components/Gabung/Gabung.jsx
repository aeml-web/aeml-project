import React, { useState } from "react";
import styles from "./Gabung.module.css";
import { submitContactForm } from "../../helpers/apiService"; // Adjust the path to your apiService.js

const Gabung = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sector: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const isFormValid =
    formData.name && formData.email && formData.phone && formData.sector;

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
          <h1 className={styles.mainTitle}>Bergabung bersama AEML</h1>
          <p className={styles.subtitleGabung}>
            Kami akan segera menghubungi anda setelah form pendaftaran telah
            kami terima.
          </p>
        </div>

        <div className={styles.formSection}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Nama perusahaan atau lembaga
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.formInput}
                placeholder="Nama perusahaan atau lembaga"
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
                Nomor telepon
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
                Sektor perusahaan
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
                <option value="">Pilih sektor perusahaan disini</option>
                <option value="Energy">Energy</option>
                <option value="Transportation">Transportation</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Construction">Construction</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Lainnya">Lainnya</option>
              </select>
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
