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
        console.log("Service Worker registered successfully:", registration);

        // Check if the service worker is activated
        if (registration.active) {
          console.log("Service Worker is active");
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
              } else if (newWorker.state === "activated") {
                console.log("Service Worker activated");
              }
            });
          }
        });
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);

        // Check if it's a MIME type error and provide alternative
        if (error.message.includes("MIME type")) {
          console.log(
            "MIME type error detected. This might be a server configuration issue.",
          );
          console.log(
            "The PWA may still work for installation, but offline features will be limited.",
          );

          // Continue with PWA installation prompt even without service worker
          console.log(
            "Continuing with PWA installation without service worker...",
          );
          checkPWAInstallation();
        } else {
          console.log("Trying alternative registration...");

          // Try alternative registration without scope
          navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
              console.log(
                "Alternative Service Worker registration successful:",
                registration,
              );
              checkPWAInstallation();
            })
            .catch((altError) => {
              console.log(
                "Alternative Service Worker registration also failed:",
                altError,
              );
              console.log("Continuing without service worker...");
              checkPWAInstallation();
            });
        }
      });
  });
}

// Function to check PWA installation eligibility
function checkPWAInstallation() {
  console.log("Checking PWA installation eligibility...");
  console.log("- Service Worker API:", "serviceWorker" in navigator);
  console.log("- Manifest:", !!document.querySelector('link[rel="manifest"]'));
  console.log(
    "- HTTPS:",
    location.protocol === "https:" || location.hostname === "localhost",
  );
  console.log("- User Agent:", navigator.userAgent);

  // Simulate user engagement to trigger install prompt
  setTimeout(() => {
    console.log("Simulating user engagement for install prompt...");
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("click"));
  }, 1000);
}

// PWA Installation Prompt
let deferredPrompt: any;
let installButton: HTMLButtonElement | null = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("Install prompt ready");

  // Show install button
  showInstallButton();
});

// Function to show install button
function showInstallButton() {
  if (installButton) return; // Button already exists

  installButton = document.createElement("button");
  installButton.textContent = "📱 Install App";
  installButton.style.position = "fixed";
  installButton.style.top = "10px";
  installButton.style.right = "10px";
  installButton.style.zIndex = "9999";
  installButton.style.padding = "12px 20px";
  installButton.style.backgroundColor = "#FF0050";
  installButton.style.color = "white";
  installButton.style.border = "none";
  installButton.style.borderRadius = "8px";
  installButton.style.cursor = "pointer";
  installButton.style.fontWeight = "bold";
  installButton.style.fontSize = "14px";
  installButton.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

  installButton.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
      if (installButton) {
        installButton.remove();
        installButton = null;
      }
    }
  });

  document.body.appendChild(installButton);
}

// Manual install trigger (for testing)
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

  // Add manual install button for testing
  setTimeout(() => {
    if (!deferredPrompt && !installButton) {
      console.log("No install prompt available, showing manual install button");
      const manualButton = document.createElement("button");
      manualButton.textContent = "🔧 Manual Install";
      manualButton.style.position = "fixed";
      manualButton.style.bottom = "10px";
      manualButton.style.right = "10px";
      manualButton.style.zIndex = "9999";
      manualButton.style.padding = "10px 15px";
      manualButton.style.backgroundColor = "#007bff";
      manualButton.style.color = "white";
      manualButton.style.border = "none";
      manualButton.style.borderRadius = "5px";
      manualButton.style.cursor = "pointer";
      manualButton.style.fontSize = "12px";

      manualButton.addEventListener("click", () => {
        console.log("Checking for PWA install eligibility...");
        console.log("User engagement: Simulated");
        console.log(
          "Service Worker:",
          navigator.serviceWorker && navigator.serviceWorker.ready,
        );
        console.log(
          "Manifest:",
          document.querySelector('link[rel="manifest"]'),
        );
        console.log(
          "HTTPS:",
          location.protocol === "https:" || location.hostname === "localhost",
        );

        // Try to trigger install prompt manually
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.ready.then(() => {
            console.log(
              "Service Worker is ready, trying to trigger install...",
            );
            window.dispatchEvent(new Event("beforeinstallprompt"));
          });
        }
      });

      document.body.appendChild(manualButton);
    }
  }, 2000);

  if (deferredPrompt) {
    console.log("PWA can be installed");
  } else {
    console.log(
      "PWA install prompt not available - user may need to interact more with the app",
    );
  }
});

createRoot(document.getElementById("root")!).render(<App />);
