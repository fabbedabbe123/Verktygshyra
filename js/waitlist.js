/**
 * waitlist.js
 * ---------------------------------------------------------------------------
 * Handles the homepage waitlist / lead-capture form, submitting straight
 * into a Google Form response sheet — free, no submission limit, and the
 * data lands in a Google Sheet you already know how to use.
 *
 * SETUP REQUIRED (takes ~5 minutes, one-time):
 *
 * 1. Create a form at https://forms.google.com with these 4 questions,
 *    in this order (short answer / short answer / dropdown / multiple choice):
 *      - Namn
 *      - E-post
 *      - Stad
 *      - Jag vill helst (options: "Hyra verktyg", "Hyra ut verktyg")
 *
 * 2. Get the form's "action" URL and each field's entry ID:
 *      a. Open your form, click the three dots (⋮) → "Get pre-filled link"
 *      b. Fill in placeholder text in each field (e.g. "test") and click "Get link"
 *      c. Copy the generated URL — it looks like:
 *         https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?usp=pp_url&entry.111111=test&entry.222222=test&entry.333333=test&entry.444444=test
 *      d. From that URL, copy:
 *         - The part before "/viewform" → paste as FORM_ACTION_URL below
 *           (keep the /formResponse suffix as already written)
 *         - Each entry.NNNNNN number → paste into the matching FIELD_IDS entry
 *
 * 3. Save this file. The form will work immediately — no rebuild step needed.
 *
 * Until you fill in real values below, submissions show a clear message
 * instead of silently failing, so you always know whether it's live yet.
 * ---------------------------------------------------------------------------
 */

import { showToast } from "./ui.js";

// Paste your form's own ID between /d/e/ and /formResponse
const FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeE6f1_xcjC3mwvmrNdTd8UsQdmTux3aWa3n6jOBwlBVSc8NA/formResponse";

// Paste the entry.NNNNNN number for each field (without "entry.")
const FIELD_IDS = {
  name: "543403615",
  email: "903697841",
  city: "759278800",
  role: "1569940454",
};

function isConfigured() {
  return (
    !FORM_ACTION_URL.includes("YOUR_FORM_ID") &&
    !Object.values(FIELD_IDS).some((id) => id.startsWith("YOUR_"))
  );
}

async function handleWaitlistSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector("button[type=submit]");
  const originalLabel = submitBtn.textContent;

  if (!isConfigured()) {
    showToast("Formuläret är inte kopplat till Google Forms än — se js/waitlist.js");
    return;
  }

  const raw = new FormData(form);
  const payload = new FormData();
  payload.append(`entry.${FIELD_IDS.name}`, raw.get("name"));
  payload.append(`entry.${FIELD_IDS.email}`, raw.get("email"));
  payload.append(`entry.${FIELD_IDS.city}`, raw.get("city"));
  payload.append(`entry.${FIELD_IDS.role}`, raw.get("role"));

  submitBtn.disabled = true;
  submitBtn.textContent = "Skickar…";

  try {
    // Google Forms' endpoint doesn't return a readable response to
    // cross-origin requests ("no-cors" mode hides the result on purpose).
    // We can't confirm success from the response itself, but the submission
    // does go through; this is a standard, well-documented pattern for
    // submitting to Google Forms from an external site.
    await fetch(FORM_ACTION_URL, {
      method: "POST",
      mode: "no-cors",
      body: payload,
    });
    form.reset();
    showWaitlistSuccess(form);
  } catch (err) {
    showToast("Kunde inte skicka just nu — kolla din internetanslutning.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
}

function showWaitlistSuccess(form) {
  const card = form.closest(".waitlist-card");
  card.innerHTML = `
    <div class="waitlist-success">
      <span class="waitlist-success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <h3>Du är med på listan!</h3>
      <p>Vi hör av oss så fort vi lanserar i din stad. Tack för att du vill vara med tidigt.</p>
    </div>`;
}

export function initWaitlistForm() {
  const form = document.getElementById("waitlistForm");
  if (!form) return;
  form.addEventListener("submit", handleWaitlistSubmit);
}

document.addEventListener("DOMContentLoaded", initWaitlistForm);
