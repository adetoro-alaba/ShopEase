import { getProductById } from "./api";

export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function getCartCount() {
  const cart = getCart();

  return cart.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);
}

export async function addToCart(productId) {
  const cart = getCart();
  const selectedProduct = await getProductById(productId);
  if (!selectedProduct) return;

  const existingItem = cart.find((item) => item.id == selectedProduct.id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({
      ...selectedProduct,
      quantity: 1,
    });
  }

  saveCart(cart);
}
