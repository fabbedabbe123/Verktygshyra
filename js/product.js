/**
 * product.js — logic for pages/product.html
 * Reads ?id= from the URL, fetches the tool, renders detail + booking widget.
 */
import { getToolById } from "../js/data.js";
import { icon } from "../js/icons.js";
import { initNav, showToast } from "../js/ui.js";

function getIdFromURL() {
  return new URLSearchParams(window.location.search).get("id");
}

function renderNotFound() {
  document.getElementById("productRoot").innerHTML = `
    <div style="text-align:center; padding: 96px 0;">
      <h1 style="font-size: var(--fs-2xl); margin-bottom: 12px;">Verktyget hittades inte</h1>
      <p style="color:var(--color-text-muted); margin-bottom: 24px;">Länken kan vara felaktig eller så har verktyget tagits bort.</p>
      <a class="btn btn-primary" href="search.html">Sök andra verktyg</a>
    </div>`;
}

function render(tool) {
  document.title = `${tool.title} — Verktygshyra`;

  document.getElementById("productRoot").innerHTML = `
    <div class="product-layout">
      <div>
        <div class="product-gallery">${icon(tool.icon)}</div>

        <div class="product-header">
          <div>
            <h1>${tool.title}</h1>
            <div class="tool-card-meta" style="margin-top:8px;">
              ${icon("map-pin")}<span>${tool.city}</span>
              <span style="margin: 0 4px;">·</span>
              <span class="tool-card-rating">${icon("star")} ${tool.rating.toFixed(1)} (${tool.reviews} recensioner)</span>
            </div>
          </div>
          <button class="tool-card-fav" style="position:static;" aria-label="Spara som favorit" id="favBtn">${icon("heart")}</button>
        </div>

        <p style="color: var(--color-text-muted); font-size: var(--fs-md); line-height:1.7;">
          Väl underhållen ${tool.title.toLowerCase()} tillgänglig för uthyrning i ${tool.city}. Perfekt för hemmafix, mindre renoveringar och trädgårdsarbete. Hämtas hos ägaren eller mot en mindre avgift för leverans inom staden.
        </p>

        <div class="product-owner">
          <div class="avatar">${tool.owner.charAt(0)}</div>
          <div>
            <strong style="font-family: var(--font-display);">${tool.owner}</strong>
            <div style="font-size: var(--fs-xs); color: var(--color-text-faint);">Medlem sedan 2024 · Svarar oftast inom 1 timme</div>
          </div>
        </div>
      </div>

      <aside class="booking-card">
        <div class="booking-price">${tool.pricePerDay} kr <span>/ dag</span></div>
        <div class="booking-dates">
          <div class="field" style="margin-bottom:0;">
            <label for="startDate">Hämtas</label>
            <input type="date" id="startDate" />
          </div>
          <div class="field" style="margin-bottom:0;">
            <label for="endDate">Lämnas tillbaka</label>
            <input type="date" id="endDate" />
          </div>
        </div>
        <button class="btn btn-primary btn-block btn-lg" id="bookBtn">Boka nu</button>
        <div class="booking-total">
          <span>Totalt (1 dag)</span>
          <span id="totalPrice">${tool.pricePerDay} kr</span>
        </div>
      </aside>
    </div>`;

  document.getElementById("favBtn").addEventListener("click", () => {
    const btn = document.getElementById("favBtn");
    btn.classList.toggle("is-active");
    showToast(btn.classList.contains("is-active") ? "Sparad i dina favoriter" : "Borttagen från favoriter");
  });

  function updateTotal() {
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;
    const totalEl = document.getElementById("totalPrice");
    if (start && end) {
      const days = Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000));
      totalEl.textContent = `${days * tool.pricePerDay} kr`;
      totalEl.previousElementSibling.textContent = `Totalt (${days} ${days === 1 ? "dag" : "dagar"})`;
    }
  }
  document.getElementById("startDate").addEventListener("change", updateTotal);
  document.getElementById("endDate").addEventListener("change", updateTotal);

  document.getElementById("bookBtn").addEventListener("click", () => {
    showToast(`Bokningsförfrågan skickad till ${tool.owner}`);
  });
}

async function init() {
  initNav();
  const id = getIdFromURL();
  const tool = id ? await getToolById(id) : null;
  if (!tool) {
    renderNotFound();
    return;
  }
  render(tool);
}

document.addEventListener("DOMContentLoaded", init);
