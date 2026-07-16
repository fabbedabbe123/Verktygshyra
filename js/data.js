/**
 * data.js
 * ---------------------------------------------------------------------------
 * Temporary in-memory "data layer" that stands in for a future backend.
 * Every function here returns Promises on purpose, so that swapping the
 * body for a real `fetch()` call to an API later requires no changes
 * anywhere else in the app.
 *
 * When a backend exists:
 *   - Replace the bodies of the exported functions with fetch() calls.
 *   - Keep the function names and return shapes identical.
 * ---------------------------------------------------------------------------
 */

const CATEGORIES = [
  { id: "borrmaskiner", name: "Borrmaskiner", count: 128, icon: "drill" },
  { id: "slipmaskiner", name: "Slipmaskiner", count: 64, icon: "sander" },
  { id: "sagar", name: "Sågar", count: 91, icon: "saw" },
  { id: "hogtryckstvattar", name: "Högtryckstvättar", count: 47, icon: "pressure-washer" },
  { id: "stegar", name: "Stegar", count: 35, icon: "ladder" },
  { id: "tradgard", name: "Trädgårdsmaskiner", count: 156, icon: "lawnmower" },
];

const TOOLS = [
  { id: "t1", title: "Bosch Professional Borrmaskin", category: "borrmaskiner", pricePerDay: 89, city: "Malmö", owner: "Erik S.", rating: 4.9, reviews: 34, icon: "drill" },
  { id: "t2", title: "Makita Vinkelslip 125mm", category: "slipmaskiner", pricePerDay: 65, city: "Malmö", owner: "Sara L.", rating: 4.7, reviews: 21, icon: "sander" },
  { id: "t3", title: "Elektrisk Kedjesåg 2000W", category: "sagar", pricePerDay: 149, city: "Lund", owner: "Johan P.", rating: 5.0, reviews: 12, icon: "saw" },
  { id: "t4", title: "Kärcher Högtryckstvätt K5", category: "hogtryckstvattar", pricePerDay: 119, city: "Malmö", owner: "Anna K.", rating: 4.8, reviews: 47, icon: "pressure-washer" },
  { id: "t5", title: "Aluminiumstege 4m", category: "stegar", pricePerDay: 49, city: "Lund", owner: "Marcus B.", rating: 4.6, reviews: 9, icon: "ladder" },
  { id: "t6", title: "Bensingräsklippare Honda", category: "tradgard", pricePerDay: 99, city: "Malmö", owner: "Lisa T.", rating: 4.9, reviews: 28, icon: "lawnmower" },
  { id: "t7", title: "Borrhammare SDS-Plus", category: "borrmaskiner", pricePerDay: 109, city: "Lund", owner: "Peter N.", rating: 4.8, reviews: 16, icon: "drill" },
  { id: "t8", title: "Excenterslip Bosch", category: "slipmaskiner", pricePerDay: 55, city: "Malmö", owner: "Emma D.", rating: 4.7, reviews: 19, icon: "sander" },
];

/** Simulates network latency so loading-states can be demoed honestly. */
function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCategories() {
  await delay();
  return CATEGORIES;
}

export async function getFeaturedTools(limit = 8) {
  await delay();
  return TOOLS.slice(0, limit);
}

export async function searchTools({ query = "", category = "", city = "" } = {}) {
  await delay(180);
  return TOOLS.filter((tool) => {
    const matchesQuery = query
      ? tool.title.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesCategory = category ? tool.category === category : true;
    const matchesCity = city ? tool.city === city : true;
    return matchesQuery && matchesCategory && matchesCity;
  });
}

export async function getToolById(id) {
  await delay(150);
  return TOOLS.find((tool) => tool.id === id) || null;
}

export const CITIES = ["Malmö", "Lund", "Stockholm", "Göteborg"];
