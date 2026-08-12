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
    <div class="min-h-screen bg-slate-950 text-slate-100">
      ${Navbar(getCartCount())}

      <main>
        <section class="hero-section relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40">
          <div class="hero-orb hero-orb-one"></div>
          <div class="hero-orb hero-orb-two"></div>
          <div class="absolute inset-0 opacity-30 pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,.12) 1px, transparent 0); background-size: 34px 34px;"></div>

          <div class="relative max-w-7xl mx-auto px-6">
            <div class="grid lg:grid-cols-[1.02fr_.98fr] items-center gap-12 lg:gap-8">
              <div class="hero-copy max-w-2xl">
                <span class="hero-pill">
                  <span class="hero-pill-dot"></span>
                  🔥 Summer deals are live
                </span>

                <h1 class="mt-7 text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[.98]">
                  Discover.<br />
                  <span>Shop.</span><br />
                  <span class="hero-gradient-text">Love it.</span>
                </h1>

                <p class="mt-7 text-lg sm:text-xl leading-8 text-slate-300 max-w-xl">
                  Find products you’ll love at prices you’ll appreciate. Fast delivery, secure payments, and a shopping experience built around you.
                </p>

                <div class="mt-9 flex flex-col sm:flex-row gap-4">
                  <button onclick="location.hash='products'" class="hero-primary-btn">
                    Shop Now <span>→</span>
                  </button>
                  <button onclick="document.querySelector('#product-grid')?.scrollIntoView({behavior:'smooth'})" class="hero-secondary-btn">
                    Explore Products
                  </button>
                </div>

                <div class="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl">
                  <div class="hero-trust-card"><span>🚚</span><div><strong>Free Shipping</strong><small>Orders over ₦20,000</small></div></div>
                  <div class="hero-trust-card"><span>🛡️</span><div><strong>Secure Payment</strong><small>100% protected</small></div></div>
                  <div class="hero-trust-card"><span>↩️</span><div><strong>Easy Returns</strong><small>30-day returns</small></div></div>
                </div>
              </div>

              <div class="hero-visual relative min-h-[430px] lg:min-h-[540px] flex items-center justify-center">
                <div class="hero-ring hero-ring-one"></div>
                <div class="hero-ring hero-ring-two"></div>
                <div class="hero-glow"></div>
                <div class="hero-platform"></div>

                <div class="hero-floating-card hero-card-top">
                  <span class="hero-mini-icon">⚡</span>
                  <div><strong>Hot Deals</strong><small>Up to 40% off</small></div>
                </div>

                <div class="hero-product-stage">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=90" alt="Premium headphones" class="hero-product-image" />
                </div>

                <div class="hero-floating-card hero-card-bottom">
                  <span class="hero-mini-icon">✓</span>
                  <div><strong>Trusted Shopping</strong><small>Quality products</small></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" class="relative max-w-7xl mx-auto px-6 py-16">
          ${ProductControls()}

          <div class="flex items-end justify-between gap-4 mb-10">
            <div>
              <span class="section-kicker">CURATED FOR YOU</span>
              <h2 class="text-4xl sm:text-5xl font-black tracking-tight mt-2">Featured Products</h2>
              <p class="text-slate-400 mt-3">Handpicked products worth adding to your cart.</p>
            </div>
            <span class="hidden sm:block text-violet-400 font-semibold">View all →</span>
          </div>

          ${ProductGrid(products)}
          <div id="pagination-container"></div>
        </section>
      </main>
    </div>
  `;

  const cartButton = document.querySelector(".cart-nav-button");
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
    if (sortValue === "low") sortedProducts.sort((a, b) => a.price - b.price);
    else if (sortValue === "high") sortedProducts.sort((a, b) => b.price - a.price);
    else if (sortValue === "az") sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    return sortedProducts;
  }

  function getCurrentProducts() {
    const filtered = getFilteredProducts();
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filtered.slice(start, start + PRODUCTS_PER_PAGE);
  }

  function renderPagination() {
    const totalPages = Math.max(1, Math.ceil(getFilteredProducts().length / PRODUCTS_PER_PAGE));
    document.querySelector("#pagination-container").innerHTML = Pagination(currentPage, totalPages);
    bindPaginationButtons();
  }

  function updateProducts() {
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
        if (cartButton) {
          const badge = cartButton.querySelector(".cart-badge");
          if (badge) badge.textContent = getCartCount();
          cartButton.classList.add("animate-pop");
          setTimeout(() => cartButton.classList.remove("animate-pop"), 350);
        }
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
    document.querySelectorAll("#pagination-container button[data-page]").forEach((button) => {
      button.addEventListener("click", () => {
        currentPage = Number(button.dataset.page);
        updateProducts();
        document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
      });
    });

    const nextButton = document.querySelector("#next-page");
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const totalPages = Math.ceil(getFilteredProducts().length / PRODUCTS_PER_PAGE);
        if (currentPage < totalPages) {
          currentPage += 1;
          updateProducts();
        }
      });
    }
  }

  searchInput.addEventListener("input", () => { currentPage = 1; updateProducts(); });
  categorySelect.addEventListener("change", () => { currentPage = 1; updateProducts(); });
  sortSelect.addEventListener("change", () => { currentPage = 1; updateProducts(); });

  initializeProducts();
}
