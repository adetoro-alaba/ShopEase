import { icon } from "../utils/icons";

export function Navbar(count) {
  return `
    <nav class="navbar fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 rounded-2xl border border-white/10 bg-slate-950/65 backdrop-blur-xl shadow-2xl shadow-black/20">
      <div class="px-4 sm:px-6 py-3">
        <div class="flex justify-between items-center">
          <a href="#" class="group flex items-center gap-2.5" aria-label="ShopEase Home">
            <span class="brand-mark grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow-lg shadow-violet-500/25 group-hover:rotate-3 transition-transform">
              ${icon("bag", "w-6 h-6")}
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
            <button id="theme-toggle" class="theme-toggle border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 p-2.5 rounded-xl" aria-label="Toggle theme">
              ${icon("moon", "w-5 h-5")}
            </button>

            <button onclick="location.hash='cart'" class="cart-nav-button relative inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40">
              ${icon("cart", "w-5 h-5")}
              <span class="hidden sm:inline">Cart</span>
              <span class="cart-badge absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-fuchsia-500 text-[11px] font-bold grid place-items-center border-2 border-slate-950">${count}</span>
            </button>

            <button id="menu-toggle" class="md:hidden border border-white/10 bg-white/5 text-slate-200 p-2.5 rounded-xl" aria-label="Open menu">
              ${icon("menu", "w-5 h-5")}
            </button>
          </div>
        </div>

        <div id="mobile-menu" class="mobile-menu md:hidden">
          <div class="flex flex-col gap-1 pt-4 pb-2 text-slate-200">
            <a href="#" class="mobile-link">${icon("home", "w-4 h-4")}<span>Home</span></a>
            <a href="#wishlist" class="mobile-link">${icon("heart", "w-4 h-4")}<span>Wishlist</span></a>
            <a href="#orders" class="mobile-link">${icon("package", "w-4 h-4")}<span>Orders</span></a>
            <a href="#checkout" class="mobile-link">${icon("card", "w-4 h-4")}<span>Checkout</span></a>
          </div>
        </div>
      </div>
    </nav>
  `;
}
