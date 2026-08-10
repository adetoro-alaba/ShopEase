import { Navbar } from "../components/Navbar";
import { getCartCount } from "../utils/cart";
import { fetchProducts } from "../utils/api";

export async function AdminPage() {
  let products = await fetchProducts();

  // load any admin edits from localStorage
  const edits = JSON.parse(localStorage.getItem("adminEdits")) || {};
  products = products.map((p) => ({
    ...p,
    _editedPrice: edits[p.id]?.price ?? p.price,
  }));

  document.querySelector("#app").innerHTML = `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
      ${Navbar(getCartCount())}
      <div class="p-8 max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold mb-6">Admin Dashboard</h1>

        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl shadow space-y-4">
          <p class="text-gray-600 dark:text-slate-300">Manage products below. Edits are stored locally for demo purposes.</p>

          <div id="admin-products" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4"></div>
        </div>
      </div>
    </div>
  `;

  const container = document.querySelector("#admin-products");
  container.innerHTML = products
    .map(
      (p) => `
      <div class="p-4 bg-gray-100 dark:bg-slate-800 rounded-lg shadow">
        <img src="${p.image}" class="w-full h-40 object-contain rounded mb-3" />
        <h3 class="font-bold text-lg">${p.name}</h3>
        <p class="text-sm text-gray-500 mb-2">${p.category}</p>
        <div class="flex items-center gap-2">
          <label class="text-sm">Price:</label>
          <input data-id="${p.id}" class="admin-price border px-2 py-1 rounded w-32" value="${p._editedPrice}" />
        </div>
        <div class="mt-3 flex gap-2">
          <button class="save-edit bg-blue-600 text-white px-3 py-1 rounded" data-id="${p.id}">Save</button>
          <button class="reset-edit bg-gray-200 px-3 py-1 rounded" data-id="${p.id}">Reset</button>
        </div>
      </div>
    `,
    )
    .join("");

  // bind buttons
  document.querySelectorAll(".save-edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const input = document.querySelector(
        `input.admin-price[data-id='${id}']`,
      );
      const price = Number(input.value) || 0;
      const saved = JSON.parse(localStorage.getItem("adminEdits")) || {};
      saved[id] = { price };
      localStorage.setItem("adminEdits", JSON.stringify(saved));
      btn.textContent = "Saved";
      setTimeout(() => (btn.textContent = "Save"), 1200);
    });
  });

  document.querySelectorAll(".reset-edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const saved = JSON.parse(localStorage.getItem("adminEdits")) || {};
      delete saved[id];
      localStorage.setItem("adminEdits", JSON.stringify(saved));
      // reload page to reflect reset
      AdminPage();
    });
  });
}
