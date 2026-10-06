import { products as localProducts } from "../Data/product";

let cachedProducts = null;

function getAdminEdits() {
  try {
    return JSON.parse(localStorage.getItem("adminEdits")) || {};
  } catch {
    return {};
  }
}

function applyAdminEdits(products) {
  const edits = getAdminEdits();
  return products.map((product) => {
    const edit = edits[product.id];
    return edit ? { ...product, price: Number(edit.price) || product.price } : product;
  });
}

export async function fetchProducts() {
  if (!cachedProducts) {
    cachedProducts = localProducts.map((product) => ({ ...product }));
  }
  return applyAdminEdits(cachedProducts);
}

export async function getProductById(productId) {
  const products = await fetchProducts();
  return products.find((product) => String(product.id) === String(productId));
}
