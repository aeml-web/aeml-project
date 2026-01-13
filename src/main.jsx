// Di main.jsx atau index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n"; // ← tambahkan ini di paling atasnp
import App from "./App.jsx";
import "./index.css";

// Disable browser scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Force scroll to top on page load
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
