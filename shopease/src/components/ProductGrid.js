import { ProductCard } from "./ProductCard";

export function ProductGrid(products) {
  return `
        <div
            id="product-grid"
            class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
        >

            ${products.map(ProductCard).join("")}

        </div>
    `;
}
