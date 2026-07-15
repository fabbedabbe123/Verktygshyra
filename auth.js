/* ==========================================================================
   DESIGN TOKENS — Verktygshyra
   Centralized design system. Change values here to re-theme the whole app.
   ========================================================================== */

:root {
  /* ---- Color: core ---- */
  --color-bg: #ffffff;
  --color-bg-soft: #fafaf8;
  --color-surface: #ffffff;
  --color-text: #16181d;
  --color-text-muted: #63696f;
  --color-text-faint: #9aa0a6;
  --color-border: #ebebe8;
  --color-border-strong: #dcdcd8;

  /* ---- Color: brand green ---- */
  --color-green-900: #0e3d27;
  --color-green-700: #14603c;
  --color-green-600: #1b7a4d;
  --color-green-500: #1f8f59;
  --color-green-400: #2fa86d;
  --color-green-100: #e7f5ee;
  --color-green-50:  #f2faf6;

  /* ---- Color: accents ---- */
  --color-warn: #b8860b;
  --color-danger: #c0392b;
  --color-star: #e0a72e;

  /* ---- Shadows ---- */
  --shadow-xs: 0 1px 2px rgba(16, 20, 18, 0.04);
  --shadow-sm: 0 2px 8px rgba(16, 20, 18, 0.06);
  --shadow-md: 0 8px 24px rgba(16, 20, 18, 0.08);
  --shadow-lg: 0 20px 48px rgba(16, 20, 18, 0.12);
  --shadow-focus: 0 0 0 3px rgba(31, 143, 89, 0.35);

  /* ---- Radius ---- */
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;

  /* ---- Type ---- */
  --font-display: "Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif;
  --font-body: "Inter", "Segoe UI", system-ui, sans-serif;

  --fs-2xs: 0.75rem;
  --fs-xs: 0.8125rem;
  --fs-sm: 0.9375rem;
  --fs-md: 1rem;
  --fs-lg: 1.125rem;
  --fs-xl: 1.375rem;
  --fs-2xl: 1.75rem;
  --fs-3xl: 2.25rem;
  --fs-4xl: 3rem;
  --fs-5xl: 3.75rem;

  /* ---- Spacing scale ---- */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;

  /* ---- Layout ---- */
  --container-max: 1200px;
  --nav-height: 76px;

  /* ---- Motion ---- */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 150ms;
  --dur-base: 280ms;
  --dur-slow: 480ms;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
