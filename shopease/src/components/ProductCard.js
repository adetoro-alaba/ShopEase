export function ProductCard(product) {
  return `
  <div
    class="product-card group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
    data-id="${product.id}"
    style="animation-delay: ${product.id * 100}ms"
  >
    <div class="flex h-52 items-center justify-center overflow-hidden bg-slate-100 p-4 dark:bg-slate-800 sm:h-56">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div class="flex flex-1 flex-col justify-between gap-4 p-4 sm:p-5">
      <div class="space-y-3">
        <span class="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-600 dark:bg-sky-500/10 dark:text-sky-300">
          ${product.category}
        </span>

        <h2 class="min-h-[3.25rem] text-base font-bold leading-6 text-slate-900 dark:text-slate-100">
          ${product.name}
        </h2>

        <p class="flex items-center gap-1 text-xs font-medium text-amber-500 dark:text-amber-300">
          <span>★★★★★</span>
          <span class="text-slate-500 dark:text-slate-400">(${product.rating})</span>
        </p>

        <h3 class="text-xl font-extrabold text-blue-600 dark:text-sky-300">
          ₦${product.price.toLocaleString()}
        </h3>
      </div>

      <div class="mt-auto grid gap-2.5">
        <button
          class="add-cart w-full rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400"
          data-id="${product.id}"
        >
          🛒 Add to Cart
        </button>

        <button
          class="wishlist-toggle w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          data-id="${product.id}"
        >
          ❤️ Add to Wishlist
        </button>

        <a
          href="#product/${product.id}"
          class="inline-flex items-center justify-center rounded-xl border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-sky-500/40 dark:text-sky-300 dark:hover:bg-sky-500/10"
        >
          View Details →
        </a>
      </div>
    </div>
  </div>
  `;
}
