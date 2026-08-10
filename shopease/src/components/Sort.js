export function Sort() {
  return `
    <select
      id="sort"
      class="w-full md:w-60 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
    >
      <option value="">Sort By</option>
      <option value="low">Price Low → High</option>
      <option value="high">Price High → Low</option>
      <option value="az">A → Z</option>
    </select>
  `;
}
