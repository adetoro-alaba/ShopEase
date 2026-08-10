export function ProductCard(product) {
  return `
  <div
    class="product-card flex h-full flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer"
    data-id="${product.id}"
    style="animation-delay: ${product.id * 100}ms"
  >

    <div class="w-full h-44 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-3">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="max-h-full w-full object-contain"
      />
    </div>

    <div class="p-3 flex-1 flex flex-col justify-between gap-3">

      <div>
        <span class="text-blue-600 text-xs dark:text-sky-300">
          ${product.category}
        </span>

        <h2 class="font-bold text-base mt-2 text-slate-900 dark:text-slate-100">
          ${product.name}
        </h2>

        <p class="text-yellow-400 mt-1 text-xs">
          ⭐⭐⭐⭐⭐ (${product.rating})
        </p>

        <h3 class="text-lg font-bold mt-3 text-blue-600 dark:text-sky-300">
          ₦${product.price.toLocaleString()}
        </h3>
      </div>

      <div class="mt-3 grid gap-2">
        <button
          class="add-cart w-full bg-blue-600 dark:bg-sky-500 text-white py-2 rounded-xl hover:bg-blue-700 dark:hover:bg-sky-400 transition"
          data-id="${product.id}"
        >
          🛒 Add to Cart
        </button>

        <button
          class="wishlist-toggle w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition"
          data-id="${product.id}"
        >
          ❤️ Add to Wishlist
        </button>

        <a
          href="#product/${product.id}"
          class="text-blue-600 hover:underline text-sm font-medium"
        >
          View Details →
        </a>
      </div>

    </div>

  </div>
  `;
}
