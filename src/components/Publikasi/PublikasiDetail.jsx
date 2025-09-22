import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // React Router v6
import { Download } from "lucide-react";
// Alternative: import { useRouter } from "next/router"; // Next.js

import { getPublicationById } from "../../helpers/apiService"; // adjust path if needed

export default function PublicationDetail() {
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    company: "",
    email: "",
  });

  // React Router v6
  const { id } = useParams();
  const navigate = useNavigate();

  // Alternative for Next.js:
  // const router = useRouter();
  // const { id } = router.query;

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

  const styles = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #e8f4fd 0%, #d1e7ff 50%, #c9ddff 100%)",
      padding: "3rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      display: "flex",
      gap: "2rem",
      maxWidth: "900px",
      width: "100%",
      alignItems: "flex-start",
      background: "white",
      borderRadius: "8px",
      padding: "2rem",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      border: "3px solid #4A90E2",
    },
    imageSection: {
      flex: "0 0 280px",
    },
    publicationImage: {
      width: "100%",
      height: "350px",
      borderRadius: "8px",
      objectFit: "cover",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      textAlign: "center",
      position: "relative",
    },
    detailSection: {
      flex: 1,
      paddingLeft: "1rem",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#333",
      margin: "0 0 0.5rem 0",
      lineHeight: "1.3",
    },
    meta: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1rem",
    },
    category: {
      background: publication?.type === "Research" ? "#8BC34A" : "#4A90E2",
      color: "white",
      padding: "0.25rem 0.75rem",
      borderRadius: "12px",
      fontSize: "0.8rem",
      fontWeight: "500",
    },
    date: {
      color: "#666",
      fontSize: "0.85rem",
    },
    subtitle: {
      color: "#666",
      fontSize: "0.9rem",
      lineHeight: "1.5",
      marginBottom: "1.5rem",
    },
    downloadText: {
      color: "#333",
      fontSize: "0.9rem",
      marginBottom: "1rem",
      lineHeight: "1.4",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    input: {
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "0.85rem",
      background: "#f8f9fa",
      outline: "none",
      color: "#333",
    },
    downloadButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.25rem",
      background: "#f8f9fa",
      color: "#666",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "0.85rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginTop: "0.5rem",
    },
    loading: {
      textAlign: "center",
      padding: "2rem",
      fontSize: "1.1rem",
      color: "#666",
    },
    error: {
      textAlign: "center",
      padding: "2rem",
      color: "#d32f2f",
    },
    backBtn: {
      position: "absolute",
      top: "2rem",
      left: "2rem",
      padding: "0.5rem 1rem",
      background: "white",
      border: "2px solid #4A90E2",
      borderRadius: "4px",
      color: "#4A90E2",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading publication details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <button onClick={handleBack} style={styles.backBtn}>
          ← Back
        </button>
        <div style={styles.error}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!publication) {
    return (
      <div style={styles.container}>
        <button onClick={handleBack} style={styles.backBtn}>
          ← Back
        </button>
        <div style={styles.error}>
          <p>Publication not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button
        onClick={handleBack}
        style={styles.backBtn}
        onMouseEnter={(e) => {
          e.target.style.background = "#4A90E2";
          e.target.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "white";
          e.target.style.color = "#4A90E2";
        }}
      >
        ← Back to Publications
      </button>

      <div style={styles.content}>
        {/* Left side - Publication Image */}
        <div style={styles.imageSection}>
          <div style={styles.publicationImage}>
            {publication.image ? (
              <img
                src={publication.image}
                alt={publication.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {publication.title}
                </div>
                {publication.subtitle && (
                  <div style={{ fontSize: "10px", opacity: "0.9" }}>
                    {publication.subtitle}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Details */}
        <div style={styles.detailSection}>
          <h1 style={styles.title}>{publication.title}</h1>

          <div style={styles.meta}>
            <span style={styles.category}>{publication.type}</span>
            <span style={styles.date}>{publication.date}</span>
          </div>

          {publication.subtitle && (
            <p style={styles.subtitle}>{publication.subtitle}</p>
          )}

          {publication.description && (
            <p style={styles.subtitle}>{publication.description}</p>
          )}

          {publication.author && (
            <div style={{ ...styles.subtitle, fontWeight: "500" }}>
              <strong>Author:</strong> {publication.author}
            </div>
          )}

          {publication.tags && publication.tags.length > 0 && (
            <div style={{ ...styles.subtitle, marginBottom: "1rem" }}>
              <strong>Tags:</strong> {publication.tags.join(", ")}
            </div>
          )}

          <p style={styles.downloadText}>
            Mohon mengisi data diri terlebih dahulu untuk mengunduh publikasi
            ini.
          </p>

          <div style={styles.form}>
            <input
              type="text"
              name="company"
              placeholder="Ketik perusahaan atau instansimu"
              value={formData.company}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Alamat email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
            />

            <button
              onClick={handleDownload}
              style={styles.downloadButton}
              onMouseEnter={(e) => {
                e.target.style.background = "#e9ecef";
                e.target.style.borderColor = "#ccc";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#f8f9fa";
                e.target.style.borderColor = "#ddd";
              }}
            >
              <Download size={14} />
              Download File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
