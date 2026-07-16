/**
 * main.js
 * ---------------------------------------------------------------------------
 * Entry point for the homepage (index.html). Handles:
 *  - Rendering categories + featured tools from the mock data layer
 *  - Nav scroll state
 *  - Scroll-reveal animations
 *  - Favorite-toggle + toast feedback (front-end only for now)
 * ---------------------------------------------------------------------------
 */

import { getCategories, getFeaturedTools } from "./data.js";
import { icon } from "./icons.js";
import { initNav, initReveal, showToast } from "./ui.js";

async function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;
  const categories = await getCategories();

  grid.innerHTML = categories
    .map(
      (cat) => `
      <a class="category-card reveal" href="pages/search.html?category=${cat.id}">
        <span class="category-icon">${icon(cat.icon)}</span>
        <span>${cat.name}</span>
        <span class="category-count">${cat.count} verktyg</span>
      </a>`
    )
    .join("");

  initReveal();
}

function toolCardTemplate(tool) {
  return `
    <article class="tool-card reveal" data-tool-id="${tool.id}">
      <a href="pages/product.html?id=${tool.id}" aria-label="Visa ${tool.title}">
        <div class="tool-card-media">${icon(tool.icon)}</div>
      </a>
      <button class="tool-card-fav" aria-label="Spara ${tool.title} som favorit" data-fav="${tool.id}">
        ${icon("heart")}
      </button>
      <div class="tool-card-body">
        <a href="pages/product.html?id=${tool.id}">
          <div class="tool-card-top">
            <span class="tool-card-title">${tool.title}</span>
          </div>
        </a>
        <div class="tool-card-meta">
          ${icon("map-pin")}<span>${tool.city} · ${tool.owner}</span>
        </div>
        <div class="tool-card-top">
          <span class="tool-card-rating">${icon("star")} ${tool.rating.toFixed(1)} <span style="color:var(--color-text-faint); font-weight:400;">(${tool.reviews})</span></span>
          <span class="tool-card-price">${tool.pricePerDay} kr<small> /dag</small></span>
        </div>
      </div>
    </article>`;
}

async function renderFeaturedTools() {
  const grid = document.getElementById("toolGrid");
  if (!grid) return;
  const tools = await getFeaturedTools(8);
  grid.innerHTML = tools.map(toolCardTemplate).join("");

  grid.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle("is-active");
      const active = btn.classList.contains("is-active");
      showToast(active ? "Sparad i dina favoriter" : "Borttagen från favoriter");
    });
  });

  initReveal();
}

function initHeroSearch() {
  const form = document.getElementById("heroSearchForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = new FormData(form).get("q") || "";
    window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHeroSearch();
  renderCategories();
  renderFeaturedTools();
  initReveal();
});
