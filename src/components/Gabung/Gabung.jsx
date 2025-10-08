import React, { useState } from "react";
import styles from "./Gabung.module.css";

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);

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
                <option value="energy">Energy</option>
                <option value="transportation">Transportation</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="construction">Construction</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
                <option value="agriculture">Agriculture</option>
                <option value="other">Lainnya</option>
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
