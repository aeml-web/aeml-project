import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download } from "lucide-react";

import {
  getPublicationById,
  submitDownloadForm,
} from "../../helpers/apiService"; // adjust path if needed
import styles from "./publikasiDetail.module.css";
import Publikasi from "../HomePage/Publikasi";
import PublikasiDetail from "../HomePage/PublikasiDetail";

export default function PublicationDetail() {
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
      alert("Please fill in both company and email fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit download request to backend (sends email notification)
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

      alert("Download berhasil! Terima kasih telah mengisi formulir.");
    } catch (error) {
      console.error("Error submitting download request:", error);
      alert("Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.");
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
        <div className={styles.loading}>Loading publication details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.containerPub}>
        <button onClick={handleBack} className={styles.backBtn}>
          ← Back
        </button>
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className={styles.container}>
        <button onClick={handleBack} className={styles.backBtn}>
          ← Back
        </button>
        <div className={styles.error}>
          <p>Publication not found.</p>
        </div>
      </div>
    );
  }

  // Check if all fields are filled
  const isFormValid =
    formData.company.trim() !== "" && formData.email.trim() !== "";

  return (
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
                  {publication.tags}
                </span>
                <span className={styles.date}>
                  {new Date(publication.createdAt).toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {publication.subtitle && (
                <p className={styles.subtitle}>{publication.subtitle}</p>
              )}
            </div>

            <div className={styles.bottom}>
              <p className={styles.downloadText}>
                Mohon mengisi data diri terlebih dahulu untuk mengunduh
                publikasi ini.
              </p>

              <div className={styles.form}>
                <input
                  type="text"
                  name="company"
                  placeholder="Ketik perusahaan atau instansimu"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Alamat email"
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
                  {isSubmitting ? "Processing..." : "Download File"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PublikasiDetail />
    </div>
  );
}
