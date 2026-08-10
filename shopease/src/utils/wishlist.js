import { getProductById } from "./api";

export function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

export function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

export function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id == productId);
}

export async function addToWishlist(productId) {
  const wishlist = getWishlist();
  const product = await getProductById(productId);
  if (!product) return false;

  const exists = wishlist.some((item) => item.id == product.id);
  if (exists) {
    return false;
  }

  wishlist.push(product);
  saveWishlist(wishlist);
  return true;
}

export function removeFromWishlist(productId) {
  const wishlist = getWishlist();
  const updated = wishlist.filter((item) => item.id != productId);
  saveWishlist(updated);
  return updated;
}
