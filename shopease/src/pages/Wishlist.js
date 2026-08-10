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
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src="${product.image}"
            alt="${product.name}"
            class="w-full h-64 object-cover"
          />
          <div class="p-5">
            <h2 class="text-xl font-bold">${product.name}</h2>
            <p class="text-blue-600 font-bold text-xl mt-3">₦${product.price.toLocaleString()}</p>
            <div class="flex gap-3 mt-5">
              <a
                href="#product/${product.id}"
                class="flex-1 text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                View
              </a>
              <button
                data-id="${product.id}"
                class="remove-wishlist bg-red-100 text-red-600 px-4 rounded-xl hover:bg-red-200 transition"
              >
                ♥
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
