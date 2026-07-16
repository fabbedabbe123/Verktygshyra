/**
 * dashboard.js — shared logic for profile.html, my-tools.html, my-bookings.html
 * Highlights the active sidebar link based on the current page filename.
 */
import { initNav } from "../js/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  const current = window.location.pathname.split("/").pop();
  document.querySelectorAll(".dash-nav a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("is-active");
    }
  });
});
