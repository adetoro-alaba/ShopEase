export function ProductControls(categories = []) {
  return `
    <div class="max-w-7xl mx-auto px-6 py-10">

      <div class="grid md:grid-cols-3 gap-5">

        <input
          id="search"
          type="text"
          placeholder="Search products..."
          class="border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-600 bg-white text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
        />

        <select
          id="category"
          class="border border-gray-300 rounded-xl p-3 bg-white text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
        >
          <option value="all">All Categories</option>
          ${categories
            .map(
              (category) => `<option value="${category}">${category}</option>`,
            )
            .join("")}
        </select>

        <select
          id="sort"
          class="border border-gray-300 rounded-xl p-3 bg-white text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
        >
          <option value="">Sort Products</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
          <option value="az">A → Z</option>
        </select>

      </div>

    </div>
  `;
}
