import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// PWA Installation Prompt
let deferredPrompt: any;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("Install prompt ready");
});

// Show install button if prompt is available
window.addEventListener("DOMContentLoaded", () => {
  if (deferredPrompt) {
    // You can show an install button here if needed
    console.log("PWA can be installed");
  }
});

createRoot(document.getElementById("root")!).render(<App />);
