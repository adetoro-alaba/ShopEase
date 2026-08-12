import { getWishlist, removeFromWishlist } from "../utils/wishlist";
import { getCartCount } from "../utils/cart";
import { Navbar } from "../components/Navbar";

export function WishlistPage() {
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    document.querySelector("#app").innerHTML = `
      <div class="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
        ${Navbar(getCartCount())}
        <div class="flex items-center justify-center px-6 py-16">
          <div class="text-center">
            <div class="text-7xl">🤍</div>
            <h1 class="text-3xl font-bold mt-5">Your Wishlist is Empty</h1>
            <p class="text-gray-500 mt-3">Save products you love and find them here later.</p>
            <a href="#" class="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl">Start Shopping</a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const wishlistItems = wishlist
    .map(
      (product) => `
        <div class="product-card group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
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
              <a
                href="#product/${product.id}"
                class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View Details →
              </a>

              <button
                data-id="${product.id}"
                class="remove-wishlist rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        </div>
      `,
    )
    .join("");

  document.querySelector("#app").innerHTML = `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-gray-100">
      ${Navbar(getCartCount())}
      <div class="p-8">
        <div class="mb-10">
          <h1 class="text-4xl font-bold">My Wishlist ❤️</h1>
          <p class="text-gray-500 mt-2">Products you've saved for later.</p>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          ${wishlistItems}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll(".remove-wishlist").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromWishlist(button.dataset.id);
      WishlistPage();
    });
  });
}
