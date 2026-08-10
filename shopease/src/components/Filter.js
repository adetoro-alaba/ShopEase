export function Filter() {
  return `
    <select
      id="category"
      class="w-full md:w-60 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
    >
      <option value="all">All</option>
      <option value="Accessories">Accessories</option>
      <option value="Electronics">Electronics</option>
      <option value="Wearables">Wearables</option>
    </select>
  `;
}
