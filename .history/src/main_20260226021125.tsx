import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// PWA Installation Prompt
let deferredPrompt: any;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("Install prompt ready");

  // Show install button
  const installButton = document.createElement("button");
  installButton.textContent = "Install App";
  installButton.style.position = "fixed";
  installButton.style.top = "10px";
  installButton.style.right = "10px";
  installButton.style.zIndex = "9999";
  installButton.style.padding = "10px";
  installButton.style.backgroundColor = "#FF0050";
  installButton.style.color = "white";
  installButton.style.border = "none";
  installButton.style.borderRadius = "5px";
  installButton.style.cursor = "pointer";

  installButton.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
      installButton.remove();
    }
  });

  document.body.appendChild(installButton);
});

// Check if app is already installed
window.addEventListener("DOMContentLoaded", () => {
  console.log("PWA Check - Service Worker:", "serviceWorker" in navigator);
  console.log(
    "PWA Check - Manifest:",
    document.querySelector('link[rel="manifest"]'),
  );
  console.log(
    "PWA Check - Display Mode:",
    window.matchMedia("(display-mode: standalone)").matches
      ? "standalone"
      : "browser",
  );

  if (deferredPrompt) {
    console.log("PWA can be installed");
  } else {
    console.log("PWA install prompt not available");
  }
});

createRoot(document.getElementById("root")!).render(<App />);
