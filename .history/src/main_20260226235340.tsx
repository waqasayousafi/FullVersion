import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Manual Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    console.log("Attempting to register service worker...");

    // First try with explicit scope
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("✅ Service Worker registered successfully:", registration);

        // Check if the service worker is activated
        if (registration.active) {
          console.log("✅ Service Worker is active");
        } else if (registration.installing) {
          console.log("⏳ Service Worker is installing...");
          registration.installing.addEventListener("statechange", () => {
            if (registration.installing?.state === "activated") {
              console.log("✅ Service Worker activated");
            }
          });
        }

        // Check for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                console.log("New content is available; please refresh.");
              }
            });
          }
        });
      })
      .catch((error) => {
        console.log("❌ Service Worker registration failed:", error);

        // Check if it's a MIME type error and provide alternative
        if (error.message.includes("MIME type")) {
          console.log(
            "⚠️ MIME type error detected. PWA may still work for installation.",
          );
        }

        // Continue with PWA installation prompt even without service worker
        console.log("Continuing with PWA installation check...");
        checkPWAInstallation();
      });
  });
}

// Function to check PWA installation eligibility
function checkPWAInstallation() {
  console.log("🔍 Checking PWA installation eligibility...");
  console.log(
    "- Service Worker API:",
    "serviceWorker" in navigator ? "✅" : "❌",
  );
  console.log(
    "- Manifest:",
    document.querySelector('link[rel="manifest"]') ? "✅" : "❌",
  );
  console.log(
    "- HTTPS:",
    location.protocol === "https:" || location.hostname === "localhost"
      ? "✅"
      : "❌",
  );
  console.log("- User Agent:", navigator.userAgent);

  // Check if we're in standalone mode already
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  console.log(
    "- Standalone Mode:",
    isStandalone ? "✅ Already installed" : "❌ Not installed",
  );

  // Simulate user engagement to trigger install prompt
  setTimeout(() => {
    console.log("🎯 Simulating user engagement for install prompt...");
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("click"));
  }, 1000);
}

// PWA Installation Prompt - Native Only
let deferredPrompt: any;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("Native install prompt ready - use browser Add to Home Screen");
});

// Check PWA installation status
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
  console.log(
    "PWA Check - HTTPS:",
    location.protocol === "https:" || location.hostname === "localhost",
  );

  if (deferredPrompt) {
    console.log("PWA can be installed - use browser Add to Home Screen option");
  } else {
    console.log(
      "PWA install prompt not available yet - interact with the app first",
    );
  }
});

createRoot(document.getElementById("root")!).render(<App />);
