/**
 * ui.js
 * ---------------------------------------------------------------------------
 * Shared, page-agnostic UI behaviors imported by every page's entry script:
 *  - initNav(): sticky nav shadow-on-scroll + mobile menu toggle
 *  - initReveal(): IntersectionObserver-driven scroll reveal for .reveal els
 *  - showToast(message): small transient confirmation message
 * ---------------------------------------------------------------------------
 */

export function initNav() {
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const hamburger = document.querySelector(".hamburger");
  const mobileLinks = document.querySelector(".nav-links");
  if (hamburger && mobileLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileLinks.classList.toggle("is-open-mobile");
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });
  }
}

let revealObserver = null;

export function initReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
  }

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    revealObserver.observe(el);
  });
}

let toastTimeout = null;

export function showToast(message, duration = 2600) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add("is-visible"));

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, duration);
}
