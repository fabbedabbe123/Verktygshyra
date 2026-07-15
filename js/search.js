/**
 * search.js — logic for pages/search.html
 * Reads query params (q, category, city), renders filter chips + results,
 * and re-queries the mock data layer whenever filters change.
 */
import { searchTools, getCategories, CITIES } from "../js/data.js";
import { icon } from "../js/icons.js";
import { initNav, initReveal, showToast } from "../js/ui.js";

const state = {
  query: "",
  category: "",
  city: "",
};

function readStateFromURL() {
  const params = new URLSearchParams(window.location.search);
  state.query = params.get("q") || "";
  state.category = params.get("category") || "";
  state.city = params.get("city") || "";
}

function toolCardTemplate(tool) {
  return `
    <article class="tool-card reveal is-visible" data-tool-id="${tool.id}">
      <a href="product.html?id=${tool.id}" aria-label="Visa ${tool.title}">
        <div class="tool-card-media">${icon(tool.icon)}</div>
      </a>
      <button class="tool-card-fav" aria-label="Spara ${tool.title} som favorit" data-fav="${tool.id}">${icon("heart")}</button>
      <div class="tool-card-body">
        <a href="product.html?id=${tool.id}"><div class="tool-card-top"><span class="tool-card-title">${tool.title}</span></div></a>
        <div class="tool-card-meta">${icon("map-pin")}<span>${tool.city} · ${tool.owner}</span></div>
        <div class="tool-card-top">
          <span class="tool-card-rating">${icon("star")} ${tool.rating.toFixed(1)} <span style="color:var(--color-text-faint); font-weight:400;">(${tool.reviews})</span></span>
          <span class="tool-card-price">${tool.pricePerDay} kr<small> /dag</small></span>
        </div>
      </div>
    </article>`;
}

async function renderResults() {
  const grid = document.getElementById("resultsGrid");
  const countEl = document.getElementById("resultsCount");
  grid.innerHTML = `<p style="color:var(--color-text-faint);">Söker…</p>`;

  const results = await searchTools(state);
  countEl.textContent = `${results.length} verktyg hittades`;

  if (results.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 64px 0; color: var(--color-text-muted);">
        <p style="font-family: var(--font-display); font-weight:700; font-size: var(--fs-lg); color: var(--color-text); margin-bottom:8px;">Inga verktyg matchade din sökning</p>
        <p>Prova att ta bort ett filter eller sök på en annan kategori.</p>
      </div>`;
    return;
  }

  grid.innerHTML = results.map(toolCardTemplate).join("");
  grid.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.classList.toggle("is-active");
      showToast(btn.classList.contains("is-active") ? "Sparad i dina favoriter" : "Borttagen från favoriter");
    });
  });
}

function renderCategoryChips(categories) {
  const wrap = document.getElementById("categoryChips");
  const allChip = `<button class="chip ${state.category ? "" : "is-active"}" data-cat="">Alla</button>`;
  const chips = categories
    .map((c) => `<button class="chip ${state.category === c.id ? "is-active" : ""}" data-cat="${c.id}">${c.name}</button>`)
    .join("");
  wrap.innerHTML = allChip + chips;

  wrap.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.category = chip.dataset.cat;
      wrap.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      syncURL();
      renderResults();
    });
  });
}

function renderCityOptions() {
  const select = document.getElementById("citySelect");
  select.innerHTML =
    `<option value="">Alla städer</option>` +
    CITIES.map((c) => `<option value="${c}" ${state.city === c ? "selected" : ""}>${c}</option>`).join("");
  select.addEventListener("change", () => {
    state.city = select.value;
    syncURL();
    renderResults();
  });
}

function syncURL() {
  const params = new URLSearchParams();
  if (state.query) params.set("q", state.query);
  if (state.category) params.set("category", state.category);
  if (state.city) params.set("city", state.city);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

function initSearchBox() {
  const input = document.getElementById("searchInput");
  input.value = state.query;
  const form = document.getElementById("searchForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    state.query = input.value;
    syncURL();
    renderResults();
  });
}

async function init() {
  initNav();
  readStateFromURL();
  initSearchBox();
  const categories = await getCategories();
  renderCategoryChips(categories);
  renderCityOptions();
  await renderResults();
  initReveal();
}

document.addEventListener("DOMContentLoaded", init);
