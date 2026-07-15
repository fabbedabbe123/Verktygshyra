/**
 * auth.js — shared logic for login.html and register.html
 * Front-end only: validates input shape and shows feedback. Swap the
 * body of handleSubmit() for a real fetch() to POST /api/auth/... later.
 */
import { initNav, showToast } from "../js/ui.js";

function handleSubmit(form, successMessage) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const email = data.get("email");
    if (!email || !email.includes("@")) {
      showToast("Ange en giltig e-postadress");
      return;
    }
    showToast(successMessage);
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 900);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  if (loginForm) handleSubmit(loginForm, "Inloggning lyckades");
  if (registerForm) handleSubmit(registerForm, "Kontot skapades");
});
