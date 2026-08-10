let cachedProducts = null;

function getAdminEdits() {
  return JSON.parse(localStorage.getItem("adminEdits")) || {};
}

function applyAdminEdits(products) {
  const edits = getAdminEdits();
  return products.map((product) => {
    const edit = edits[product.id];
    return edit ? { ...product, price: edit.price } : product;
  });
}

export async function fetchProducts() {
  if (!cachedProducts) {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const products = await response.json();
      cachedProducts = products.map((product) => ({
        id: product.id,
        name: product.title,
        price: Math.round(product.price * 100),
        category: product.category,
        rating: product.rating?.rate || 0,
        image: product.image,
        description: product.description,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  return applyAdminEdits(cachedProducts);
}

export async function getProductById(productId) {
  const products = await fetchProducts();
  return products.find((product) => product.id == productId);
}
