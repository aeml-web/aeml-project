import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // For React Router
// Or use: import { useRouter } from "next/router"; // For Next.js
import NewsDetailComponent from "./NewsDetailComponent";

const NewsDetailPage = ({ allArticles }) => {
  const { id } = useParams(); // Get article ID from URL
  const location = useLocation(); // Get passed state data
  const navigate = useNavigate(); // For navigation
  // Or for Next.js: const router = useRouter();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    // Try to get article from passed state first
    if (location.state && location.state.article) {
      setArticle(location.state.article);
    }
    // Otherwise, find article by ID from allArticles prop
    else if (allArticles && id) {
      const foundArticle = allArticles.find(
        (item) => item.id.toString() === id
      );
      setArticle(foundArticle);
    }
  }, [id, location.state, allArticles]);

  useEffect(() => {
    // Generate related articles when article is loaded
    if (article && allArticles) {
      const otherArticles = allArticles.filter(
        (item) => item.id !== article.id
      );
      const shuffled = otherArticles.sort(() => 0.5 - Math.random());
      setRelatedArticles(shuffled.slice(0, 4));
    }
  }, [article, allArticles]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
    // Or navigate to specific route: navigate("/news");
  };

  if (!article) {
    return <div>Loading article...</div>;
  }

  return (
    <NewsDetailComponent
      article={article}
      relatedArticles={relatedArticles}
      onBack={handleBack}
    />
  );
};

export default NewsDetailPage;
