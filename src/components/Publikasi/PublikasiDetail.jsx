import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";

import {
  getPublicationById,
  submitDownloadForm,
} from "../../helpers/apiService";
import styles from "./publikasiDetail.module.css";
import Publikasi from "../HomePage/Publikasi";
import PublikasiDetail from "../HomePage/PublikasiDetail";
import { motion } from "framer-motion";

export default function PublicationDetail() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    email: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Translate categories using i18n
  const translateCategory = (category) => {
    if (!category) return "";
    const categoryKey = category.toLowerCase();
    const categoryMap = {
      edaran: t("publications.circulars"),
      laporan: t("publications.reports"),
      peraturan: t("publications.regulations"),
    };
    return categoryMap[categoryKey] || category;
  };

  // Format date based on language
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return dateString;
      }

      if (currentLang === "id") {
        const monthsID = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];
        return `${monthsID[date.getMonth()]} ${date.getFullYear()}`;
      } else {
        const monthsEN = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return `${monthsEN[date.getMonth()]} ${date.getFullYear()}`;
      }
    } catch (e) {
      return dateString;
    }
  };

  useEffect(() => {
    const loadPublication = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getPublicationById(id);
        setPublication(data);
      } catch (err) {
        setError("Failed to load publication details.");
        console.error("Error fetching publication:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPublication();
  }, [id]);

  const handleDownload = async () => {
    if (!isFormValid) return;

    if (!formData.company.trim() || !formData.email.trim()) {
      alert(
        currentLang === "id"
          ? "Mohon isi kolom perusahaan dan email"
          : "Please fill in both company and email fields"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit download request to backend
      await submitDownloadForm(
        {
          company: formData.company,
          email: formData.email,
          publicationId: id,
          publicationTitle: publication?.title,
        },
        id
      );

      // After successful submission, trigger download
      if (publication?.linkDownload) {
        window.open(publication.linkDownload, "_blank");
      } else {
        window.open(`/api/publications/${id}/download`, "_blank");
      }

      // Reset form
      setFormData({
        company: "",
        email: "",
      });

      alert(
        currentLang === "id"
          ? "Download berhasil! Terima kasih telah mengisi formulir."
          : "Download successful! Thank you for filling out the form."
      );
    } catch (error) {
      console.error("Error submitting download request:", error);
      alert(
        currentLang === "id"
          ? "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi."
          : "An error occurred while processing your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className={styles.containerPub}>
        <div className={styles.loading}>{t("home.load")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.containerPub}>
        <button onClick={handleBack} className={styles.backBtn}>
          ← {currentLang === "id" ? "Kembali" : "Back"}
        </button>
        <div className={styles.error}>
          <p>{t("home.failedLoad")}</p>
        </div>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className={styles.container}>
        <button onClick={handleBack} className={styles.backBtn}>
          ← {currentLang === "id" ? "Kembali" : "Back"}
        </button>
        <div className={styles.error}>
          <p>
            {currentLang === "id"
              ? "Publikasi tidak ditemukan."
              : "Publication not found."}
          </p>
        </div>
      </div>
    );
  }

  // Check if all fields are filled
  const isFormValid =
    formData.company.trim() !== "" && formData.email.trim() !== "";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-9"
    >
      <div className={styles.container}>
        <div className={styles.containerContent}>
          <div className={styles.content}>
            {/* Left side - Publication Image */}
            <div className={styles.imageSection}>
              <div className={styles.publicationImage}>
                {publication.image ? (
                  <img src={publication.image} alt={publication.title} />
                ) : (
                  <div>
                    <div className={styles.imagePlaceholder}>
                      {publication.title}
                    </div>
                    {publication.subtitle && (
                      <div className={styles.imageSubtitle}>
                        {publication.subtitle}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Details */}
            <div className={styles.detailSection}>
              <div className={styles.top}>
                <h1 className={styles.title}>{publication.title}</h1>

                <div className={styles.meta}>
                  <span
                    className={`${styles.category} ${
                      publication.type === "Research"
                        ? styles.categoryResearch
                        : styles.categoryDefault
                    }`}
                  >
                    {translateCategory(publication.tags)}
                  </span>
                  <span className={styles.date}>
                    {formatDate(publication.createdAt)}
                  </span>
                </div>

                {publication.subtitle && (
                  <p className={styles.subtitle}>{publication.subtitle}</p>
                )}
              </div>

              <div className={styles.bottom}>
                <p className={styles.downloadText}>
                  {t("publications.downloadNotice")}
                </p>

                <div className={styles.form}>
                  <input
                    type="text"
                    name="company"
                    placeholder={
                      currentLang === "id"
                        ? "Ketik perusahaan atau instansimu"
                        : "Enter your company or institution"
                    }
                    value={formData.company}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    disabled={isSubmitting}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={
                      currentLang === "id" ? "Alamat email" : "Email address"
                    }
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    disabled={isSubmitting}
                  />

                  <button
                    onClick={handleDownload}
                    disabled={!isFormValid || isSubmitting}
                    className={`${styles.downloadButton} ${
                      !isFormValid || isSubmitting ? styles.disabled : ""
                    }`}
                  >
                    <Download size={14} />
                    {isSubmitting
                      ? currentLang === "id"
                        ? "Memproses..."
                        : "Processing..."
                      : currentLang === "id"
                      ? "Unduh File"
                      : "Download File"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PublikasiDetail />
      </div>
    </motion.div>
  );
}
