import React, { useState, useEffect } from "react";
import styles from "./FeedbackModalHome.module.css";
import {
  getActiveQuestion,
  submitAnswer,
  submitContactUsAnswer,
} from "../../helpers/apiService";
import { useTranslation, Trans } from "react-i18next";

const FeedbackHome = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { t, i18n } = useTranslation();

  // Fetch active question on component mount
  useEffect(() => {
    fetchActiveQuestion();
  }, []);

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
    setSuccessMessage("");

    try {
      await submitAnswer(feedback.trim(), question.id);
      await submitContactUsAnswer(
        feedback.trim(),
        question.id,
        question.question // Pass the actual question text
      );
      // Success feedback
      console.log("Feedback submitted successfully");
      setSuccessMessage("Terima kasih! Jawaban Anda telah berhasil dikirim.");

      // Reset form
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Gagal mengirim jawaban. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSuccessMessage("");
    fetchActiveQuestion();
  };

  if (isLoading) {
    return (
      <div className={styles.modalContent}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Memuat pertanyaan...</p>
        </div>
      </div>
    );
  }

  if (error && !question) {
    return (
      <div className={styles.modalContent}>
        <div className={styles.errorState}>
          <p className={styles.errorMessage}>{error}</p>
          <button onClick={handleRetry} className={styles.retryButton}>
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className={styles.modalContent}>
        <div className={styles.noQuestionState}>
          <p>Tidak ada pertanyaan aktif saat ini.</p>
          <button onClick={handleRetry} className={styles.retryButton}>
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.backgroundFeedback}>
      <div className={styles.modalContent}>
        <div className={styles.leftSection}>
          <h2 className={styles.hashtag}>{t("sharing.hashtag")}</h2>
          <p className={styles.subtitle}>{t("sharing.subtitle")}</p>
        </div>

        <div className={styles.rightSection}>
          <form onSubmit={handleSubmit} className={styles.feedbackForm}>
            <h3 className={styles.formTitle}>{question.question}</h3>

            <div className={styles.textareaContainer}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t("sharing.placeholder")}
                className={styles.textarea}
                rows={5}
                maxLength={500}
                disabled={isSubmitting}
              />
              <div className={styles.charCount}>{feedback.length}/500</div>
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}
            {successMessage && (
              <p className={styles.successMessage}>{successMessage}</p>
            )}

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
        </div>
      </div>
    </div>
  );
};

export default FeedbackHome;
