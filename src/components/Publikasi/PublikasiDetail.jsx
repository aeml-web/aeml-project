import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // React Router v6
import { Download } from "lucide-react";
// Alternative: import { useRouter } from "next/router"; // Next.js

import { getPublicationById } from "../../helpers/apiService"; // adjust path if needed
import styles from "./publikasiDetail.module.css";

export default function PublicationDetail() {
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleDownload = () => {
    if (!formData.company.trim() || !formData.email.trim()) {
      alert("Please fill in both company and email fields");
      return;
    }

    // You can send form data to your API here before downloading
    if (publication?.downloadUrl) {
      window.open(publication.downloadUrl, "_blank");
    } else {
      window.open(`/api/publications/${id}/download`, "_blank");
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
    // Alternative: navigate('/publications'); // Go to publications list
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading publication details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
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

  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <button onClick={handleBack} className={styles.backBtn}>
          ← Back to Publications
        </button>

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
                <span className={styles.date}>{publication.date}</span>
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
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Alamat email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />

                <button
                  onClick={handleDownload}
                  className={styles.downloadButton}
                >
                  <Download size={14} />
                  Download File
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
