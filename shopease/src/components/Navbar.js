export function Navbar(count) {
  return `
    <nav class="navbar bg-white shadow-md sticky top-0 z-40 dark:bg-slate-950">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <a href="#" class="text-3xl font-bold text-blue-600 dark:text-sky-300">ShopEase</a>

          <div class="hidden md:flex items-center gap-8">
            <a href="#" class="nav-link hover:text-blue-600">Home</a>
            <a href="#wishlist" class="nav-link hover:text-blue-600">Wishlist</a>
            <a href="#orders" class="nav-link hover:text-blue-600">Orders</a>
            <a href="#checkout" class="nav-link hover:text-blue-600">Checkout</a>
          </div>

          <div class="flex items-center gap-3">
            <button id="theme-toggle" class="theme-toggle bg-gray-100 p-3 rounded-full" aria-label="Toggle dark mode">🌙</button>
            <button onclick="location.hash='cart'" class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
              🛒 Cart
              <span class="cart-badge">${count}</span>
            </button>
            <button id="menu-toggle" class="md:hidden bg-gray-100 p-3 rounded-xl text-xl" aria-label="Open menu">☰</button>
          </div>
        </div>

        <div id="mobile-menu" class="mobile-menu md:hidden">
          <div class="flex flex-col gap-2 pt-5 pb-3">
            <a href="#" class="mobile-link">🏠 Home</a>
            <a href="#wishlist" class="mobile-link">❤️ Wishlist</a>
            <a href="#orders" class="mobile-link">📦 Orders</a>
            <a href="#checkout" class="mobile-link">💳 Checkout</a>
          </div>
        </div>
      </div>
    </nav>
  `;
}
