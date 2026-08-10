import { getCart, saveCart } from "../utils/cart";

export function Cart() {
  const cart = getCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    document.querySelector("#app").innerHTML = `
      <div class="page-enter min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div class="text-center max-w-md">

          <div class="text-7xl mb-6">
            🛒
          </div>

          <h1 class="text-4xl font-bold">
            Your Cart is Empty
          </h1>

          <p class="text-gray-500 mt-4 leading-7">
            Looks like you haven't added anything yet.
            Let's find something you'll love.
          </p>

          <a
            href="#"
            class="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
          >
            Start Shopping
          </a>

        </div>

      </div>
    `;

    return;
  }

  document.querySelector("#app").innerHTML = `
    <div class="page-enter min-h-screen bg-gray-50 py-12 px-6">

      <div class="max-w-7xl mx-auto">

        <div class="mb-10">

          <a
            href="#"
            class="text-blue-600 hover:underline"
          >
            ← Continue Shopping
          </a>

          <h1 class="text-4xl font-bold mt-5">
            Shopping Cart 🛒
          </h1>

          <p class="text-gray-500 mt-2">
            ${cart.length} product${cart.length > 1 ? "s" : ""} in your cart
          </p>

        </div>


        <div class="grid lg:grid-cols-3 gap-8">


          <!-- CART ITEMS -->

          <div class="lg:col-span-2 space-y-5">

            ${cart
              .map(
                (item) => `
              <div
                class="cart-item bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row gap-5"
              >

                <img
                  src="${item.image}"
                  alt="${item.name}"
                  class="w-full sm:w-32 h-32 object-cover rounded-xl"
                />


                <div class="flex-1">

                  <div class="flex justify-between gap-4">

                    <div>

                      <h2 class="text-xl font-bold">
                        ${item.name}
                      </h2>

                      <p class="text-blue-600 font-semibold mt-2">
                        ₦${item.price.toLocaleString()}
                      </p>

                    </div>


                    <button
                      data-id="${item.id}"
                      class="remove-item text-red-500 hover:text-red-700 transition"
                    >
                      🗑️
                    </button>

                  </div>


                  <div class="flex items-center gap-4 mt-6">

                    <button
                      data-id="${item.id}"
                      class="decrease bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-lg text-xl"
                    >
                      −
                    </button>

                    <span class="font-bold text-lg">
                      ${item.quantity}
                    </span>

                    <button
                      data-id="${item.id}"
                      class="increase bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-lg text-xl"
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>
            `,
              )
              .join("")}

          </div>


          <!-- SUMMARY -->

          <div class="lg:col-span-1">

            <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-28">

              <h2 class="text-2xl font-bold">
                Order Summary
              </h2>


              <div class="border-t my-6"></div>


              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₦${total.toLocaleString()}</span>
              </div>


              <div class="flex justify-between text-gray-600 mt-4">
                <span>Delivery</span>
                <span class="text-green-600">
                  Free
                </span>
              </div>


              <div class="border-t my-6"></div>


              <div class="flex justify-between items-center">

                <span class="text-xl font-bold">
                  Total
                </span>

                <span class="text-2xl font-bold text-blue-600">
                  ₦${total.toLocaleString()}
                </span>

              </div>


              <button
                onclick="location.hash='checkout'"
                class="w-full mt-7 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
              >
                Proceed to Checkout →
              </button>


              <button
                id="clear-cart"
                class="w-full mt-3 border border-red-300 text-red-500 hover:bg-red-50 py-3 rounded-xl transition"
              >
                Clear Cart
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  `;

  bindCartEvents();
}

function bindCartEvents() {
  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const cart = getCart();
      const item = cart.find((product) => product.id === id);
      if (item) {
        item.quantity++;
      }
      saveCart(cart);
      Cart();
    });
  });

  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const cart = getCart();
      const item = cart.find((product) => product.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
      saveCart(cart);
      Cart();
    });
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const updatedCart = getCart().filter((item) => item.id !== id);
      saveCart(updatedCart);
      Cart();
    });
  });

  const clearCartButton = document.querySelector("#clear-cart");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
      saveCart([]);
      Cart();
    });
  }
}
