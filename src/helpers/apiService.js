// handlers/articleService.js

const API_BASE_URL = "https://doa-backend.my.id/api/v3";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInRlbmFudF9pZCI6IkFlbWxBZG1pbiIsImlhdCI6MTc1NzA2NjM5NSwiZXhwIjoxNzU3MDczNTk1fQ.h2p8uL_GVDIeShyftXHOJlK5nDYR4JeariKDi79Hbkc";

/**
 * Generic API fetch function
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Object>} API response
 */
const fetchFromAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Fetch articles from the API
 * @returns {Promise<Object>} API response with articles data
 */
export const fetchArticles = async () => {
  return await fetchFromAPI("/articles");
};

/**
 * Fetch publications from the API
 * @returns {Promise<Object>} API response with publications data
 */
export const fetchPublications = async () => {
  return await fetchFromAPI("/publications");
};

/**
 * Transform API article data to match component structure
 * @param {Array} apiArticles - Raw articles from API
 * @returns {Array} Transformed articles for component use
 */
export const transformArticleData = (apiArticles) => {
  return apiArticles.map((article, index) => ({
    id: article.id,
    title: article.title,
    preview: article.subtitle || article.body?.substring(0, 100) + "...",
    date: formatDate(article.createdAt),
    image:
      article.images && article.images.length > 0
        ? article.images[0]
        : `https://picsum.photos/id/${1011 + index}/800/500`, // fallback image
    featured: index === 0, // First item is featured
    body: article.body,
    type: article.type,
    linkDownload: article.linkDownload,
  }));
};

/**
 * Transform API publication data to match component structure
 * @param {Array} apiPublications - Raw publications from API
 * @returns {Array} Transformed publications for component use
 */
export const transformPublicationData = (apiPublications) => {
  return apiPublications.map((publication, index) => ({
    id: publication.id,
    title: publication.title,
    subtitle: publication.subtitle,
    image:
      publication.images && publication.images.length > 0
        ? publication.images[0]
        : `https://picsum.photos/id/${1011 + index}/800/500`, // fallback image
    readText: "Baca Publikasi",
    body: publication.body,
    type: publication.type,
    linkDownload: publication.linkDownload,
    createdAt: publication.createdAt,
    updatedAt: publication.updatedAt,
  }));
};

/**
 * Format date string to Indonesian format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
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

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * Get articles with error handling and data transformation
 * @returns {Promise<Array>} Transformed articles array
 */
export const getArticles = async () => {
  try {
    const response = await fetchArticles();

    if (response.statusCode === 200 && response.data) {
      return transformArticleData(response.data);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error getting articles:", error);
    // Return fallback data in case of error
    return getFallbackArticles();
  }
};

/**
 * Get publications with error handling and data transformation
 * @returns {Promise<Array>} Transformed publications array
 */
export const getPublications = async () => {
  try {
    const response = await fetchPublications();

    if (response.statusCode === 200 && response.data) {
      return transformPublicationData(response.data);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error getting publications:", error);
    // Return fallback data in case of error
    return getFallbackPublications();
  }
};

/**
 * Fallback articles data in case API fails
 * @returns {Array} Fallback articles
 */
const getFallbackArticles = () => [
  {
    id: 1,
    title: "Insert teks judul disini maks. 2 baris.",
    preview:
      "Preview kalimat awal dari artikelnya, bisa maksimal 2 baris aja, tidak lebih.",
    date: "5 Juli 2023",
    image: "https://picsum.photos/id/1011/800/500",
    featured: true,
  },
  {
    id: 2,
    title: "Insert teks judul disini maks. 2 baris",
    date: "5 Juli 2023",
    image: "https://picsum.photos/id/1015/800/500",
  },
  {
    id: 3,
    title: "Insert teks judul disini maks. 2 baris",
    date: "5 Juli 2023",
    image: "https://picsum.photos/id/1016/800/500",
  },
  {
    id: 4,
    title: "Insert teks judul disini maks. 2 baris",
    date: "5 Juli 2023",
    image: "https://picsum.photos/id/1025/800/500",
  },
];

/**
 * Fallback publications data in case API fails
 * @returns {Array} Fallback publications
 */
const getFallbackPublications = () => [
  {
    id: 1,
    image: "https://picsum.photos/id/1011/800/500",
    title: "Indonesia's electric vehicle outlook maksimum 3 line.",
    readText: "Baca Publikasi",
  },
  {
    id: 2,
    image: "https://picsum.photos/id/1015/800/500",
    title: "Electrifying Indonesia's Two-Wheeler Industry",
    readText: "Baca Publikasi",
  },
  {
    id: 3,
    image: "https://picsum.photos/id/1016/800/500",
    title: "Transforming Indonesia's Transportation",
    readText: "Baca Publikasi",
  },
];

/**
 * Fetch a single article by ID
 * @param {number|string} id - Article ID
 * @returns {Promise<Object>} Transformed article
 */
export const getArticleById = async (id) => {
  try {
    const response = await fetchFromAPI(`/articles/${id}`);

    if (response.statusCode === 200 && response.data) {
      return {
        id: response.data.id,
        title: response.data.title,
        subtitle: response.data.subtitle,
        body: response.data.body,
        images: response.data.images,
        type: response.data.type,
        linkDownload: response.data.linkDownload,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
      };
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return null;
  }
};

export const getPublicationById = async (id) => {
  try {
    const response = await fetchFromAPI(`/publications/${id}`);

    if (response.statusCode === 200 && response.data) {
      const publication = response.data;
      return {
        id: publication.id,
        title: publication.title,
        subtitle: publication.subtitle,
        body: publication.body,
        image:
          publication.images && publication.images.length > 0
            ? publication.images[0]
            : null,
        images: publication.images || [],
        type: publication.type,
        linkDownload: publication.linkDownload,
        isDeleted: publication.isDeleted,
        isShowed: publication.isShowed,
        tenantId: publication.tenant_id,
        createdAt: publication.createdAt,
        updatedAt: publication.updatedAt,
        // Format date for display
        date: new Date(publication.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching publication by ID:", error);
    return null;
  }
};

// Add this function to your apiService.js file

export const getActiveQuestion = async () => {
  try {
    const response = await fetchFromAPI("/questions/active");

    if (response.statusCode === 200 && response.data) {
      const question = response.data;
      return {
        id: question.id,
        question: question.question,
        isActive: question.isActive,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      };
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching active question:", error);
    return null;
  }
};

export const submitAnswer = async (answer, questionId) => {
  try {
    const payload = {
      answer: answer,
      aemlAdminQuestionId: questionId,
    };

    const response = await fetch(`${API_BASE_URL}/answers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.statusCode === 201) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to submit answer");
    }
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};
