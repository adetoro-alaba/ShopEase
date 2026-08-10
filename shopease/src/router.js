import { Home } from "./pages/Home";
import { Cart } from "./pages/cart";
import { Checkout } from "./pages/Checkout";
import { Success } from "./pages/Success";
import { Orders } from "./pages/Orders";
import { ProductDetails } from "./pages/ProductDetails";
import { WishlistPage } from "./pages/Wishlist";
import { AdminPage } from "./pages/Admin";
import { bindThemeToggle } from "./utils/theme";
import { bindNavbarMenu } from "./utils/nav";

export async function router() {
  const path = window.location.hash;

  if (path.startsWith("#product/")) {
    const productId = path.split("/")[1];
    await ProductDetails(productId);
    return;
  }

  switch (path) {
    case "#cart":
      Cart();
      break;

    case "#checkout":
      Checkout();
      break;

    case "#success":
      Success();
      break;

    case "#orders":
      Orders();
      break;

    case "#wishlist":
      WishlistPage();
      break;

    case "#admin":
      await AdminPage();
      break;

    default:
      Home();
  }

  bindThemeToggle();
  bindNavbarMenu();
}
