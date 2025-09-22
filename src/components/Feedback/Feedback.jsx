import React, { useState, useEffect } from "react";
import styles from "./FeedbackModal.module.css";
import { getActiveQuestion, submitAnswer } from "../../helpers/apiService"; // Adjust the import path as needed

const Feedback = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");

  // Fetch active question when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchActiveQuestion();
    }
  }, [isOpen]);

  const fetchActiveQuestion = async () => {
    setIsLoading(true);
    setError("");

    try {
      const activeQuestion = await getActiveQuestion();
      if (activeQuestion) {
        setQuestion(activeQuestion);
      } else {
        setError("Gagal memuat pertanyaan. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Gagal memuat pertanyaan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim() || !question) return;

    setIsSubmitting(true);
    setError("");

    try {
      await submitAnswer(feedback.trim(), question.id);

      // Success feedback
      console.log("Feedback submitted successfully");

      // Reset form and close modal
      setFeedback("");
      onClose();

      // Optional: Show success message to user
      // You can replace this with a proper toast/notification system
      alert("Terima kasih! Jawaban Anda telah berhasil dikirim.");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Gagal mengirim jawaban. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting && !isLoading) {
      setFeedback("");
      setError("");
      setQuestion(null);
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          disabled={isSubmitting || isLoading}
          aria-label="Tutup modal"
        >
          <svg viewBox="0 0 24 24" className={styles.closeIcon}>
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className={styles.modalBody}>
          <div className={styles.leftSection}>
            <h2 className={styles.hashtag}>#SharingEML</h2>
            <p className={styles.subtitle}>Jaring pendapat publik untuk AEML</p>
          </div>

          <div className={styles.rightSection}>
            {isLoading ? (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Memuat pertanyaan...</p>
              </div>
            ) : error ? (
              <div className={styles.errorState}>
                <p className={styles.errorMessage}>{error}</p>
                <button
                  onClick={fetchActiveQuestion}
                  className={styles.retryButton}
                >
                  Coba Lagi
                </button>
              </div>
            ) : question ? (
              <form onSubmit={handleSubmit} className={styles.feedbackForm}>
                <h3 className={styles.formTitle}>{question.question}</h3>

                <div className={styles.textareaContainer}>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Ketik jawaban kamu disini..."
                    className={styles.textarea}
                    rows={5}
                    maxLength={500}
                    disabled={isSubmitting}
                  />
                  <div className={styles.charCount}>{feedback.length}/500</div>
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={!feedback.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner}></div>
                      Mengirim...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            ) : (
              <div className={styles.noQuestionState}>
                <p>Tidak ada pertanyaan aktif saat ini.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
