import { getCartCount, addToCart } from "../utils/cart";
import { addToWishlist } from "../utils/wishlist";
import { fetchProducts } from "../utils/api";
import { ProductControls } from "../components/ProductControls";
import { ProductGrid } from "../components/ProductGrid";
import { ProductCard } from "../components/ProductCard";
import { Pagination } from "../components/Pagination";
import { Navbar } from "../components/Navbar";
import { showToast } from "../components/Toast";

const PRODUCTS_PER_PAGE = 8;
let currentPage = 1;

export function Home() {
  let products = [];

  document.querySelector("#app").innerHTML = `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100">
      ${Navbar(getCartCount())}

      <section class="max-w-7xl mx-auto px-6 py-20 hero-content">
        <div class="grid md:grid-cols-2 items-center gap-12">
          <div class="space-y-6">
            <span class="bg-blue-100 text-blue-600 dark:bg-slate-800 dark:text-sky-300 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 animate-fade-in">
              ✨ New Collection 2026
            </span>

            <h1 class="mt-6 text-5xl md:text-6xl font-extrabold leading-tight animate-fade-in">
              Shop Smarter,
              <span class="text-blue-600">Live Better.</span>
            </h1>

            <p class="mt-6 text-gray-600 dark:text-slate-300 text-lg leading-8 animate-fade-in">
              Discover premium products with amazing discounts. Fast delivery, secure payments, and the best shopping experience—all in one place.
            </p>

            <div class="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in">
              <button
                onclick="location.hash='checkout'"
                class="bg-blue-600 hover:bg-blue-700 transition transform hover:-translate-y-0.5 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Shop Now
              </button>
              <button
                onclick="location.hash='cart'"
                class="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition transform hover:-translate-y-0.5 px-6 py-3 rounded-lg font-semibold"
              >
                View Cart
              </button>
            </div>
          </div>

          <div class="hero-image flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
              alt="Shopping Product"
              class="rounded-3xl shadow-2xl animate-slide-up"
            />
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-6 mt-10">
        ${ProductControls()}

        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold">Featured Products</h2>
          <p class="text-gray-600 mt-3">Discover our most popular products.</p>
        </div>

        ${ProductGrid(products)}
        <div id="pagination-container"></div>
      </section>
    </div>
  `;

  const cartButton = document.querySelector("#cart-button");
  const searchInput = document.querySelector("#search");
  const categorySelect = document.querySelector("#category");
  const sortSelect = document.querySelector("#sort");
  const productGrid = document.querySelector("#product-grid");

  async function initializeProducts() {
    products = await fetchProducts();
    const categories = Array.from(
      new Set(products.map((product) => product.category)),
    ).sort();

    categorySelect.innerHTML = `
      <option value="all">All Categories</option>
      ${categories
        .map((category) => `<option value="${category}">${category}</option>`)
        .join("")}
    `;

    updateProducts();
  }

  function getFilteredProducts() {
    const keyword = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    const sortValue = sortSelect.value;

    const filteredProducts = products.filter((product) => {
      const matchesKeyword = product.name.toLowerCase().includes(keyword);
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesKeyword && matchesCategory;
    });

    const sortedProducts = [...filteredProducts];

    if (sortValue === "low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "az") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sortedProducts;
  }

  function getCurrentProducts() {
    const filtered = getFilteredProducts();
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    return filtered.slice(start, end);
  }

  function renderPagination() {
    const totalPages = Math.max(
      1,
      Math.ceil(getFilteredProducts().length / PRODUCTS_PER_PAGE),
    );
    document.querySelector("#pagination-container").innerHTML = Pagination(
      currentPage,
      totalPages,
    );
    bindPaginationButtons();
  }

  async function updateProducts() {
    productGrid.innerHTML = getCurrentProducts().map(ProductCard).join("");
    bindAddCartButtons();
    bindWishlistButtons();
    bindProductCards();
    renderPagination();
  }

  function bindProductCards() {
    document.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", (event) => {
        if (event.target.closest(".add-cart")) return;

        location.hash = `#product/${card.dataset.id}`;
      });
    });
  }

  function bindAddCartButtons() {
    document.querySelectorAll(".add-cart").forEach((button) => {
      button.addEventListener("click", async () => {
        await addToCart(button.dataset.id);
        cartButton.textContent = `🛒 Cart (${getCartCount()})`;
        cartButton.classList.add("animate-pop");
        setTimeout(() => cartButton.classList.remove("animate-pop"), 350);
        showToast("✅ Added to Cart");
      });
    });
  }

  function bindWishlistButtons() {
    document.querySelectorAll(".wishlist-toggle").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.stopPropagation();
        const added = await addToWishlist(button.dataset.id);
        showToast(
          added ? "❤️ Added to Wishlist" : "❤️ Already in Wishlist",
          added ? "success" : "error",
        );
      });
    });
  }

  function bindPaginationButtons() {
    document
      .querySelectorAll("#pagination-container button[data-page]")
      .forEach((button) => {
        button.addEventListener("click", () => {
          currentPage = Number(button.dataset.page);
          updateProducts();
        });
      });

    const nextButton = document.querySelector("#next-page");
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const totalPages = Math.ceil(
          getFilteredProducts().length / PRODUCTS_PER_PAGE,
        );
        if (currentPage < totalPages) {
          currentPage += 1;
          updateProducts();
        }
      });
    }
  }

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    updateProducts();
  });
  categorySelect.addEventListener("change", () => {
    currentPage = 1;
    updateProducts();
  });
  sortSelect.addEventListener("change", () => {
    currentPage = 1;
    updateProducts();
  });

  initializeProducts();
}
