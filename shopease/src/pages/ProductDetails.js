import { getProductById } from "../utils/api";
import { addToCart, getCartCount } from "../utils/cart";
import { addToWishlist } from "../utils/wishlist";
import { showToast } from "../components/Toast";
import { Navbar } from "../components/Navbar";

export async function ProductDetails(productId) {
  const product = await getProductById(Number(productId));

  if (!product) {
    document.querySelector("#app").innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 dark:text-slate-100 px-6">
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10 text-center max-w-xl">
          <h1 class="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">Product not found</h1>
          <p class="text-gray-600 dark:text-slate-300 mb-6">Please select a product from the home page.</p>
          <button onclick="location.hash=''" class="bg-blue-600 text-white px-6 py-3 rounded-xl">Back to Home</button>
        </div>
      </div>
    `;
    return;
  }

  document.querySelector("#app").innerHTML = `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
      ${Navbar(getCartCount())}
      <div class="py-12 px-6">
        <div class="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
        <div class="grid md:grid-cols-2 gap-12 p-8 md:p-12">
          <div class="rounded-3xl overflow-hidden shadow-lg">
            <img
              src="${product.image}"
              alt="${product.name}"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="space-y-6 flex flex-col justify-between">
            <div>
              <span class="text-blue-600 font-semibold">
                ${product.category}
              </span>

              <h1 class="text-5xl font-bold mt-4">
                ${product.name}
              </h1>

              <p class="mt-4 text-yellow-500 text-lg">
                ⭐⭐⭐⭐⭐ (${product.rating})
              </p>

              <h2 class="text-4xl font-bold text-blue-600 mt-5">
                ₦${product.price.toLocaleString()}
              </h2>

              <p class="mt-6 text-gray-600 leading-8">
                ${product.description}
              </p>
            </div>

            <div class="flex flex-col gap-4 sm:flex-row">
              <button
                id="add-to-cart-button"
                class="bg-blue-600 text-white px-8 py-4 rounded-xl w-full hover:bg-blue-700 transition"
              >
                🛒 Add to Cart
              </button>
              <button
                id="add-to-wishlist-button"
                class="border border-red-500 text-red-500 px-8 py-4 rounded-xl w-full hover:bg-red-500 hover:text-white transition"
              >
                ❤️ Add to Wishlist
              </button>
              <button
                onclick="location.hash=''"
                class="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl w-full hover:bg-gray-100 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document
    .querySelector("#add-to-cart-button")
    .addEventListener("click", async () => {
      await addToCart(product.id);
      showToast("✅ Added to Cart");
    });

  document
    .querySelector("#add-to-wishlist-button")
    .addEventListener("click", async () => {
      const added = await addToWishlist(product.id);
      showToast(
        added ? "❤️ Added to Wishlist" : "❤️ Already in Wishlist",
        added ? "success" : "error",
      );
    });
}
