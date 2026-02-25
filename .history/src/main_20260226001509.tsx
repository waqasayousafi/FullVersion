import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Register service worker for PWA using vite-plugin-pwa
if ("serviceWorker" in navigator) {
  import("./registerSW.js")
    .then(() => {
      console.log("Service Worker registered successfully");
    })
    .catch((error) => {
      console.log("Service Worker registration failed:", error);
    });
}

createRoot(document.getElementById("root")!).render(<App />);
