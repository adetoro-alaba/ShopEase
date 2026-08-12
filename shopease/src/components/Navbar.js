export function Navbar(count) {
  return `
    <nav class="navbar fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 rounded-2xl border border-white/10 bg-slate-950/65 backdrop-blur-xl shadow-2xl shadow-black/20">
      <div class="px-4 sm:px-6 py-3">
        <div class="flex justify-between items-center">
          <a href="#" class="group flex items-center gap-2.5" aria-label="ShopEase Home">
            <span class="brand-mark grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow-lg shadow-violet-500/25 group-hover:rotate-3 transition-transform">
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-none stroke-current" stroke-width="1.9" aria-hidden="true">
                <path d="M5 8.5h14l-1 11H6l-1-11Z" />
                <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" />
                <path d="M9 12.5h.01M15 12.5h.01" stroke-linecap="round" />
              </svg>
            </span>
            <span class="text-2xl font-black tracking-tight text-white">Shop<span class="text-violet-400">Ease</span></span>
          </a>

          <div class="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#" class="nav-link hover:text-white">Home</a>
            <a href="#wishlist" class="nav-link hover:text-white">Wishlist</a>
            <a href="#orders" class="nav-link hover:text-white">Orders</a>
            <a href="#checkout" class="nav-link hover:text-white">Checkout</a>
          </div>

          <div class="flex items-center gap-2">
            <button id="theme-toggle" class="theme-toggle border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 p-2.5 rounded-xl" aria-label="Toggle dark mode">🌙</button>
            <button onclick="location.hash='cart'" class="cart-nav-button relative inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40">
              <svg viewBox="0 0 24 24" class="w-5 h-5 fill-none stroke-current" stroke-width="2" aria-hidden="true">
                <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 8H6" />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              <span class="hidden sm:inline">Cart</span>
              <span class="cart-badge absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-fuchsia-500 text-[11px] font-bold grid place-items-center border-2 border-slate-950">${count}</span>
            </button>
            <button id="menu-toggle" class="md:hidden border border-white/10 bg-white/5 text-slate-200 p-2.5 rounded-xl text-xl" aria-label="Open menu">☰</button>
          </div>
        </div>

        <div id="mobile-menu" class="mobile-menu md:hidden">
          <div class="flex flex-col gap-1 pt-4 pb-2 text-slate-200">
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
